import axiosIntance from "../helpers/axios";
import { categoryContants, productContants } from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axiosIntance.post(`/initialdata`);
    if (res.status === 200) {
      const { categories, products } = res.data;
      dispatch({
        type: categoryContants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productContants.GET_ALL_PRODUCT_SUCCESS,
        payload: { products },
      });
    }
  };
};
