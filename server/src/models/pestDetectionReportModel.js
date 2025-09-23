import mongoose from "mongoose"
import jwt from "jwt";
import bcrypt from "bcrypt"

const pestDetectionReportSchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    cropId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crop",
    },
    imageUrl: {
        type: "String",

    },
    diagnosis: {
        diseaseId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "PestDiseases",
        },
        confidence: {
            type: "Number",
            deafult: "0",
            required : ["true", "Give a value between 0 and 1"],
        }
    },
    suggestedTreatments: {
        type: "String",

    },
    status: {
        type: "String",
        enum: ["Pending", "Completed"],
        default: "Completed",
    }

}, {timestamps: true})

const PestDetectionReport = mongoose.model("PestDetectionReport",pestDetectionReportSchema)
export default PestDetectionReport