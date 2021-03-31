import axiosIntance from "../helpers/axios";
import { pageContants } from "./constants";

export const createPage = (form) => {
  return async (dispatch) => {
    dispatch({ type: pageContants.CREATE_PAGE_REQUEST });
    try {
      const res = await axiosIntance.post("/page/create", form);
      if (res.status === 201) {
        dispatch({ type: pageContants.CREATE_PAGE_SUCCESS, payload: { page: res.data.page } });
      }
      // else {
      //   dispatch({ type: pageContants.CREATE_PAGE_FAILURE, payload: { error } });
      // }
    } catch (error) {
      dispatch({ type: pageContants.CREATE_PAGE_FAILURE, payload: { error } });
    }
  };
};
