import authReducer from "./auth.reducers";
import userReducer from "./user.reducer";
import productReducer from "./product.reducers";
import categoryReducer from "./category.reducers";
import orderReducer from "./order.reducers";
import { combineReducers } from "redux";
import pageReducer from "./page.reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
  page: pageReducer,
  order: orderReducer,
});

export default rootReducer;
