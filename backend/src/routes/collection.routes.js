import express from "express";
import { CollectionController } from "../controllers/Collections.js";

const collectionRoutes = express.Router();

collectionRoutes.get("/", CollectionController.fetchAll);
collectionRoutes.post("/create", CollectionController.createNewCollection);

export default collectionRoutes;
