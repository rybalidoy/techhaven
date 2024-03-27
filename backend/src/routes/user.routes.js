import express from "express";
import { UserController } from "../controllers/Users.js";

const userRoutes = express.Router();

/**
 *  Routes
 */

userRoutes.get("/", UserController.fetchAll);
userRoutes.post("/create", UserController.createNewUser);
userRoutes.post("/edit", UserController.updateUser);
userRoutes.post("/delete/:id", UserController.deleteUser);
userRoutes.post("/login", UserController.login);

export default userRoutes;
