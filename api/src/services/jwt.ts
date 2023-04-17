import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class Jwt {
  public static generateAccessToken(payload: object) {
    return sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "1d",
    });
  }
  public static veryfyAccessToken(token: string) {
    return new Promise((resolve, reject) => {
      verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string,
        (error, decoded) => {
          if (error) return reject(error);
          resolve(decoded);
        }
      );
    });
  }
}
export default Jwt;
