import { Socket } from "socket.io-client";
import { EStatus } from "../enums/eunum";

// for reduxt auth slice
export interface IInitialState extends IAuthState {}
export interface IAuthState {
  user: IUser | null;
  token: string | null;
}

// for redux socket slice
export interface IInitialSocketState {
  socket: Socket | undefined;
}

// for redux message slice
export interface IInitialMessageState {
  message: IMessage[] | null;
}

// for redux chat slice
export interface IInitialChatState {
  chats: IChat[] | null;
  selectedChat: IChat | null;
}

export interface IUser {
  id?: number;
  uuid?: string;
  name?: string;
  username?: string;
  email?: string;
  image?: string | null;
  status?: EStatus;
  updatedAt?: string;
  createdAt?: string;
  allUsers?: string[];
}

export interface IChat {
  id?: number;
  uuid?: string;
  createdAt?: string;
  lastMessage?: string | null;
  users?: IUser[];
}

export interface IMessage {
  id?: number;
  uuid: string;
  text?: string;
  userUuid?: string;
  createdAt?: string;
  users?: IUser | undefined;
  chats?: IChat | undefined;
}
