import axiosIntance from "../helpers/axios";
import { categoryContants, productContants, initialDataContants, orderConstants } from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axiosIntance.post(`/initialdata`);
    if (res.status === 200) {
      const { categories, products, orders } = res.data;
      dispatch({
        type: categoryContants.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productContants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
    }
  };
};
