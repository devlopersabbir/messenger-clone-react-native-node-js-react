"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const messageControllers_1 = __importDefault(require("../controllers/messageControllers"));
const router = (0, express_1.Router)();
router.get("/:chatId", authMiddleware_1.AuthMiddleware.middleware, messageControllers_1.default.getMessage);
exports.default = router;
//# sourceMappingURL=message.js.map