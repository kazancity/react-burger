import {
  Options,
  FormData,
  ArrayData,
  HTTPMethods,
  RequestData,
  ServerResponse,
  ServerUserResponse,
  ServerOrderResponse,
  ServerOrdersResponse,
  ServerMessageResponse,
  ServerRefreshResponse,
  ServerIngredientsResponse,
} from "../types";

export default function request<T>(
  endpoint: string,
  options?: Options,
): Promise<T> {
  const URL = "https://norma.nomoreparties.space/api/";
  const checkResponse = <T>(res: Response): Promise<T> => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };
  return fetch(`${URL + endpoint}`, options)
    .then(checkResponse<T>)
    .catch((err) => {
      throw console.log("Ошибка: " + err.message);
    });
}

const requestPost = <T>(endpoint: string, data: FormData): Promise<T> => {
  return request<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then((data) =>
    (data as ServerResponse).success ? data : Promise.reject(data),
  );
};

export const refreshToken = () => {
  const token = localStorage.getItem("refreshToken");
  if (token) {
    return requestPost<ServerRefreshResponse>("auth/token", { token }).then(
      (refreshData) => {
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        return refreshData;
      },
    );
  } else {
    return Promise.reject();
  }
};

const requestWithRefresh = async <T>(
  endpoint: string,
  options: Options,
): Promise<T> => {
  try {
    return await request<T>(endpoint, options);
  } catch (err) {
    if ((err as { message: string }).message === "jwt expired") {
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken;
      return await request<T>(endpoint, options);
    } else {
      return Promise.reject(err);
    }
  }
};

const requestWithAccessToken = <T>(
  endpoint: string,
  method: HTTPMethods = "GET",
  data?: RequestData,
): Promise<T> => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return requestWithRefresh<T>(endpoint, {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: accessToken,
      },
    });
  } else {
    return Promise.reject();
  }
};

export const fetchIngredients = () => {
  return request<ServerIngredientsResponse>("ingredients").then((res) =>
    res.success ? res.data : Promise.reject(res),
  );
};

export const login = (data: FormData) =>
  requestPost<ServerUserResponse>("auth/login", data).then((res) => {
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    return res.user;
  });

export const register = (data: FormData) =>
  requestPost<ServerUserResponse>("auth/register", data).then((res) => {
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    return res.user;
  });

export const requestUser = () =>
  requestWithAccessToken<ServerUserResponse>("auth/user").then((res) =>
    res.success ? res.user : Promise.reject(res),
  );

export const requestUpdateUser = (data: FormData) =>
  requestWithAccessToken<ServerUserResponse>("auth/user", "PATCH", data).then(
    (res) => (res.success ? res.user : Promise.reject(res)),
  );

export const requestUserAuth = () => {
  if (localStorage.getItem("accessToken")) {
    return requestUser().catch((res) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return Promise.reject(res);
    });
  } else {
    return Promise.reject();
  }
};

export const passwordReset = (data: FormData) =>
  requestPost<ServerMessageResponse>("password-reset/reset", data);

export const passwordResetRequest = (data: FormData) =>
  requestPost<ServerMessageResponse>("password-reset", data);

export const logout = () => {
  const token = localStorage.getItem("refreshToken");
  if (token) {
    return requestPost<ServerMessageResponse>("auth/logout", { token }).then(
      () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      },
    );
  } else {
    Promise.reject();
  }
};

export const requestSendOrder = (data: ArrayData) =>
  requestWithAccessToken<ServerOrderResponse>("orders", "POST", data).then(
    (res) => (res.success ? res.order : Promise.reject(res)),
  );

export const requestGetOrder = (orderNumber: string) =>
  request<ServerOrdersResponse>(`orders/${orderNumber}`).then((res) =>
    res.success ? res.orders[0] : Promise.reject(res),
  );
