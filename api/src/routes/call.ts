import { Router } from "express";
const router = Router();

router.get("/get-all-calls", (req, res) => res.send("hello from call routes"));

export default router;
