import { PayloadAction } from "@reduxjs/toolkit";
import { IInitialSocketState, IUser } from "../interfaces/interface";

export type TSocketAction = "update_socket";
export type TSocketPayload = IInitialSocketState;

// for redux auth slice
export type TAuthPayload = {
  user?: IUser | null;
  accessToken?: string | null;
};

export type TAuthAction =
  | PayloadAction<TAuthPayload, "auth/login">
  | PayloadAction<undefined, "auth/logout">;
