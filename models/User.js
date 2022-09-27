const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    nickname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    type: {
        type: String,
        enum: ["user", "admin", "superadmin", "member"],
        default: "user"
    },
    projects: [{
        type: String
    }],
    favourites: [{
        type: String
    }],
    status: {
        type: String,
        enum: ["active", "banned", "inactive"],
        default: "active"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("users", UserSchema)