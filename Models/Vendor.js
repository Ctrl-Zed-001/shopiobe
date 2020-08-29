const mongoose = require("mongoose")

const vendorSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    address: {
        line1: String,
        city: String,
        zipcode: Number,
        state: String,
        country: String
    }
})

const vendor = mongoose.model('vendor', vendorSchema)

module.exports = vendor