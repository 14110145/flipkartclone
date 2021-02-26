import authReducer from "./auth.reducers";
import userReducer from "./user.reducer";
import productReducer from "./product.reducers";
import categoryReducer from "./category.reducers";
import orderReducer from "./order.reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  product: productReducer,
  category: categoryReducer,
  order: orderReducer,
});

export default rootReducer;
