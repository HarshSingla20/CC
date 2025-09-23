import mongoose from "mongoose"
import jwt from "jwt";
import bcrypt from "bcrypt"

const pestDiseasesSchema = new mongoose.Schema({
    cropId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crop",
    },
    name: {
        ml:{
            type: String,
            required: true,
        },
        en:{
            type: String,
            required: true,
        }
    },
    symptoms: {
        type: String,
        required: true,
    },
    images: {
        type: String,
        required: true,
    },
    treatments: {
        organic: {
            type: String,
            required: true,
        },
        chemical: {
            type: String,
            required: true,
        }
    }
}, {timestamps: "true"})



export default PestDiseases = mongoose.model("PestDiseases", pestDiseasesSchema)