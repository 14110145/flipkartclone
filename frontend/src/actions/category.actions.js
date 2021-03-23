import axiosIntance from "../helpers/axios";
import { categoryContants } from "./constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({
      type: categoryContants.GET_ALL_CATEGORIES_REQUEST,
    });
    const res = await axiosIntance.get(`/category/getcategory`);
    if (res.status === 200) {
      const { categoryList } = res.data;
      dispatch({
        type: categoryContants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryContants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryContants.ADD_NEW_CATEGORY_REQUEST });
    const res = await axiosIntance.post(`/category/create`, form);
    if (res.status === 201) {
      dispatch({
        type: categoryContants.ADD_NEW_CATEGORY_SUCCESS,
        payload: { category: res.data.category },
      });
    } else {
      dispatch({
        type: categoryContants.ADD_NEW_CATEGORY_SUCCESS,
        payload: res.data.error,
      });
    }
  };
};

export const updateCategories = (form) => {
  return async (dispatch) => {
    const res = await axiosIntance.post(`/category/update`, form);
    if (res.status === 201) {
      return true;
    } else {
      console.log(res);
    }
  };
};
