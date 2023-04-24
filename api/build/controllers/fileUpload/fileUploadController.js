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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class FileUpload {
    static singleFileUpload(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.files.file)
                return res.status(400).json({ message: "File missing..." });
            const file = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.file;
            if ((file === null || file === void 0 ? void 0 : file.mimetype) !== "image/jpeg" &&
                (file === null || file === void 0 ? void 0 : file.mimetype) !== "image/png" &&
                (file === null || file === void 0 ? void 0 : file.mimetype) !== "image/jpg")
                return res.status(400).json({
                    message: `Please select JPG/JPEG/PNG! your file ${file === null || file === void 0 ? void 0 : file.mimetype}`,
                });
            const md5 = file === null || file === void 0 ? void 0 : file.md5;
            const fileExtesnion = path_1.default.extname(file.name);
            if (!fs_1.default.existsSync(path_1.default.join(__dirname, "../..", "uploads"))) {
                fs_1.default.mkdir(path_1.default.join(__dirname, "../..", "uploads"), (error) => {
                    console.log(error);
                    return res.status(500).json({ message: "Fail to upload file" });
                });
            }
            const imageNameWithExtension = `${md5}${fileExtesnion}`;
            // upload path
            const uploadPath = `${path_1.default === null || path_1.default === void 0 ? void 0 : path_1.default.join(__dirname, "../..", "uploads")}/${imageNameWithExtension}`;
            // move file path to the upload directory
            file.mv(uploadPath, (error) => {
                if (error)
                    return res.status(400).json({ message: "Fail to upload image!" });
            });
            return res.status(200).json(imageNameWithExtension);
        });
    }
}
exports.default = FileUpload;
//# sourceMappingURL=fileUploadController.js.map