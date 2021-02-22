import axiosIntance from "../helpers/axios";
import { userContants } from "./constants";

export const signup = (user) => {
  return async (dispatch) => {
    const res = await axiosIntance.post(`/admin/signup`, { ...user });
    dispatch({ type: userContants.USER_REGISTER_REQUEST });
    if (res.status === 201) {
      const { message } = res.data;
      dispatch({
        type: userContants.USER_REGISTER_SUCCESS,
        payload: {
          message,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userContants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
