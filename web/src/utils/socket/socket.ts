import { io } from "socket.io-client";
import { baseURL } from "../axios/axios";
import { IAuthState } from "../interfaces/interface";

const socket = ({ token }: IAuthState) => {
  io(baseURL, {
    withCredentials: true,
    auth: {
      token: `Bearer ${token}`,
    },
    autoConnect: false,
  });
};
export default socket;
