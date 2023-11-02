import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import BusinessReducer from "./business.reducer";


const rootReducer = combineReducers({
  user: authReducer,
  business:BusinessReducer
});

export default rootReducer;
