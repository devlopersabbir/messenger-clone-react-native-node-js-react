import { createSlice } from "@reduxjs/toolkit";
import { IInitialState } from "../../utils/interfaces/interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState: IInitialState = {
  user: null,
  token: null,
};

/**
 * asyncStorage error handle start
 */
// get data
AsyncStorage.getItem("user").then((user: any) => {
  initialState.user = JSON.parse(user);
});

AsyncStorage.getItem("token").then((token: any) => {
  initialState.token = token;
});

/**
 * asyncStorage error handle end
 */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
      // set data
      AsyncStorage.setItem("user", JSON.stringify(action.payload.user));
      AsyncStorage.setItem("token", action.payload.accessToken);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      // remove data form local storage
      AsyncStorage.removeItem("user");
      AsyncStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
