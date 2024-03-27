import jwt from "jsonwebtoken";
import { authentication } from "../configs/config.js";
import Admin from "../model/Admin.js";

export class AuthService {
    static createToken({ sub }) {
        const maxAge = 3 * 24 * 60 * 60;
        return jwt.sign({ sub }, authentication.secret, {
            expiresIn: maxAge,
        });
    }

    static async isAdmin(id) {
        const admin = await Admin.findOne({
            userId: id,
        }).select({ _id: 1 });

        if (!admin) {
            return { isAdmin: false, id: null };
        }

        return { isAdmin: true, id: admin._id };
    }
}
