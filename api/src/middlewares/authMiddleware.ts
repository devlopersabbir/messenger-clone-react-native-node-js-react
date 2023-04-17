import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entity/User";

export class AuthMiddleware {
  public static middleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer "))
      return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      async (error: any, decoded: any) => {
        if (error) return res.status(403).json({ message: "Forbidden", error });
        const user = await User.findOneOrFail({
          where: { uuid: decoded?.uuid },
        });
        if (!user) return res.status(401).json({ message: "Unauthorized" });
        req.user = user;
        next();
      }
    );
  }
}
