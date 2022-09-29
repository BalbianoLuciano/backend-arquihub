const mongoose = require("mongoose")


const PaymentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("payments", PaymentSchema)