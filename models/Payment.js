const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")


const PaymentSchema = new mongoose.Schema({
    userId: {
        type: Number,
    },

}, {
    timestamps: true
})

PaymentSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("payments", PaymentSchema)