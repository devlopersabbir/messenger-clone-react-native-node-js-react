import { createSlice } from "@reduxjs/toolkit";
import { IInitialMessageState } from "../../utils/interfaces/interface";

const initialState: IInitialMessageState = {
  message: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    new_message: (state, action) => {
      state.message?.push(action.payload);
    },
    set_message: (state, action) => {
      state.message?.push(action.payload);
    },
    unset_allMessage: (state) => {
      state.message = [];
    },
  },
});
export const { new_message, set_message, unset_allMessage } =
  messageSlice.actions;
export default messageSlice.reducer;
