const mongoose = require("mongoose")


const PaymentSchema = new mongoose.Schema({
    userId: {
        type: Number,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("payments", PaymentSchema)