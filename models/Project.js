const mongoose = require("mongoose")


const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    visibility: {
        type: Boolean,
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

module.exports = mongoose.model("projects", ProjectSchema)