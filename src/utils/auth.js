export const baseUrl = "http://localhost:3001";
//Signin
export const signin = ({ email, password }) => {
  fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

//Signup
export const signup = ({ name, avatar, email, password }) => {
  fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};
//Registering
export const register = (email, password, name, avatar, token) => {
  return fetch(`${baseUrl}/signup`, {
    mehod: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, name, avatar, password }, token),
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
export const checkToken = (token) => {
  return fetch(`${baseUrl}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token},`,
    },
  });
};
