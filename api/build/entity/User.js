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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Modal_1 = __importDefault(require("./Modal/Modal"));
const enum_1 = require("../utils/enums/enum");
const Chat_1 = require("./Chat");
const Message_1 = require("./Message");
const Gallary_1 = require("./Gallary/Gallary");
let User = class User extends Modal_1.default {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: enum_1.Status, default: enum_1.Status.OFFLINE }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Chat_1.Chat, (chat) => chat.users),
    (0, typeorm_1.JoinTable)({
        name: "chat_and_user",
        joinColumn: {
            name: "user_uuid",
            referencedColumnName: "uuid",
        },
        inverseJoinColumn: {
            name: "chat_uuid",
            referencedColumnName: "uuid",
        },
    }),
    __metadata("design:type", Array)
], User.prototype, "chats", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Message_1.Messages, (message) => message.user),
    __metadata("design:type", Array)
], User.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Gallary_1.Gallary, (gallary) => gallary.users),
    __metadata("design:type", Array)
], User.prototype, "gallarys", void 0);
User = __decorate([
    (0, typeorm_1.Entity)("Users")
], User);
exports.User = User;
//# sourceMappingURL=User.js.map