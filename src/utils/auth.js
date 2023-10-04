import { checkResponse } from "./Api";

export const baseUrl = "http://localhost:3001";

//Signin
export const signIn = (email, password) => {
  console.log(email);
  console.log(password);

  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

//Signup
// export const signup = ({ name, avatar, email, password }) => {
//   fetch(`${baseUrl}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name, avatar, email, password }),
//   });
// };
//Registering

export const checkToken = ({ token }) => {
  const url = `${baseUrl}/users/me`;
  console.log("URL:", url);
  console.log("Token:", token);
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
export const register = (email, password, name, avatar) => {
  console.log(email);
  console.log(password);
  console.log(name);
  console.log(avatar);
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, avatar, password }),
  }).then((response) => {
    try {
      if (response === 200) {
        return response.json();
      }
    } catch (e) {
      console.error(e);
      return e;
    }
  });
};
