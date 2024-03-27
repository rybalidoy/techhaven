import Collection from "../model/Collection.js";
import { AuthService } from "../service/auth.js";

export class CollectionController {
    static async fetchAll(req, res) {
        try {
            const collections = await Collection.find({});
            res.status(200).json(collections);
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "Internal server error" });
        }
    }

    static async createNewCollection(req, res) {
        try {
            const { userId, collection } = req.body;
            const user = await AuthService.isAdmin(userId);

            if (!user.isAdmin) {
                return res
                    .status(400)
                    .json({ message: "You are not authorized" });
            }

            const newCollection = await Collection.create({
                name: collection.name,
                imageUrl: collection.imageUrl,
                adminId: user.id,
                categoryId: collection.categoryId,
            });

            res.status(201).json({
                message: "Successfully created new collection",
                collection: newCollection,
            });
        } catch (err) {
            console.error(err);
            res.status(400).json({ message: "Internal server error" });
        }
    }
}
