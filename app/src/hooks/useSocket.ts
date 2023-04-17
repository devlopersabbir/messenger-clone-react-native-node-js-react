import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";
import { baseURLSocket } from "../utils/axios/axios";

const useSocket = (): Socket => {
  const { token } = useSelector(({ authReducer }: any) => authReducer);
  const { current: socket } = useRef(
    io(baseURLSocket, {
      auth: {
        token: `Bearer ${token}`,
      },
      autoConnect: false,
    })
  );
  useEffect(() => {
    socket.connect();
    socket.on("online", (data) => {
      console.log("from use socket: ", data);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  return socket;
};
export default useSocket;
