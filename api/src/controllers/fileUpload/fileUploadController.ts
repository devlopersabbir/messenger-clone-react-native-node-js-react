import { Request, Response } from "express";
import fs from "fs";
import path from "path";

class FileUpload {
  public static async singleFileUpload(req: Request, res: Response) {
    if (!req.files.file)
      return res.status(400).json({ message: "File missing..." });

    const file: any = req?.files?.file;
    if (
      file?.mimetype !== "image/jpeg" &&
      file?.mimetype !== "image/png" &&
      file?.mimetype !== "image/jpg"
    )
      return res.status(400).json({
        message: `Please select JPG/JPEG/PNG! your file ${file?.mimetype}`,
      });

    const md5 = file?.md5;
    const fileExtesnion = path.extname(file.name);

    if (!fs.existsSync(path.join(__dirname, "../..", "uploads"))) {
      fs.mkdir(path.join(__dirname, "../..", "uploads"), (error) => {
        console.log(error);
        return res.status(500).json({ message: "Fail to upload file" });
      });
    }

    const imageNameWithExtension = `${md5}${fileExtesnion}`;

    // upload path
    const uploadPath = `${path?.join(
      __dirname,
      "../..",
      "uploads"
    )}/${imageNameWithExtension}`;
    // move file path to the upload directory
    file.mv(uploadPath, (error: any) => {
      if (error)
        return res.status(400).json({ message: "Fail to upload image!" });
    });
    return res.status(200).json(imageNameWithExtension);
  }
}
export default FileUpload;
