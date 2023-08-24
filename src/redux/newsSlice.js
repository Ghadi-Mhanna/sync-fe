import {createSlice} from "@reduxjs/toolkit";

import {getAllNews, getOneNews} from "../config/api";

const initialState = {
  isLoading: false,
  error: "",
  news: [],
  oneNews: {},
};

const newsSlice = createSlice({
  name: "news",
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

    fetchAllNewsSuccess: (state, action) => {
      state.isLoading = false;
      state.news = action.payload.data;
    },
    fetchOneNewsSuccess: (state, action) => {
      state.isLoading = false;
      state.oneNews = action.payload.data;
    },
  },
});

export function fetchAllNews() {
  return async (dispatch) => {
    dispatch(newsSlice.actions.startLoading());
    try {
      const res = await getAllNews();
      if (res.status === 200) {
        dispatch(newsSlice.actions.fetchAllNewsSuccess(res.data));
      } else {
        dispatch(newsSlice.actions.hasError(res?.data?.message));
      }
      return {status: res.status, message: res?.data?.message};
    } catch (error) {
      dispatch(newsSlice.actions.hasError(error));
      return {status: 500, message: "Something went wrong"};
    }
  };
}

export function fetchOneNews(uuid) {
  return async (dispatch) => {
    dispatch(newsSlice.actions.startLoading());
    try {
      const res = await getOneNews(uuid);
      if (res.status === 200) {
        dispatch(newsSlice.actions.fetchOneNewsSuccess(res.data));
      } else {
        dispatch(newsSlice.actions.hasError(res?.data?.message));
      }
      return {status: res.status, message: res?.data?.message};
    } catch (error) {
      dispatch(newsSlice.actions.hasError(error));
      return {status: 500, message: "Something went wrong"};
    }
  };
}

export default newsSlice.reducer;
