"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const socket_io_1 = require("socket.io");
const socketMiddleware_1 = require("./middlewares/socketMiddleware");
const Message_1 = require("./entity/Message");
const Chat_1 = require("./entity/Chat");
const User_1 = require("./entity/User");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
class SocketServer {
    constructor(server) {
        this.StartListening = (socket) => {
            var _a, _b, _c, _d;
            this.socket = socket;
            this.connectedUserUsername = (_b = (_a = socket.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.username;
            console.log(`socket connected id. `, this.connectedUserUsername);
            socket.join((_d = (_c = socket.data) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.uuid);
            // When user connect here I update this user status
            /**
             * We will do it latter.
             */
            // send message
            socket.on("chat_message", (payload, cb) => __awaiter(this, void 0, void 0, function* () {
                var _e, _f, _g;
                const { chatUuid, text, image } = payload;
                const chat = yield Chat_1.Chat.findOneOrFail({
                    where: { uuid: chatUuid },
                    relations: { users: true },
                });
                if (!chat)
                    return console.log("chat not found");
                const user = yield User_1.User.findOneOrFail({
                    where: { uuid: (_f = (_e = socket.data) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f.uuid },
                    relations: { chats: true },
                });
                if (!user)
                    return console.log("user not found!");
                try {
                    const message = Message_1.Messages.create({
                        text,
                        image,
                        chatUuid: chat.uuid,
                        userUuid: user.uuid,
                        user,
                        chat,
                    });
                    yield message.save();
                    const othersUser = (_g = chat === null || chat === void 0 ? void 0 : chat.users) === null || _g === void 0 ? void 0 : _g.filter((u) => u.uuid !== user.uuid);
                    othersUser === null || othersUser === void 0 ? void 0 : othersUser.forEach((user) => {
                        socket === null || socket === void 0 ? void 0 : socket.broadcast.to(user === null || user === void 0 ? void 0 : user.uuid).emit("reverse_message", { message });
                        socket === null || socket === void 0 ? void 0 : socket.broadcast.to(user === null || user === void 0 ? void 0 : user.uuid).emit("update_chat", { chat });
                    });
                    cb({ message });
                }
                catch (error) {
                    console.log("Create message socket or db user error", error);
                }
            }));
            // join user for audio call or video call.
            socket.on("join-call", (payload, cb) => __awaiter(this, void 0, void 0, function* () {
                var _h, _j, _k;
                const { callType, partnerUuid, chatUuid } = payload;
                try {
                    const chat = yield Chat_1.Chat.findOneOrFail({
                        where: { uuid: chatUuid },
                        relations: { users: true },
                    });
                    if (!chat)
                        return console.log("Chat not found!");
                    const user = yield User_1.User.findOneOrFail({
                        where: { uuid: (_j = (_h = socket.data) === null || _h === void 0 ? void 0 : _h.user) === null || _j === void 0 ? void 0 : _j.uuid },
                        relations: { chats: true },
                    });
                    if (!user)
                        return console.log("User not found!");
                    const othersUser = (_k = chat === null || chat === void 0 ? void 0 : chat.users) === null || _k === void 0 ? void 0 : _k.filter((u) => u.uuid !== user.uuid);
                    othersUser === null || othersUser === void 0 ? void 0 : othersUser.forEach((user) => {
                        socket === null || socket === void 0 ? void 0 : socket.broadcast.to(user === null || user === void 0 ? void 0 : user.uuid).emit("joined", { chatUuid });
                    });
                }
                catch (error) {
                    console.log("Fail to create call...!", error);
                }
            }));
            // when user typing
            socket.on("typing", ({ chat, isTyping }) => {
                var _a;
                const chatMember = (_a = chat === null || chat === void 0 ? void 0 : chat.users) === null || _a === void 0 ? void 0 : _a.filter((m) => { var _a, _b; return m.uuid !== ((_b = (_a = socket.data) === null || _a === void 0 ? void 0 : _a.users) === null || _b === void 0 ? void 0 : _b.uuid); });
                // chatMember?.map((user: any) => {
                //   socket.broadcast.to(user.uuid).emit("typing", { typing: isTyping });
                // });
                chatMember === null || chatMember === void 0 ? void 0 : chatMember.map((user) => {
                    // emit to all members except the user who is typing
                    if (user.uuid !== (chat === null || chat === void 0 ? void 0 : chat.typingUser)) {
                        socket.broadcast.to(user.uuid).emit("typing", { typing: isTyping });
                    }
                });
                // socket.emit("typing", { typing: isTyping });
            });
            // when your leave
            socket.on("disconnect", () => {
                var _a, _b;
                console.log(`socket disconnected: ${(_b = (_a = socket.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.username}`);
            });
        };
        SocketServer.instance = this;
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "PUT", "DELETE"],
                credentials: true,
            },
        });
        this.socket = null;
        this.io.use(socketMiddleware_1.authencate);
        // make sure socket is statrted
        console.log("Socket started...");
        this.io.on("connection", this.StartListening);
    }
}
exports.SocketServer = SocketServer;
//# sourceMappingURL=socket.js.map