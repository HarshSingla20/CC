import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
    {
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
            default: null,
            immutable: true,
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
        refreshToken: {
            type: String,
        },
        crop: [{type: mongoose.Schema.Types.ObjectId,ref: "Crop",}]
    },
    {
        timestamps: true,
    }
    
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            id: this._id,
            role: this.role,
            phoneNumber: this.phoneNumber,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            id: this._id,
            role: this.role,
            phoneNumber: this.phoneNumber,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model("User", userSchema);
export default User;