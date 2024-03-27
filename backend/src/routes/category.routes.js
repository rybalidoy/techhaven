import express from "express";
import { CategoryController } from "../controllers/Category.js";

const categoryRoutes = express.Router();

categoryRoutes.get("/", CategoryController.fetchAll);
categoryRoutes.post("/create", CategoryController.createNewCategory);

export default categoryRoutes;
