"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post("/search", authMiddleware_1.AuthMiddleware.middleware, userControllers_1.default.searchUser);
router.get("/:uuid", authMiddleware_1.AuthMiddleware.middleware, userControllers_1.default.getSingleUser);
exports.default = router;
//# sourceMappingURL=user.js.map