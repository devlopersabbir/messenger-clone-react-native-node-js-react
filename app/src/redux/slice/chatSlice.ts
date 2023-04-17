import { createSlice } from "@reduxjs/toolkit";
import { IInitialChatState } from "../../utils/interfaces/interface";

const initialState: IInitialChatState = {
  chats: [],
  selectedChat: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    set_all: (state, action) => {
      state.chats = action.payload;
    },
    new_chat: (state, action) => {
      state.chats = action.payload;
    },
    set_selected_chat: (state, action) => {
      state.selectedChat = action.payload;
    },
    unset_selected_chat: (state) => {
      state.selectedChat = null;
    },
    unset_all_chat: (state) => {
      state.chats = [];
    },
  },
});
export const {
  new_chat,
  set_all,
  set_selected_chat,
  unset_selected_chat,
  unset_all_chat,
} = chatSlice.actions;
export default chatSlice.reducer;
