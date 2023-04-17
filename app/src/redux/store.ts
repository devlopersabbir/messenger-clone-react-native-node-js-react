import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import messageReducer from "./slice/messageSlice";
import chatReducer from "./slice/chatSlice";

const rootReducer = combineReducers({
  authReducer,
  messageReducer,
  chatReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
