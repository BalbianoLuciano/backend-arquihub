const mongoose = require("mongoose")


const UpdateSchema = new mongoose.Schema({
    title: {
        type: String
    },
    comments: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("updates", UpdateSchema)