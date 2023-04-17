import { Router } from "express";
import FileUpload from "../../controllers/fileUpload/fileUploadController";

const router = Router();

router.post("/", FileUpload.singleFileUpload);

export default router;
