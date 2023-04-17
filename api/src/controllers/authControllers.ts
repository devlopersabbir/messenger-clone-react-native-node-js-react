import { Request, Response } from "express";
import { User } from "../entity/User";
import { compare, hash } from "bcrypt";
import { SendResponse } from "../services/function";

class AuthController {
  /**
   * url => /api/v1/auth/register
   * method => POST
   * access => both
   */
  public static async register(req: Request, res: Response) {
    const { username, name, email, password, image } = req.body;

    if (!username || !password)
      return res.status(400).json({
        message: "Username & Password required!",
      });
    const hassPass = await hash(password, 10);
    if (!hassPass)
      return res.status(400).json({ message: "Fail to has password!" });
    try {
      const isUser = await User.findOne({ where: { username } });
      if (isUser)
        return res.status(404).json({ message: "Username already exits!" });

      const createUser = User.create({
        username,
        name,
        email,
        password: hassPass,
        image,
      });
      await createUser.save();
      res.status(201).json({ message: `Hi ${name}` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  }
  /**
   * url => /api/v1/auth/login
   * method => POST
   * access => both
   */
  public static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Username & Password required!" });

    try {
      const isUser = await User.findOne({ where: { username } });
      if (!isUser)
        return res.status(404).json({ message: "Invalid username!" });
      const comparePassword = await compare(password, isUser?.password);
      if (!comparePassword)
        return res.status(404).json({ message: "Password incrorrect!" });

      SendResponse.ResponseWithJwt(
        res,
        isUser as any,
        `Hi ${isUser.name}! you are logged in.`
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  }
}

export default AuthController;
