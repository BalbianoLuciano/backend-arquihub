const mongoose = require("mongoose")


const NotificationSchema = new mongoose.Schema({
    recieverId: {
        type: Number,
    },
    type:{
        String
    },
    title: {
        type: String,
    },
    body:{
        type: String
    },
    userId:{
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("notifications", NotificationSchema)