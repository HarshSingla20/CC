import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const cropSchema = new mongoose.Schema({
    cropName: {
        type: "String",
        required: "true",
    },
    cropType: {
        type: "String",
        required: "true",
    },
    season: {
        type: "String",
        required: "true",
    },
    advisoryDocs: [{type: mongoose.Schema.Types.ObjectId, ref: "AdvisoryDocs"}],
    diseaseList : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DieseaseList"
        }
    ]
}, 
{
    timestamps: true
})

const Crop = mongoose.model("Crop", cropSchema)
export default Crop;