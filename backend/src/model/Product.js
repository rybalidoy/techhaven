import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            index: true,
        },
        description: {
            type: Object,
            required: true,
            index: true,
        },
        brand: {
            type: String,
            required: true,
            index: true,
        },
        imageUrl: {
            type: [String],
            required: true,
        },
        defaultPrice: {
            type: Number,
            required: true,
        },
        salePrice: {
            type: Number,
        },
        totalStock: {
            type: Number,
            required: true,
            default: 0,
        },
        totalSold: {
            type: Number,
            required: true,
            default: 0,
        },
        variants: {
            type: Object,
        },
        collectionId: {
            type: mongoose.Types.ObjectId,
            ref: "Collection",
        },
        adminId: {
            type: mongoose.Types.ObjectId,
            ref: "Admin",
        },
        reviews: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Review",
            },
        ],
    },
    {
        timestamps: true,
    }
);

//ProductSchema.index({"name": "text","brand":"text","description":"text"});

ProductSchema.index({ "$**": "text" }, { name: "TextIndex" });

const Product = mongoose.model("Product", ProductSchema);

export default Product;
