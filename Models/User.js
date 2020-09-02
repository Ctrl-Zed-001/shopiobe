const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number,
    address: {
        line1: String,
        city: String,
        state: String,
        pincode: Number,
        country: String
    },
    profileurl: String,
    joindate: { type: Date, default: Date.now() },
    orders: [
        {
            orderid: { type: mongoose.Schema.Types.ObjectId, ref: "orders" },
        }
    ]
})

const user = mongoose.model("user", UserSchema)

module.exports = user