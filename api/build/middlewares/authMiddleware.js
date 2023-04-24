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
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../entity/User");
class AuthMiddleware {
    static middleware(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer ")))
            return res.status(401).json({ message: "Unauthorized" });
        const token = authHeader.split(" ")[1];
        (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => __awaiter(this, void 0, void 0, function* () {
            if (error)
                return res.status(403).json({ message: "Forbidden", error });
            const user = yield User_1.User.findOneOrFail({
                where: { uuid: decoded === null || decoded === void 0 ? void 0 : decoded.uuid },
            });
            if (!user)
                return res.status(401).json({ message: "Unauthorized" });
            req.user = user;
            next();
        }));
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map