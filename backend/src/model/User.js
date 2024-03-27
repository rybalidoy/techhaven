import mongoose from "mongoose";
import bc from "bcryptjs";

const Schema = mongoose.Schema;

const emailRegex = "";

const UserSchema = new Schema(
    {
        name: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
        },
        emailAddress: {
            type: String,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }
        const salt = await bc.genSalt(10);
        this.password = await bc.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

const User = mongoose.model("User", UserSchema);

export default User;
