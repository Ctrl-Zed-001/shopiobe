const mongoose = require("mongoose")

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: { type: String, default: "Admin" },
    image: String
})

const Admin = mongoose.model("admin", AdminSchema)

module.exports = Admin