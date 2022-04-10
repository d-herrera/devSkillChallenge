const url = "http://localhost:8081/api/members";

export const getUserList = async (userToken) => {
  if (userToken) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });
    const userList = await response.json();

    return userList;
  }
};

export const saveNewUser = (newUser, userToken) => {
  let response = {
    isSuccess: null,
    hasError: null,
    errorMsg: null,
    data: null,
  };

  return fetch("http://localhost:8081/api/members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify(newUser),
  })
    .then((rawData) => rawData.json())
    .then((data) => {
      if (data.code) {
        response.hasError = true;
        response.errorMsg = data.message;
        return response;
      } else {
        response.isSuccess = true;
        response.data = data;
        return response;
      }
    });
};
