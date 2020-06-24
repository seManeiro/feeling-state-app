import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../config/env.config.json";

const tokenKey = "token";

http.setAuthToken(getJwt());

async function registerUser(user) {
  const res = await http.post(config.backendUrl + "/newuser/register", {
    username: user.username,
    email: user.email,
    password: user.password,
  });

  return res;
}

function getUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

function getJwt(){
  return localStorage.getItem(tokenKey);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

async function login(email, password) {
  const { data } = await http.post(config.backendUrl + "/user/login", {
    email: email,
    password: password,
  });

  localStorage.setItem(tokenKey, data.token);
}

export default {
  login,
  logout,
  registerUser,
  getUser,
};
