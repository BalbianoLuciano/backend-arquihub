const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    userId: {
        type: Number,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("payments", UserSchema)