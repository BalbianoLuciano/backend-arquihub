const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")


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
UpdateSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("updates", UpdateSchema)