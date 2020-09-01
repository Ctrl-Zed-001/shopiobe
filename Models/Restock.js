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
            recieved: { type: Number, default: 0 },
            canceled: { type: Number, default: 0 },
            returned: { type: Number, default: 0 },
        }
    ],
    expected: Date,
    tracking_number: Number,
    status: { type: String, default: "Pending" }
    // TODO : TO WHICH STORE IT WILL GO
})


const restock = mongoose.model('restock', restockSchema);

module.exports = restock
