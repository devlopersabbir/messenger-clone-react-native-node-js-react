import { Router } from "express";
import UserControllers from "../controllers/userControllers";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/search", AuthMiddleware.middleware, UserControllers.searchUser);
router.get(
  "/:uuid",
  AuthMiddleware.middleware,
  UserControllers.getSingleUser
);

export default router;
