const mongoose = require("mongoose")

const StoreSchema = mongoose.Schema({
    name: String,
    phone: Number,
    address: {
        line1: String,
        city: String,
        pincode: Number,
        state: String
    }
})

module.exports = mongoose.model('store', StoreSchema)