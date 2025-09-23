import mongoose from "mongoose";
import jwt from "jwt";
import bcrypt from "bcrypt";


const chatBotLogSchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    query: {
        type: String,
        
    },
    response: {
        type: String,
    },
    language: {
        type: String,
        enum : ["ml", "en"],
    },
    channel: {
        type: String,
        enum : ["text", "voice"],
    }
}, {timestamps: true})


export default ChatBotLog = mongoose.model("ChatBotLog", chatBotLogSchema);