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
        type: ["user", "admin", "guest", "member"],
        default: "guest"
    },
    projects: [{
        type: String
    }],
    favourites:[{
        type: String
    }],
    status:["active", "banned", "inactive"]
}, {
    timestamps: false
})

module.exports = mongoose.model("users", UserSchema)