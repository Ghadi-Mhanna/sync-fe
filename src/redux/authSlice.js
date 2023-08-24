import {createSlice} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";

import {login} from "../config/api";

const initialState = {
  isLoading: false,
  error: "",
  user: null,
  access_token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
      state.error = "";
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action?.payload;
    },

    loginSuccess: (state, action) => {
      localStorage.setItem("access_token", action?.payload?.access_token);
      state.isLoading = false;
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
    },
    logout: (state) => {
      state.user = null;
      localStorage.clear();
      // localStorage.removeItem("access_token");

      state.access_token = "";
    },
  },
});

export function loginUser(data) {
  return async (dispatch) => {
    dispatch(authSlice.actions.startLoading());
    try {
      const res = await login(data);
      if (res.status === 200) {
        dispatch(authSlice.actions.loginSuccess(res.data));
      } else {
        dispatch(authSlice.actions.hasError(res?.data?.message));
      }
      return {status: res.status, message: res?.data?.message};
    } catch (error) {
      dispatch(authSlice.actions.hasError(error));
      return {status: 500, message: "Something went wrong"};
    }
  };
}

export function logoutUser() {
  return async (dispatch) => {
    dispatch(authSlice.actions.logout());
  };
}

export default authSlice.reducer;
