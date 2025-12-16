const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["ADMIN", "MEMBER"],
        default: "MEMBER",
    },
}, { timestamps: true });

module.exports = mongoose.model("User",userSchema);