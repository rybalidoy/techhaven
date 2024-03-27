import Category from "../model/Category.js";
import { AuthService } from "../service/auth.js";

export class CategoryController {
    static async fetchAll(req, res) {
        try {
            const categories = await Category.find({});
            res.status(200).json(categories);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "Internal server error" });
        }
    }
    static async createNewCategory(req, res) {
        try {
            const { userId, category } = req.body;
            const user = await AuthService.isAdmin(userId);

            if (!user.isAdmin) {
                return res
                    .status(400)
                    .json({ message: "You are not authorized" });
            }

            const newCategory = await Category.create({
                name: category.name,
                adminId: user.id,
            });

            res.status(201).json({
                message: "Succesfully created new category",
                category: newCategory,
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "Internal server error" });
        }
    }
}
