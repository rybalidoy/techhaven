import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CollectionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
        },
        imageUrl: {
            type: String,
        },
        adminId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Admin",
        },
        categoryId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Category",
        },
    },
    {
        timestamps: true,
    }
);

const Collection = mongoose.model("Collection", CollectionSchema);

export default Collection;
