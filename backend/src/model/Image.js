import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ImageSchema = new Schema(
    {
        productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
        },
        image: {
            type: Buffer,
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        contentType: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Image = mongoose.model("Image", ImageSchema);

export default Image;
