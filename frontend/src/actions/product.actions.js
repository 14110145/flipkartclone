import axiosIntance from "../helpers/axios";
import { productContants } from "./constants";

export const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productContants.GET_ALL_PRODUCTS_REQUEST });
      const res = await axiosIntance.post(`product/getProducts`);
      if (res.status === 200) {
        const { products } = res.data;
        dispatch({ type: productContants.GET_CUSTOMER_ORDER_SUCCESS, payload: { products } });
      } else {
        dispatch({ type: productContants.GET_ALL_PRODUCTS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProduct = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productContants.ADD_PRODUCT_REQUEST });
      const res = await axiosIntance.post(`/product/create`, form);
      if (res.status === 200) {
        dispatch({ type: productContants.ADD_PRODUCT_SUCCESS });
        dispatch(getProducts());
      } else {
        dispatch({ type: productContants.ADD_PRODUCT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteProductById = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axiosIntance.delete(`product/deleteProductById`, {
        data: { payload },
      });
      dispatch({ type: productContants.DELETE_PRODUCT_BY_ID_REQUEST });
      if (res.status === 202) {
        dispatch({ type: productContants.DELETE_PRODUCT_BY_ID_SUCCESS });
        dispatch(getProducts());
      } else {
        const { error } = res.data;
        dispatch({ type: productContants.DELETE_PRODUCT_BY_ID_FAILURE, payload: { error } });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
