import Collection from "../model/Collection.js";
import Product from "../model/Product.js";
import { AuthService } from "../service/auth.js";

export class ProductController {
    static async fetchAll(req, res) {
        try {
            const products = await Product.find({});
            res.status(200).json(products);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "Internal server error" });
        }
    }
    static async fetchProductsByCollection(req, res) {
        try {
            const collectionId = await Collection.findOne({
                name: req.params.collectionName,
            }).select({ _id: 1 });

            if (!collectionId) {
                return res
                    .status(404)
                    .json({ message: "Collection not found" });
            }

            const products = await Product.find({
                collectionId: collectionId,
            });
            res.status(200).json(products);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "Internal server error" });
        }
    }
    static async textSearch(req, res) {
        try {
            // var string = req.query.q;
            // var regex = new RegExp(["^", string, "$"].join(""), "i");

            if (req.query.q == "") {
                const products = await Product.find({});
                return res.status(200).json(products);
            }
            const products = await Product.find({
                $text: { $search: req.query.q, $caseSensitive: false },
            });
            res.status(200).json(products);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "Internal server error" });
        }
    }

    static async fetchBrands(req, res) {
        try {
            const brands = await Product.aggregate([
                { $group: { _id: "$brand" } },
                { $project: { _id: 0, brand: "$_id" } },
            ]);

            // Extract the brand names from the array of objects
            const brandNames = brands.map((brandObj) => brandObj.brand);

            res.status(200).json(brandNames);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "Internal server error" });
        }
    }
    static async createProduct(req, res) {
        try {
            const { userId, product } = req.body;
            const user = await AuthService.isAdmin(userId);

            if (!user.isAdmin) {
                return res.status(401).json({
                    message: "You are not authorized",
                });
            }

            const newProduct = await Product.create({
                name: product.name,
                brand: product.brand,
                description: product.description,
                imageUrl: product.imageUrl,
                defaultPrice: product.defaultPrice,
                totalStock: product.totalStock,
                totalSold: product.totalSold,
                variants: product.variants,
                adminId: user.id,
                collectionId: product.collectionId,
            });

            res.status(201).json({
                message: "Created new product successfully",
                newProduct,
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "Internal server error" });
        }
    }
    static async updateProduct(req, res) {
        try {
            const { userId, product } = req.body;
            const user = await AuthService.isAdmin(userId);

            if (!user.isAdmin) {
                return res.status(401).json({
                    message: "You are not authorized",
                });
            }

            const updateProduct = await Product.findOneAndUpdate({
                name: product.name,
                brand: product.brand,
                description: product.description,
                imageUrl: product.imageUrl,
                defaultPrice: product.defaultPrice,
                totalStock: product.totalStock,
                totalSold: product.totalSold,
                variants: product.variants,
                collectionId: product.collectionId,
            });

            res.status(201).json({
                message: "Updated product succesfully",
                updateProduct,
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "Internal server error" });
        }
    }
    static async deleteProduct(req, res) {}
}
