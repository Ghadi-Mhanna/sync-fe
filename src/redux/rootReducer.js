import {combineReducers} from "redux";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";
import usersSlice from "./usersSlice";
import categoriesSlice from "./categoriesSlice";
import newsSlice from "./newsSlice";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
};

const rootReducer = combineReducers({
  auth: authSlice,
  users: usersSlice,
  categories: categoriesSlice,
  news: newsSlice,
});

export {rootPersistConfig, rootReducer};
