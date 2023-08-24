import {createSlice} from "@reduxjs/toolkit";

import {getAllUsers, getOneUser} from "../config/api";

const initialState = {
  isLoading: false,
  error: "",
  users: [],
  oneUser: {},
};

const usersSlice = createSlice({
  name: "users",
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

    fetchAllUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.users = action.payload.data;
    },
    fetchOneUserSuccess: (state, action) => {
      state.isLoading = false;
      state.oneUser = action.payload.data;
    },
  },
});

export function fetchAllUsers() {
  return async (dispatch) => {
    dispatch(usersSlice.actions.startLoading());
    try {
      const res = await getAllUsers();
      if (res.status === 200) {
        dispatch(usersSlice.actions.fetchAllUsersSuccess(res.data));
      } else {
        dispatch(usersSlice.actions.hasError(res?.data?.message));
      }
      return {status: res.status, message: res?.data?.message};
    } catch (error) {
      dispatch(usersSlice.actions.hasError(error));
      return {status: 500, message: "Something went wrong"};
    }
  };
}

export function fetchOneUser(uuid) {
  return async (dispatch) => {
    dispatch(usersSlice.actions.startLoading());
    try {
      const res = await getOneUser(uuid);
      if (res.status === 200) {
        dispatch(usersSlice.actions.fetchOneUserSuccess(res.data));
      } else {
        dispatch(usersSlice.actions.hasError(res?.data?.message));
      }
      return {status: res.status, message: res?.data?.message};
    } catch (error) {
      dispatch(usersSlice.actions.hasError(error));
      return {status: 500, message: "Something went wrong"};
    }
  };
}

export default usersSlice.reducer;
