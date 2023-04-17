import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import socketReducer from "./slice/socketSlice";
import messageReducer from "./slice/messageSlice";
import chatReducer from "./slice/chatSlice";

const rootReducer = combineReducers({
  authReducer,
  socketReducer,
  messageReducer,
  chatReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
