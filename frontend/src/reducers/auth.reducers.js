import { authConstants } from "../actions/constants";

const initState = {
  name: "LTP",
};

export default (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      console.log(action);
      state = {
        ...state,
        ...action.payload,
      };
      break;
  }
  return state;
};
