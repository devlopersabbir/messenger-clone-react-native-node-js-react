import { Socket } from "socket.io";
import jwt from "../services/jwt";
import { User } from "../entity/User";

export const authencate = async (socket: Socket, next: any) => {
  const bearerToken: string = socket.handshake.auth?.token;

  if (!bearerToken && !bearerToken?.startsWith("Bearer")) {
    console.log("No token bad request");
    return next(new Error("Bad Request"));
  }
  const token = bearerToken.split(" ")[1];
  try {
    const decoded: any = await jwt.veryfyAccessToken(token);
    const user = await User.findOneOrFail({
      where: { username: decoded.username },
      select: {
        uuid: true,
        name: true,
        username: true,
        status: true,
      },
    });

    if (!user) {
      console.log("Socket middlware user not found");
      next(new Error("Access denite"));
      return;
    }
    socket.data.user = { ...user };
    socket.join(user.uuid);
    next();
  } catch (error: any) {
    console.log("Scoket middleware Verify error", error);
    return next(new Error("Access denite"));
  }
};
