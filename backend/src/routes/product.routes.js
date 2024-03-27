import express from "express";
import { ProductController } from "../controllers/Product.js";

const productRoutes = express.Router();

/**
 *  Routes
 */
productRoutes.get("/", ProductController.fetchAll);
productRoutes.get("/search", ProductController.textSearch);
productRoutes.post("/create", ProductController.createProduct);
productRoutes.get("/brands", ProductController.fetchBrands);
productRoutes.get(
    "/:collectionName",
    ProductController.fetchProductsByCollection
);

productRoutes.put("/edit", ProductController.updateProduct);

export default productRoutes;
