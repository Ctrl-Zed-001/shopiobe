const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, default: "" },
    phone: { type: Number, default: "" },
    address: {
        line1: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        pincode: { type: Number, default: "" },
        country: { type: String, default: "" }
    },
    profileurl: { type: String, default: "" },
    joindate: { type: Date, default: Date.now() },
    orders: [
        {
            orderid: { type: mongoose.Schema.Types.ObjectId, ref: "orders" },
        }
    ]
})

const user = mongoose.model("user", UserSchema)

module.exports = user