export default function request(endpoint, options) {
  const URL = "https://norma.nomoreparties.space/api/";
  const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка ${res.status}`);
  };

  return fetch(`${URL + endpoint}`, options)
    .then(checkResponse)
    .catch((error) => {
      console.log("Ошибка: " + error.message);
    });
}

const requestPost = (endpoint, data) => {
  return request(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  }).then((data) => (data.success ? data : Promise.reject(data)));
};

const requestWithRefresh = async (endpoint, options) => {
  const refreshToken = () => {
    return requestPost("auth/token", {
      token: localStorage.getItem("refreshToken"),
    }).then((refreshData) => {
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      return refreshData;
    });
  };

  try {
    return await request(endpoint, options);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      options.headers.authorization = refreshData.accessToken;
      return await request(endpoint, options);
    } else {
      return Promise.reject(err);
    }
  }
};

export const fetchIngredients = () => {
  return request("ingredients").then((data) => data.success && data.data);
};

export const login = (data) => {
  return requestPost("auth/login", data);
};

export const register = (data) => {
  return requestPost("auth/register", data);
};

export const logout = () => {
  return requestPost("auth/logout", {
    token: localStorage.getItem("refreshToken"),
  });
};

export const passwordResetRequest = (data) => {
  return requestPost("password-reset", data);
};

export const passwordReset = (data) => {
  return requestPost("password-reset/reset", data);
};

export const requestUser = () => {
  return requestWithRefresh("auth/user", {
    headers: { authorization: localStorage.getItem("accessToken") },
  });
};

export const requestSendOrder = (data) => {
  return requestWithRefresh("orders", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};

export const requestUpdateUser = (data) => {
  return requestWithRefresh("auth/user", {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      authorization: localStorage.getItem("accessToken"),
    },
  });
};
