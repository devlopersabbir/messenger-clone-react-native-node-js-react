import { Router } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import MessageControllers from "../controllers/messageControllers";

const router = Router();

router.get(
  "/:chatId",
  AuthMiddleware.middleware,
  MessageControllers.getMessage
);

export default router;
