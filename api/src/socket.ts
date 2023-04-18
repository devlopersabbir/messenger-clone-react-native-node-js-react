import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { authencate } from "./middlewares/socketMiddleware";
import { Messages } from "./entity/Message";
import { Chat } from "./entity/Chat";
import { User } from "./entity/User";
import { Request, Response } from "express";
import express from "express";
import { Status } from "./utils/enums/enum";
import { Call } from "./entity/Call";
const router = express.Router();

export class SocketServer {
  public static instance: SocketServer;
  public io: Server;
  socket: Socket | null;
  private connectedUserUsername: string;

  constructor(server: HttpServer) {
    SocketServer.instance = this;
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      },
    });
    this.socket = null;
    this.io.use(authencate);
    // make sure socket is statrted
    console.log("Socket started...");
    this.io.on("connection", this.StartListening);
  }
  StartListening = (socket: Socket) => {
    this.socket = socket;
    this.connectedUserUsername = socket.data?.user?.username;
    console.log(`socket connected id. `, this.connectedUserUsername);
    socket.join(socket.data?.user?.uuid);

    // When user connect here I update this user status
    /**
     * We will do it latter.
     */

    // send message
    socket.on("chat_message", async (payload, cb) => {
      const { chatUuid, text, image } = payload;
      const chat = await Chat.findOneOrFail({
        where: { uuid: chatUuid },
        relations: { users: true },
      });
      if (!chat) return console.log("chat not found");

      const user = await User.findOneOrFail({
        where: { uuid: socket.data?.user?.uuid },
        relations: { chats: true },
      });
      if (!user) return console.log("user not found!");
      try {
        const message = Messages.create({
          text,
          image,
          chatUuid: chat.uuid,
          userUuid: user.uuid,
          user,
          chat,
        });
        await message.save();
        const othersUser = chat?.users?.filter((u) => u.uuid !== user.uuid);
        othersUser?.forEach((user) => {
          socket?.broadcast.to(user?.uuid).emit("reverse_message", { message });
          socket?.broadcast.to(user?.uuid).emit("update_chat", { chat });
        });
        cb({ message });
      } catch (error) {
        console.log("Create message socket or db user error", error);
      }
    });

    // join user for audio call or video call.
    socket.on("join-call", async (payload, cb) => {
      const { callType, partnerUuid, chatUuid } = payload;

      try {
        const chat = await Chat.findOneOrFail({
          where: { uuid: chatUuid },
          relations: { users: true },
        });
        if (!chat) return console.log("Chat not found!");
        const user = await User.findOneOrFail({
          where: { uuid: socket.data?.user?.uuid },
          relations: { chats: true },
        });
        if (!user) return console.log("User not found!");

        const othersUser = chat?.users?.filter((u) => u.uuid !== user.uuid);
        othersUser?.forEach((user) => {
          socket?.broadcast.to(user?.uuid).emit("joined", { chatUuid });
        });
      } catch (error) {
        console.log("Fail to create call...!", error);
      }
    });

    // when user typing
    socket.on("typing", ({ chat, isTyping }) => {
      const chatMember = chat?.users?.filter(
        (m: any) => m.uuid !== socket.data?.users?.uuid
      );
      // chatMember?.map((user: any) => {
      //   socket.broadcast.to(user.uuid).emit("typing", { typing: isTyping });
      // });
      chatMember?.map((user: any) => {
        // emit to all members except the user who is typing
        if (user.uuid !== chat?.typingUser) {
          socket.broadcast.to(user.uuid).emit("typing", { typing: isTyping });
        }
      });
      // socket.emit("typing", { typing: isTyping });
    });

    // when your leave
    socket.on("disconnect", () => {
      console.log(`socket disconnected: ${socket.data?.user?.username}`);
    });
  };
}
