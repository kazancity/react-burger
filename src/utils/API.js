export default function request(path, options) {
  const URL = "https://norma.nomoreparties.space/api/";
  const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(`Ошибка ${res.status}`);
  };

  return fetch(`${URL + path}`, options)
    .then(checkResponse)
    .catch((error) => {
      console.log("Ошибка: " + error.message);
    });
}

export const postOrder = (data) => {
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };

  return request("orders", options).then((data) => data.success && data);
};

export const fetchIngredients = () => {
  return request("ingredients").then((data) => data.success && data.data);
};
