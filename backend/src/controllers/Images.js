import Image from "../model/Image.js";
import multer from "multer";
import path from "path";

// Store files in memory (you can also use disk storage)

export class ImageController {
    static async fetchImageByProductId(req, res) {
        try {
            const images = await Image.findOne({
                productId: req.body.productId, // Assuming you get productId from the request
            });

            if (!images) {
                return res.status(404).json({ message: "Not found" });
            }
            res.status(200).json(images.image);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    // Single Image Only
    static async uploadImage(req, res) {
        try {
            const { buffer } = req.file;

            // Create a new image document
            const newImage = new Image({
                image: buffer,
                productId: req.body.productId,
                fileName: req.body.fileName,
            });

            // Save the image to MongoDB
            await newImage.save();

            res.status(201).json({ message: "Image uploaded successfully" });
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: "Error uploading image" });
        }
    }

    // Add multiple image
    static async uploadImages(req, res) {
        try {
            const files = req.files;

            for (const file of files) {
                const newImage = new Image({
                    fileName: file.originalname,
                    contentType: file.mimetype,
                    productId: req.body.productId,
                    image: file.buffer,
                });

                await newImage.save();
            }
            res.status(201).json({ message: "Images uploaded successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error uploading images" });
        }
    }
}
