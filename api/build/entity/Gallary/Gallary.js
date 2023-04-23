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
exports.Gallary = void 0;
const typeorm_1 = require("typeorm");
const Modal_1 = __importDefault(require("../Modal/Modal"));
const User_1 = require("../User");
let Gallary = class Gallary extends Modal_1.default {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Gallary.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.gallarys),
    (0, typeorm_1.JoinColumn)({ name: "user_uuid" }),
    __metadata("design:type", User_1.User)
], Gallary.prototype, "users", void 0);
Gallary = __decorate([
    (0, typeorm_1.Entity)("Gallary")
], Gallary);
exports.Gallary = Gallary;
//# sourceMappingURL=Gallary.js.map