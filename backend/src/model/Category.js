import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
        },
        adminId: {
            type: mongoose.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", CategorySchema);

export default Category;
