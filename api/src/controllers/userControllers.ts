import { Request, Response } from "express";
import { User } from "../entity/User";
import { Like, Not } from "typeorm";

class UserControllers {
  /**
   * search a user
   * METHOD -> POST
   * API URL -> /api/v1/users/search
   */
  public static async searchUser(req: Request, res: Response) {
    const { search } = req.body;
    const { uuid } = req.user;
    if (!search && typeof search !== "string")
      return res.status(400).json({ message: "Invalid input" });

    try {
      const users = await User.find({
        where: {
          username: Like(`%${search}%`),
          uuid: Not(uuid),
        },
        select: {
          id: true,
          uuid: true,
          username: true,
          name: true,
          status: true,
          image: true,
        },
        take: 5,
      });

      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error!" });
    }
  }

  /**
   * Get a single user
   * METHOD -> GET
   * API URL -> /api/v1/users/:uuid
   */
  public static async getSingleUser(req: Request, res: Response) {
    const { uuid } = req.params;
    if (!uuid) return res.status(400).json({ message: "Prarams not found!" });

    try {
      const users = await User.findOneOrFail({
        where: {
          uuid,
        },
        select: {
          uuid: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          status: true,
        },
      });

      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error!" });
    }
  }
}
export default UserControllers;
