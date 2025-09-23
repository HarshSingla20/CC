import mongoose from "mongoose";
import jwt from "jwt";
import bcrypt from "bcrypt";

const marketPricesSchema = new mongoose.Schema({
    cropId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Crop,
    },
    mandiName: {
        type: String,
        required: true,
    },
    location: {
        district: {
            type: String,
        },
        coordinates: {
            type: [Number],
            index: "2dsphere",
        }
    },
    minPrice: {
        type: Number,
        required: true,
    },
    maxPrice: {
        type: Number,
        required: true,
    },
    avgPrice: {
        type: Number,
        required: type,
    },
    predictedPrice: {
        type: Number,
    },
    source : {
        type: String,
    }

}, {timestamps: true})


export default marketPrices = mongoose.model("marketPrices",marketPricesSchema);