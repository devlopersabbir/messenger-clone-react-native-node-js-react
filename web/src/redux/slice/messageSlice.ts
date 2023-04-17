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
  },
});
export const { new_message, set_message } = messageSlice.actions;
export default messageSlice.reducer;
