const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: Number,
    address: {
        line1: String,
        city: String,
        State: String,
        pincode: Number
    },
    image: String,
    joindate: Date
})

const user = mongoose.model("user", UserSchema)

module.exports = user