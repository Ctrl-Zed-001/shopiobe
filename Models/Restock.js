const mongoose = require("mongoose")

const restockSchema = mongoose.Schema({
    vendor: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "vendors" },
        name: String,
        phone: Number,
        email: String,
        address: {
            line1: String,
            city: String,
            zipcode: Number,
            state: String,
            country: String
        }
    },
    products: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
            name: String,
            sku: Number,
            displayimage: String,
            incomming: Number,
            recieved: Number,
            canceled: Number,
            returned: Number
        }
    ],
    expected: Date,
    tracking_number: Number,
    // TODO : TO WHICH STORE IT WILL GO
})


const restock = mongoose.model('restock', restockSchema);

module.exports = restock
