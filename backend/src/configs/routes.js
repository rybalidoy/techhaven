import express from "express";
import userRoutes from "../routes/user.routes.js";
import adminRoutes from "../routes/admin.routes.js";
import productRoutes from "../routes/product.routes.js";
import categoryRoutes from "../routes/category.routes.js";
import collectionRoutes from "../routes/collection.routes.js";
import apiRoutes from "../routes/api.route.js";
import imageRoutes from "../routes/image.routes.js";

const routes = express.Router();

// routes.use(path,routes);
routes.use("/", apiRoutes);
routes.use("/users", userRoutes);
routes.use("/admin", adminRoutes);
routes.use("/products", productRoutes);
routes.use("/category", categoryRoutes);
routes.use("/collections", collectionRoutes);
routes.use("/images", imageRoutes);

export default routes;
