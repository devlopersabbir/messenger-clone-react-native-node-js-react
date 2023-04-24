"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Jwt {
    static generateAccessToken(payload) {
        return (0, jsonwebtoken_1.sign)(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1d",
        });
    }
    static veryfyAccessToken(token) {
        return new Promise((resolve, reject) => {
            (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
                if (error)
                    return reject(error);
                resolve(decoded);
            });
        });
    }
}
exports.default = Jwt;
//# sourceMappingURL=jwt.js.map