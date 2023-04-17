import { Request, Response } from "express";
import { Chat } from "../entity/Chat";
import { IUser } from "../utils/interfaces/interfaces";
import { User } from "../entity/User";

class ChatControllers {
  /**
   * url -> /api/v1/chats/create
   * method -> POST
   * acccess -> both
   */
  public static async createChat(req: Request, res: Response) {
    const { users: bodyUsers } = req.body;
    if (!Array.isArray(bodyUsers) || !bodyUsers.length)
      return res.status(400).json({ message: "Please select someone" });

    const reqUser: IUser = {
      id: req.user?.id,
      uuid: req.user?.uuid,
      name: req.user?.name,
      username: req.user?.username,
      status: req.user?.status,
      image: req.user?.image,
    };
    const members = [...bodyUsers, reqUser];

    try {
      const chat = Chat.create({
        users: members.map((u) => ({
          id: u.id,
          uuid: u.uuid,
          username: u.username,
          name: u.name,
          image: u.image,
          status: u.status,
        })),
      });
      await chat.save();
      res.status(201).json({ message: "Ready to chat😍", chat });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Something went wrong try again later", error });
    }
  }

  /**
   * for get all chat
   * url -> /api/v1/chats/get-all
   * method -> GET
   * acccess -> both
   */
  public static async getChat(req: Request, res: Response) {
    const { username: requestedUser } = req.user;
    if (!requestedUser) {
      return res.status(401).json({ message: "you haven't username, sorry" });
    }
    Chat.find({
      select: {
        id: true,
        uuid: true,
        lastMessage: true,
        createdAt: true,
      },
      relations: { users: true },
      order: {
        createdAt: "desc",
      },
    })
      .then((chats: Chat[]) => {
        const chatsWithRequestedUser = chats.filter((chat: Chat) => {
          const usernames = chat.users.map((user: User) => user.username);
          return usernames.includes(requestedUser);
        });
        if (chatsWithRequestedUser.length > 0) {
          const chatsWithAllUsers = chatsWithRequestedUser.map((chat: Chat) => {
            const allUsers = chat.users.map((user: User) => user.username);
            return { ...chat, allUsers };
          });
          return res.status(200).json(chatsWithAllUsers);
        } else {
          return res.status(404).json({ message: "Chats not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
      });
  }

  /**
   * url -> /api/v1/chats/delete/:uuid
   * method -> DELETE
   * access -> both
   */
  public static async deleteChat(req: Request, res: Response) {}

  /**
   * url -> /api/v1/chats/update/:uuid
   * method -> DELETE
   * access -> both
   */
  public static async updateChat(req: Request, res: Response) {}
}
export default ChatControllers;
