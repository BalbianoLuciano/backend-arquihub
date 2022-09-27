const mongoose = require("mongoose")


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    visibility: {
        type: String,
        enum: ["private", "public"],
        default: "public"
    },
    createdBy: {
        type: String,
    },
    posted_by: {
        type: String
    },
    mts2: {
        type: Number
    },
    rooms: {
        type: Number
    },
    year: {
        type: Number
    },
    authors: [{
        type: String
    }],
    additional_data: [{
        type: String
    }],
    rating: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("posts", PostSchema)