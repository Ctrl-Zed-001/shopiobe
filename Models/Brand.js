const mongoose = require("mongoose")

const BrandSchema = mongoose.Schema({
    name: String,
    slug: String,
    description: String
})

const brand = mongoose.model("Brand", BrandSchema)

module.exports = brand