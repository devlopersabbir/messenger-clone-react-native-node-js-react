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
const User_1 = require("../entity/User");
const bcrypt_1 = require("bcrypt");
const function_1 = require("../services/function");
class AuthController {
    /**
     * url => /api/v1/auth/register
     * method => POST
     * access => both
     */
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, name, email, password, image } = req.body;
            if (!username || !password)
                return res.status(400).json({
                    message: "Username & Password required!",
                });
            const hassPass = yield (0, bcrypt_1.hash)(password, 10);
            if (!hassPass)
                return res.status(400).json({ message: "Fail to has password!" });
            try {
                const isUser = yield User_1.User.findOne({ where: { username } });
                if (isUser)
                    return res.status(404).json({ message: "Username already exits!" });
                const createUser = User_1.User.create({
                    username,
                    name,
                    email,
                    password: hassPass,
                    image,
                });
                yield createUser.save();
                res.status(201).json({ message: `Hi ${name}` });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Server error", error });
            }
        });
    }
    /**
     * url => /api/v1/auth/login
     * method => POST
     * access => both
     */
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!username || !password)
                return res.status(400).json({ message: "Username & Password required!" });
            try {
                const isUser = yield User_1.User.findOne({ where: { username } });
                if (!isUser)
                    return res.status(404).json({ message: "Invalid username!" });
                const comparePassword = yield (0, bcrypt_1.compare)(password, isUser === null || isUser === void 0 ? void 0 : isUser.password);
                if (!comparePassword)
                    return res.status(404).json({ message: "Password incrorrect!" });
                function_1.SendResponse.ResponseWithJwt(res, isUser, `Hi ${isUser.name}! you are logged in.`);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ message: "Server error", error });
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=authControllers.js.map