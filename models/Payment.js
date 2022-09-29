const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")


const PaymentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
    },

}, {
    timestamps: true
})

PaymentSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("payments", PaymentSchema)