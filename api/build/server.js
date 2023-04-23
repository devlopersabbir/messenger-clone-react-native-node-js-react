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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const socket_1 = require("./socket");
const routes_1 = require("./routes");
const root_1 = __importDefault(require("./routes/root/root"));
const data_source_1 = require("./data-source");
const path_1 = __importDefault(require("path"));
const dev_http_logger_1 = require("dev-http-logger");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, express_fileupload_1.default)());
app.use((0, dev_http_logger_1.logger)({ origin: true }));
app.use("/", root_1.default);
app.use(body_parser_1.default.urlencoded({
    extended: false,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(express_1.default.static(path_1.default.join(__dirname, "uploads")));
// all routes
app.use("/api/v1/auth", routes_1.authRoute);
app.use("/api/v1/users", routes_1.userRoute);
app.use("/api/v1/messages", routes_1.messageRoute);
app.use("/api/v1/chats", routes_1.chatRoute);
app.use("/api/v1/uploads", routes_1.uploadRoute);
// app.get("/*", (req: Request, res: Response) => {
//   res.status(404);
//   if (req.accepts("html")) {
//     res.sendFile(path.join(__dirname, "views", "404.html"));
//   } else if (req.accepts("json")) {
//     res.json({ message: "404 Not found" });
//   } else {
//     res.type("txt").send("404 not found");
//   }
// });
/**
 *
 * socket server start here
 *
 */
const server = http_1.default.createServer(app);
new socket_1.SocketServer(server);
const PORT = process.env.PORT || 4000;
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    server.listen(PORT, () => console.log(`🚀 Server is running... at ${PORT}`));
}))
    .catch((error) => {
    console.log(error);
    process.exit(1);
});
//# sourceMappingURL=server.js.map