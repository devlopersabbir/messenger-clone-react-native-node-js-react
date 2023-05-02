import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import http from "http";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { SocketServer } from "./socket";
import {
  authRoute,
  chatRoute,
  messageRoute,
  uploadRoute,
  userRoute,
} from "./routes";
import routes from "./routes/root/root";
import { AppDataSource } from "./data-source";
import { IUser } from "./utils/interfaces/interfaces";
import path from "path";
import { logger, EPurpose } from "dev-http-logger";
dotenv.config();

declare module "express" {
  interface Request {
    user?: IUser | any;
  }
}

const app = express();
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(logger({ origin: true }));
app.use("/", routes);
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

// all routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/messages", messageRoute);
app.use("/api/v1/chats", chatRoute);
app.use("/api/v1/uploads", uploadRoute);
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
const server = http.createServer(app);
new SocketServer(server);
const PORT = process.env.PORT || 4000;
AppDataSource.initialize()
  .then(async () => {
    server.listen(PORT, () =>
      console.log(`🚀 Server is running... at ${PORT}`)
    );
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
