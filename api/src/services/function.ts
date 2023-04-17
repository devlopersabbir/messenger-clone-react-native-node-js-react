import { Response } from "express";
import { IUser } from "../utils/interfaces/interfaces";
import { JwtPayload } from "jsonwebtoken";
import Jwt from "./jwt";

export class SendResponse {
  public static ResponseWithJwt(res: Response, user: IUser, message: string) {
    const payload: JwtPayload = {
      uuid: user?.uuid,
      username: user?.username,
    };
    const accessToken = Jwt.generateAccessToken(payload);
    res.status(200).json({
      message,
      accessToken,
      user: {
        uuid: user?.uuid,
        username: user?.username,
        name: user?.name,
        email: user?.email,
        image: user?.image,
        status: user?.status,
      },
    });
  }
}
