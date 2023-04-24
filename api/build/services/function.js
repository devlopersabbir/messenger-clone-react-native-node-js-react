"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendResponse = void 0;
const jwt_1 = __importDefault(require("./jwt"));
class SendResponse {
    static ResponseWithJwt(res, user, message) {
        const payload = {
            uuid: user === null || user === void 0 ? void 0 : user.uuid,
            username: user === null || user === void 0 ? void 0 : user.username,
        };
        const accessToken = jwt_1.default.generateAccessToken(payload);
        res.status(200).json({
            message,
            accessToken,
            user: {
                uuid: user === null || user === void 0 ? void 0 : user.uuid,
                username: user === null || user === void 0 ? void 0 : user.username,
                name: user === null || user === void 0 ? void 0 : user.name,
                email: user === null || user === void 0 ? void 0 : user.email,
                image: user === null || user === void 0 ? void 0 : user.image,
                status: user === null || user === void 0 ? void 0 : user.status,
            },
        });
    }
}
exports.SendResponse = SendResponse;
//# sourceMappingURL=function.js.map