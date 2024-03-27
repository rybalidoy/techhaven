import Admin from "../model/Admin.js";
import User from "../model/User.js";

export class AdminController {
    static async addNewAdmin(req, res, next) {
        try {
            const user = User.find({
                _id: req.body.userId,
            });

            if (user) {
                return res.status(400).json({
                    message: "User is already admin.",
                });
            }

            const newAdmin = await Admin.create({
                nickname: req.body.name,
                userId: req.body.userId,
                level: req.body.level,
            });

            res.status(201).json({
                message: "Successfully added new admin",
                userId: newAdmin.userId,
            });
        } catch (err) {
            console.error(err);
            //
            res.status(400).json({ message: "Internal server error" });
        }
    }
}
