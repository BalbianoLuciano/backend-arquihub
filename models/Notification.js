const mongoose = require("mongoose")


const NotificationSchema = new mongoose.Schema({
    notification_reciever: {
        type: Number,
    },
    type:{
        String
    },
    title: {
        type: String,
    },
    body:{
        type: Text
    },
    userId:{
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("notifications", NotificationSchema)