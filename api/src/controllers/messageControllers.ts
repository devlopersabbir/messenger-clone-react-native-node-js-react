import { Request, Response } from "express";
import { Messages } from "../entity/Message";

class MessageControllers {
  /**
   * url -> /api/message
   * method -> POST
   * acccess -> both
   */
  public static async createMessage(req: Request, res: Response) {
    const { text, userId, chatId } = req.body;
    console.log("from message controller: ", req.body);
    try {
      const message = Messages.create({
        text,
        user: {
          uuid: userId,
        },
        chat: {
          uuid: chatId,
        },
      });
      await message.save();
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
  /**
   *
   * @param req
   * @param res
   *
   * url -> /api/:chatId
   * method -> GET
   */
  public static async getMessage(req: Request, res: Response) {
    const { chatId } = req.params;

    try {
      const message = await Messages.find({
        where: {
          chatUuid: chatId,
        },
      });
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
}
export default MessageControllers;
