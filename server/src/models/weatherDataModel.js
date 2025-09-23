import mongoose from "mongoose";
import jwt from "jwt";
import bcrypt from "bcrypt";

const weatherDataSchema = new mongoose.Schema({
    location: {
        district: {
            type: String,
        },
        coordinates: {
            type: [Number],
            index: "2dsphere",
        }
    },
    temprature: {
        type: Number,
        required: true,
    },
    humidity:{
        type: Number,
    },
    rainfall: {
        type: Number,
    },
    windSpeed: {
        type: Number,
    },
    forecast: {
        description: {
            type: String,
        },
        riskAlert: {
            type: String,
        }
    },
    source: {
        type: String,
    }
}, {timestamps: true})



export default weatherData = mongoose.model("weatherData", weatherDataSchema);