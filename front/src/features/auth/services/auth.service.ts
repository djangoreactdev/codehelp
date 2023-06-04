import axios from "axios";

import { getCookie, setCookie, removeCookie } from "typescript-cookie";
import { DecodedJwt } from "../models/DecodedJwt.interface";
import { DisplayUser } from "../models/DisplayUser.interface";
import { Jwt, JwtBack } from "../models/Jwt";
import { LoginUser } from "../models/LoginUser.interface";
import { NewUser } from "../models/NewUser";
import { config, cookie_attributes } from "../CSRFToken";

export const teg_config = {
  // prettier-ignore
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
};

const register = async (
  newUser: NewUser
): Promise<{
  status: string;
  user: DisplayUser | null;
  jwt: Jwt | null;
  massage: any;
}> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/register/`,
    newUser
  );

  if (response.data) {
    if (response.data.status === "error") {
      return {
        status: response.data.status,
        jwt: null,
        user: null,
        massage: response.data.massage,
      };
    }

    // localStorage.setItem("jwt", JSON.stringify({ token: response.data.token }));
    // const decodedJwt: DecodedJwt = jwt_decode(response.data.token);
    // localStorage.setItem("user", JSON.stringify(response.data.user));
    setCookie("user", JSON.stringify(response.data.user), cookie_attributes);
    setCookie("accessToken", response.data.jwt.accessToken, cookie_attributes);
    setCookie("JwtBack", JSON.stringify(response.data.jwt), cookie_attributes);
    return {
      status: response.data.status,
      jwt: response.data.jwt.accessToken,
      user: response.data.user,
      massage: response.data.massage,
    };
  }
  return { status: "error", jwt: null, user: null, massage: response.status };
};

const login = async (
  user: LoginUser
): Promise<{
  status: string;
  user: DisplayUser | undefined;
  jwt: Jwt | undefined;
  massage: any;
}> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/login/`,
    user
    // { withCredentials: true }
  );
  console.log(response.data);
  if (response.data) {
    if (response.data.status === "error") {
      return {
        status: response.data.status,
        jwt: null,
        user: null,
        massage: response.data.massage,
      };
    }

    setCookie("user", JSON.stringify(response.data.user), cookie_attributes);
    setCookie("accessToken", response.data.jwt.accessToken, cookie_attributes);
    setCookie("JwtBack", JSON.stringify(response.data.jwt), cookie_attributes);

    return {
      status: response.data.status,
      jwt: response.data.jwt.accessToken,
      user: response.data.user,
      massage: response.data.massage,
    };
  }
  return { status: "error", jwt: null, user: null, massage: response.status };
};

const logout = async (token: Jwt): Promise<boolean> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/logout/`,
    { token }
  );

  if (response.data) {
    removeCookie("csrftoken");
    removeCookie("sessionid");
    removeCookie("user");
    removeCookie("accessToken");
    removeCookie("JwtBack");
    return true;
  }

  return false;
};

const verifyJwt = async (): Promise<boolean> => {
  // try {
  //   const response = await axios.post(
  //     `${process.env.REACT_APP_BASE_API}/auth/token/verify/`,
  //     { token: getCookie("accessToken") }
  //   );
  //   if (response.status === 200) {
  //     return true;
  //   }
  // } catch (error) {
  //   // Handle the error

  //   removeCookie("csrftoken");
  //   removeCookie("sessionid");
  //   removeCookie("user");
  //   removeCookie("accessToken");
  //   removeCookie("JwtBack");
  //   return false;
  // }
  if (getCookie("accessToken")) {
    return true;
  } else {
    removeCookie("csrftoken");
    removeCookie("sessionid");
    removeCookie("user");
    removeCookie("accessToken");
    removeCookie("JwtBack");
    return false;
  }
};

const authService = {
  register,
  login,
  logout,
  verifyJwt,
};

export default authService;
