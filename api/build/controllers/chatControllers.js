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
Object.defineProperty(exports, "__esModule", { value: true });
const Chat_1 = require("../entity/Chat");
class ChatControllers {
    /**
     * url -> /api/v1/chats/create
     * method -> POST
     * acccess -> both
     */
    static createChat(req, res) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const { users: bodyUsers } = req.body;
            if (!Array.isArray(bodyUsers) || !bodyUsers.length)
                return res.status(400).json({ message: "Please select someone" });
            const reqUser = {
                id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                uuid: (_b = req.user) === null || _b === void 0 ? void 0 : _b.uuid,
                name: (_c = req.user) === null || _c === void 0 ? void 0 : _c.name,
                username: (_d = req.user) === null || _d === void 0 ? void 0 : _d.username,
                status: (_e = req.user) === null || _e === void 0 ? void 0 : _e.status,
                image: (_f = req.user) === null || _f === void 0 ? void 0 : _f.image,
            };
            const members = [...bodyUsers, reqUser];
            try {
                const chat = Chat_1.Chat.create({
                    users: members.map((u) => ({
                        id: u.id,
                        uuid: u.uuid,
                        username: u.username,
                        name: u.name,
                        image: u.image,
                        status: u.status,
                    })),
                });
                yield chat.save();
                res.status(201).json({ message: "Ready to chat😍", chat });
            }
            catch (error) {
                console.log(error);
                res
                    .status(500)
                    .json({ message: "Something went wrong try again later", error });
            }
        });
    }
    /**
     * for get all chat
     * url -> /api/v1/chats/get-all
     * method -> GET
     * acccess -> both
     */
    static getChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username: requestedUser } = req.user;
            if (!requestedUser) {
                return res.status(401).json({ message: "you haven't username, sorry" });
            }
            Chat_1.Chat.find({
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
                .then((chats) => {
                const chatsWithRequestedUser = chats.filter((chat) => {
                    const usernames = chat.users.map((user) => user.username);
                    return usernames.includes(requestedUser);
                });
                if (chatsWithRequestedUser.length > 0) {
                    const chatsWithAllUsers = chatsWithRequestedUser.map((chat) => {
                        const allUsers = chat.users.map((user) => user.username);
                        return Object.assign(Object.assign({}, chat), { allUsers });
                    });
                    return res.status(200).json(chatsWithAllUsers);
                }
                else {
                    return res.status(404).json({ message: "Chats not found!" });
                }
            })
                .catch((error) => {
                console.log(error);
                res.status(500).json({ message: "Something went wrong!" });
            });
        });
    }
    /**
     * url -> /api/v1/chats/delete/:uuid
     * method -> DELETE
     * access -> both
     */
    static deleteChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * url -> /api/v1/chats/update/:uuid
     * method -> DELETE
     * access -> both
     */
    static updateChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = ChatControllers;
//# sourceMappingURL=chatControllers.js.map