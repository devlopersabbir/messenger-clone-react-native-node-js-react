"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const chatControllers_1 = __importDefault(require("../controllers/chatControllers"));
const router = (0, express_1.Router)();
router.post("/create", authMiddleware_1.AuthMiddleware.middleware, chatControllers_1.default.createChat);
router.get("/get-all", authMiddleware_1.AuthMiddleware.middleware, chatControllers_1.default.getChat);
exports.default = router;
//# sourceMappingURL=chat.js.map