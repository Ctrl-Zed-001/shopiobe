const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name: String,
    slug: String,
    description: String
})

const category = mongoose.model("Category", CategorySchema)

module.exports = category