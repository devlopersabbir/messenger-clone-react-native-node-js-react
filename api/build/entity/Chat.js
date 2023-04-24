"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const typeorm_1 = require("typeorm");
const Modal_1 = __importDefault(require("./Modal/Modal"));
const User_1 = require("./User");
const Message_1 = require("./Message");
let Chat = class Chat extends Modal_1.default {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Chat.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "gray.100" }),
    __metadata("design:type", String)
], Chat.prototype, "chatBackgroundColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Chat.prototype, "myTextColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Chat.prototype, "partnerTextColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: "New contact..." }),
    __metadata("design:type", String)
], Chat.prototype, "lastMessage", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1.User, (user) => user.chats, { cascade: true }),
    __metadata("design:type", Array)
], Chat.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Message_1.Messages, (message) => message.chat),
    __metadata("design:type", Array)
], Chat.prototype, "messages", void 0);
Chat = __decorate([
    (0, typeorm_1.Entity)("Chat")
], Chat);
exports.Chat = Chat;
// const chat = await chatRepository.findOne({ where: { id: chatId }, relations: ["incomingCalls"] });
// const incomingCalls = chat.incomingCalls;
// const message = await messageRepository.findOne({ where: { id: messageId }, relations: ["outgoingCalls"] });
// const outgoingCalls = message.outgoingCalls;
//# sourceMappingURL=Chat.js.map