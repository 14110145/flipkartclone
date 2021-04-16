import axiosIntance from "../helpers/axios";

export const updateOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axiosIntance.post("/order/update", payload);
      console.log(res);
      if (res.status === 201) {
      }
    } catch (error) {
      console.log(error);
    }
  };
};
