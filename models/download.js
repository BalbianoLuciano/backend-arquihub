const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")


const ProductSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true,
    },
    update_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"updates",
        required: true,
    },

}, {
    timestamps: true

});


ProductSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("downloads", ProductSchema)