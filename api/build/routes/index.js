"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRoute = exports.callRoute = exports.chatRoute = exports.messageRoute = exports.userRoute = exports.authRoute = void 0;
var auth_1 = require("./auth");
Object.defineProperty(exports, "authRoute", { enumerable: true, get: function () { return __importDefault(auth_1).default; } });
var user_1 = require("./user");
Object.defineProperty(exports, "userRoute", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
var message_1 = require("./message");
Object.defineProperty(exports, "messageRoute", { enumerable: true, get: function () { return __importDefault(message_1).default; } });
var chat_1 = require("./chat");
Object.defineProperty(exports, "chatRoute", { enumerable: true, get: function () { return __importDefault(chat_1).default; } });
var call_1 = require("./call");
Object.defineProperty(exports, "callRoute", { enumerable: true, get: function () { return __importDefault(call_1).default; } });
var fileUploadRoute_1 = require("./fileUpload/fileUploadRoute");
Object.defineProperty(exports, "uploadRoute", { enumerable: true, get: function () { return __importDefault(fileUploadRoute_1).default; } });
//# sourceMappingURL=index.js.map