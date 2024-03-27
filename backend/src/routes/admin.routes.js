import express from "express";
import { AdminController } from "../controllers/Admin.js";

const adminRoutes = express.Router();

/**
 *  Routes
 */
adminRoutes.post("/create", AdminController.addNewAdmin);

export default adminRoutes;
