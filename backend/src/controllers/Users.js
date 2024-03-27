import Admin from "../model/Admin.js";
import User from "../model/User.js";
import mongoose from "mongoose";
import { AuthService } from "../service/auth.js";
import bc from "bcryptjs";

export class UserController {
    /**
     *  Create Endpoints
     *
     *  New users must use phone number
     */
    static async createNewUser(req, res, next) {
        User.findOne({ phoneNumber: req.body.phoneNumber }).then((user) => {
            if (user) {
                return res
                    .status(400)
                    .json({ phoneNumber: "Phone number is already in use" });
            } else {
                const newUser = new User({
                    name: {
                        firstName: req.body.name.firstName,
                        lastName: req.body.name.lastName,
                    },
                    phoneNumber: req.body.phoneNumber,
                    emailAddress: req.body.emailAddress,
                    password: req.body.password,
                });

                // password will be encrypted in the model
                newUser.save(); // Save use to the database
                const token = AuthService.createToken({
                    userId: newUser._id,
                    firstName: newUser.name.firstName,
                    lastName: newUser.name.lastName,
                    emailAddress: newUser.emailAddress,
                    phoneNumber: newUser.phoneNumber,
                });
                res.cookie("jwt", token, {
                    httpOnly: true,
                });

                // return status
                res.status(201).json({
                    message: "New user successfully created",
                    user: {
                        name: newUser.name.firstName + newUser.name.lastName,
                        phoneNumber: newUser.phoneNumber,
                        emailAddress: newUser.emailAddress,
                    },
                });
            }
        });
    }
    /**
     *  Retrieve data from database
     */

    /**
     *  Admin Validation
     */
    static async fetchAll(req, res, next) {
        try {
            const userId = req.params; //make this get :userId

            // Validate if userId is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res
                    .status(400)
                    .json({ message: "Invalid userId format" });
            }
            // Find the admin by ID and select the password
            const isAdmin = await Admin.findOne({
                _id: req.body.userId,
            });

            // If no admin found, return unauthorized response
            if (!isAdmin) {
                return res.status(401).json({
                    message: "Not authorized",
                });
            }

            // Fetch all users (excluding passwords)
            const users = await User.find({}).select({ password: 0 });
            res.status(200).json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    static async login(req, res, next) {
        try {
            const user = await User.findOne({
                phoneNumber: req.body.phoneNumber,
            }).select({
                name: 1,
                phoneNumber: 1,
                emailAddress: 1,
                password: 1,
            });

            if (!user) {
                return res.status(400).json({
                    message: "Phone number is not registered",
                });
            }

            // Handle login
            const auth = await bc.compare(req.body.password, user.password);
            if (auth) {
                const token = AuthService.createToken({
                    sub: {
                        userId: user._id,
                        firstName: user.name.firstName,
                        lastName: user.name.lastName,
                        emailAddress: user.emailAddress,
                        phoneNumber: user.phoneNumber,
                    },
                });

                // res.setHeader(
                //     "Set-Cookie",
                //     `session=${token}; HttpOnly; SameSite=Lax; Path=/`
                // );
                return res.status(200).json({
                    message: "Successfully logged in ",
                    token: token,
                });
            }

            res.status(400).json({
                message: "Incorrect phone number or password",
            });
        } catch (err) {
            console.error(err);
        }
    }
    /*

     *  Adding email address to account
     *  Can be done when editing account information
     */
    static async updateUser(req, res, next) {}

    /**
     *  Delete users
     */
    static async deleteUser(req, res, next) {}
}
