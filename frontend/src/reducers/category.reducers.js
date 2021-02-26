import { categoryContants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  console.log(action);
  switch (action.type) {
    case categoryContants.GET_ALL_CATEGORIES_SUCCESS:
      state = { ...state, categories: action.payload.categories };
      break;
    case categoryContants.ADD_NEW_CATEGORY_REQUEST:
      state = { ...state, loading: true };
      break;
    case categoryContants.ADD_NEW_CATEGORY_SUCCESS:
      state = { ...state, loading: false };
      break;
    case categoryContants.ADD_NEW_CATEGORY_FAILURE:
      state = { ...initState };
      break;
  }
  return state;
};
