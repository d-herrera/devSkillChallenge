import { useState, useEffect } from "react";

function useGetUserToken() {
  const [userToken, setUserToken] = useState(null);

  const getUserToken = () => {
    return fetch("http://localhost:8081/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "sarah", password: "connor" }),
    })
      .then((rawData) => rawData.json())
      .then((data) => {
        setUserToken(data.token);
      });
  };

  useEffect(() => {
    if (!userToken) getUserToken();
  }, [userToken]);

  return userToken;
}

export default useGetUserToken;
