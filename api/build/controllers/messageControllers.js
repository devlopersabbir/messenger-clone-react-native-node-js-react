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
const Message_1 = require("../entity/Message");
class MessageControllers {
    /**
     * url -> /api/message
     * method -> POST
     * acccess -> both
     */
    static createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { text, userId, chatId } = req.body;
            console.log("from message controller: ", req.body);
            try {
                const message = Message_1.Messages.create({
                    text,
                    user: {
                        uuid: userId,
                    },
                    chat: {
                        uuid: chatId,
                    },
                });
                yield message.save();
            }
            catch (error) {
                res.status(500).json({ message: "Server error", error });
            }
        });
    }
    /**
     *
     * @param req
     * @param res
     *
     * url -> /api/:chatId
     * method -> GET
     */
    static getMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { chatId } = req.params;
            try {
                const message = yield Message_1.Messages.find({
                    where: {
                        chatUuid: chatId,
                    },
                });
                res.status(200).json(message);
            }
            catch (error) {
                res.status(500).json({ message: "Server error", error });
            }
        });
    }
}
exports.default = MessageControllers;
//# sourceMappingURL=messageControllers.js.map