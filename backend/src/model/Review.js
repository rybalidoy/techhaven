import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        rating: {
            enum: [0, 1, 2, 3, 4, 5],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model("Review", ReviewSchema);

export default Review;
