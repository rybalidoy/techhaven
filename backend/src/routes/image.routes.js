import express from "express";
import { ImageController } from "../controllers/Images.js";

import multer from "multer";
const storage = multer.memoryStorage();

const imageRoutes = express.Router();
const upload = multer({ storage });

imageRoutes.post(
    "upload/image",
    upload.single("image"),
    ImageController.uploadImage
);

imageRoutes.post(
    "upload/images",
    upload.array("images", 5),
    ImageController.uploadImages
);

imageRoutes.get("/", ImageController.fetchImageByProductId);

export default imageRoutes;
