const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    postId: {
        type: String,
    },
    value: {
        type: Number,
        validator:{
        min:1,
        max:5
        }  
    },
    comment: {
        type: String,
    },
    rating:{
        type: Number
    },
    user:{
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("reviews", UserSchema)