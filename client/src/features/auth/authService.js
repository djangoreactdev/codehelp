import axios from "axios";

const REGISTER_URL = "/auth/users/";
const LOGIN_URL = "/auth/jwt/create/";
const ACTIVATE_URL = "/auth/users/activation/";

// Register user
const register = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios.post(REGISTER_URL, userData, config);
  return response.data;
};

// Login user

const login = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(LOGIN_URL, userData, config);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => localStorage.removeItem("user");

const activate = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(ACTIVATE_URL, userData, config);
  return response.data;
};

const authService = { register, login, logout, activate };

export default authService;
