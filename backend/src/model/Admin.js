import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdminSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User", // Reference to the "User" model
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            enum: [1, 2], // Only allow values 1 or 2
            required: true,
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Create the "Admin" model
const Admin = mongoose.model("Admin", AdminSchema);

export default Admin;
