import mongoose from "mongoose";
import jwt from "jwt";
import bcrypt from "bcrypt";

const knowledgeHubSchema = new mongoose.Schema({
    category: {
        type: "String",

    },
    title: {
        ml: {
            type: String,
        },
        en: {
            type: String,
        }
    },
    content: {
        ml: {
            type: String,
        },
        en: {
            type: String,
        }
    },
    type: {
        type: String,
        enum: ["article", "scheme", "faq"],
    },
    relatedCrops: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Crop",
    },
    sourceLink: {
        type: String,
    }
},{timestamps: true})

export default KnowledgeHub = mongoose.model("KnowledegeHub",knowledgeHubSchema);