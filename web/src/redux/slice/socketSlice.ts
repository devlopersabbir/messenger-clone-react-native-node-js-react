import { createSlice } from "@reduxjs/toolkit";
import { IInitialSocketState } from "../../utils/interfaces/interface";
import { useEffect } from "react";
import useSocket from "../../hooks/useSocket";

const initialState: IInitialSocketState = {
  socket: undefined,
};
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connect: (state) => {
      const socket = useSocket();
      useEffect(() => {
        socket.connect();
        console.log("socket is connected 🚀");
        return () => {
          socket.off("connect_error");
        };
      }, []);
    },
    disconnect: (state) => {
      const socket = useSocket();
      socket.disconnect();
    },
  },
});
export const { connect, disconnect } = socketSlice.actions;
export default socketSlice.reducer;
