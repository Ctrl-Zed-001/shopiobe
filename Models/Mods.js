const mongoose = require("mongoose")

const ModSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: { type: String, default: "Admin" },
    image: String
})

const ModModel = mongoose.model("mod", ModSchema)

module.exports = ModModel