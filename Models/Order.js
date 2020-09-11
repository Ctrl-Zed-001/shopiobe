const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    date: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    products: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
            quantity: Number,
            total: Number
        }
    ],
    grandtotal: Number,
    tax: Number,
    discount: Number,
    recieved: Number,
    pending: Number,
    paymentmode: String,
    paymentstatus: String,
    status: String
})
const order = mongoose.model("order", orderSchema)
module.exports = order;