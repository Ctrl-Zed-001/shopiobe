const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const { mongourl } = require("./keys")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ type: 'application/json' }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

// API ROUTES
const login = require("./API/Login")
const products = require("./API/Products")
const users = require("./API/User")
const inventory = require("./API/Inventory")
const vendor = require("./API/Vendor")
const restock = require("./API/Restock")
const order = require("./API/Order")

mongoose.set('useFindAndModify', false);
// CONNECT TO DB
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected");
        const port = process.env.PORT || 5000;
        app.listen(port)
    })
    .catch(() => console.log("unable to connect"))

// SET STATIC IMAGES PATH
app.use(express.static("images"))

// SET ROUTES
app.use("/api/login", login)
app.use("/api/products", products)
app.use("/api/users", users)
app.use('/api/inventory', inventory)
app.use("/api/vendor", vendor)
app.use("/api/restock", restock)
app.use("/api/order", order)



