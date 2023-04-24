"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileUploadController_1 = __importDefault(require("../../controllers/fileUpload/fileUploadController"));
const router = (0, express_1.Router)();
router.post("/", fileUploadController_1.default.singleFileUpload);
exports.default = router;
//# sourceMappingURL=fileUploadRoute.js.map