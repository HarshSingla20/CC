import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["farmer", "buyer", "expert", "admin"],
            default: "farmer",
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
        },
        preferredLanguage: {
            type: String,
            enum: ["en", "ml"],
            default: "ml",
        },
        location: {
            district: { type: String, required: true },
            village: { type: String, required: true },
            coordinates: {
                type: [Number],
                index: "2dsphere"
            }
        },
        landsize: {
            type: Number,
        },
        crop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Crop",
        }
    },
    {
        timestamps: true,
    }
    
)

const User = mongoose.model("User", userSchema);
export default User;