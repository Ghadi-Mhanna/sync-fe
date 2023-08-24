import {createSlice} from "@reduxjs/toolkit";

import {getAllCategories, getOneCategory} from "../config/api";

const initialState = {
  isLoading: false,
  error: "",
  categories: [],
  oneCategory: {},
};

const categoriesSlice = createSlice({
  name: "categories",
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

    fetchAllCategoriesSuccess: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.data;
    },
    fetchOneCategorySuccess: (state, action) => {
      state.isLoading = false;
      state.oneCategory = action.payload.data;
    },
  },
});

export function fetchAllCategories() {
  return async (dispatch) => {
    dispatch(categoriesSlice.actions.startLoading());
    try {
      const res = await getAllCategories();
      if (res.status === 200) {
        dispatch(categoriesSlice.actions.fetchAllCategoriesSuccess(res.data));
      } else {
        dispatch(categoriesSlice.actions.hasError(res?.data?.message));
      }
      return {status: res.status, message: res?.data?.message};
    } catch (error) {
      dispatch(categoriesSlice.actions.hasError(error));
      return {status: 500, message: "Something went wrong"};
    }
  };
}

export function fetchOneCategory(uuid) {
  return async (dispatch) => {
    dispatch(categoriesSlice.actions.startLoading());
    try {
      const res = await getOneCategory(uuid);
      if (res.status === 200) {
        dispatch(categoriesSlice.actions.fetchOneCategorySuccess(res.data));
      } else {
        dispatch(categoriesSlice.actions.hasError(res?.data?.message));
      }
      return {status: res.status, message: res?.data?.message};
    } catch (error) {
      dispatch(categoriesSlice.actions.hasError(error));
      return {status: 500, message: "Something went wrong"};
    }
  };
}

export default categoriesSlice.reducer;
