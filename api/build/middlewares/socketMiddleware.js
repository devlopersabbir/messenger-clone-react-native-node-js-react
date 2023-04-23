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
exports.authencate = void 0;
const jwt_1 = __importDefault(require("../services/jwt"));
const User_1 = require("../entity/User");
const authencate = (socket, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const bearerToken = (_a = socket.handshake.auth) === null || _a === void 0 ? void 0 : _a.token;
    if (!bearerToken && !(bearerToken === null || bearerToken === void 0 ? void 0 : bearerToken.startsWith("Bearer"))) {
        console.log("No token bad request");
        return next(new Error("Bad Request"));
    }
    const token = bearerToken.split(" ")[1];
    try {
        const decoded = yield jwt_1.default.veryfyAccessToken(token);
        const user = yield User_1.User.findOneOrFail({
            where: { username: decoded.username },
            select: {
                uuid: true,
                name: true,
                username: true,
                status: true,
            },
        });
        if (!user) {
            console.log("Socket middlware user not found");
            next(new Error("Access denite"));
            return;
        }
        socket.data.user = Object.assign({}, user);
        socket.join(user.uuid);
        next();
    }
    catch (error) {
        console.log("Scoket middleware Verify error", error);
        return next(new Error("Access denite"));
    }
});
exports.authencate = authencate;
//# sourceMappingURL=socketMiddleware.js.map