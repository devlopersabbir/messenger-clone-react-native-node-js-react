import { Router } from "express";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import ChatControllers from "../controllers/chatControllers";

const router = Router();

router.post("/create", AuthMiddleware.middleware, ChatControllers.createChat);
router.get("/get-all", AuthMiddleware.middleware, ChatControllers.getChat);

export default router;
