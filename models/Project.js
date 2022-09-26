const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    visibility: {
        type: ["private", "public"],
    },
    createdBy: {
        type: String,
    },
    project_file: {
        type: String,
    },
    users:[{
        type: String
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("projects", UserSchema)