import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import authService from "./services/auth.service";
import { NewUser } from "./models/NewUser";
import { DisplayUser } from "./models/DisplayUser.interface";
import { Jwt } from "./models/Jwt";
import { RootState } from "../store";
import { LoginUser } from "./models/LoginUser.interface";
import { getCookie } from "typescript-cookie";

const storedUser: string | null = localStorage.getItem("user");
const user: DisplayUser | null = !!storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem("jwt");
const jwt: Jwt = !!storedJwt ? JSON.parse(storedJwt) : null;

// TODO: move higher
interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  status: string;
  massage: any;
}

interface AuthState extends AsyncState {
  user?: DisplayUser | null;
  jwt?: Jwt | null;
  isAuthenticated?: boolean;
  payload: string;
}

const initialState: AuthState = {
  user: user,
  jwt: getCookie("accessToken"),
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  status: "",
  massage: "",
  payload: "",
};

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRFToken": Cookies.get("csrftoken"),
  },
};

export const register = createAsyncThunk(
  "auth/register",
  async (user: NewUser, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to register!");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: LoginUser, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to login");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (jwt: Jwt) => {
  await authService.logout(jwt);
});

export const verifyJwt = createAsyncThunk(
  "auth/verify-jwt",
  async (jwt: string, thunkAPI) => {
    try {
      return await authService.verifyJwt();
    } catch (error) {
      return thunkAPI.rejectWithValue("Unable to verify");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.payload = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => {
        state.massage = "Loading...";
        state.status = "loading";
        state.isAuthenticated = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.massage = action.payload.massage;
        state.status = action.payload.status;
        state.jwt = action.payload.jwt || null;
        state.isAuthenticated = action.payload.status === "success";
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state) => {
        state.massage = "Error...";
        state.status = "error";
        state.user = null;
        state.isAuthenticated = false;
        state.jwt = "";
      })
      // LOGIN
      .addCase(login.pending, (state) => {
        state.massage = "Loading...";
        state.status = "loading";
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.massage = action.payload.massage;
        state.status = action.payload.status;
        state.jwt = action.payload.jwt || null;
        state.isAuthenticated = action.payload.status === "success";
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.massage = "Error...";
        state.status = "error";
        state.user = null;
        state.isAuthenticated = false;
        state.jwt = "";
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
        state.isAuthenticated = false;
      })
      // VERIFY JWT
      .addCase(verifyJwt.pending, (state) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(verifyJwt.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = action.payload;
      })
      .addCase(verifyJwt.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
      });
    // csrfToken
    // .addCase(csrftoken.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(csrftoken.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    // })
    // .addCase(csrftoken.rejected, (state) => {
    //   state.isLoading = false;
    //   state.isError = true;
    // });
  },
});

export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => {
  return state.auth;
};

export default authSlice.reducer;
