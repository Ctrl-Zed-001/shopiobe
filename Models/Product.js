const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    sku: String,
    name: String,
    brand: String,
    category: [String],
    shortdescription: String,
    longdescription: String,
    slashedprice: Number,
    price: Number,
    cost: Number,
    profit: Number,
    margin: Number,
    dimensions: {
        weight: Number,
        height: Number,
        width: Number,
        length: Number
    },
    displayurl: String,
    additionalurls: [String],
    video: String,
    barcode: Number,
    stock: Number,
    lowstock: Number,
    minquantity: Number,
    maxquantity: Number,
    variations: [
        {
            vlabel: String,
            vsku: String,
            vname: String,
            image: String,
            vslashedprice: Number,
            vprice: Number,
            vdescription: String,
            vdimensions: {
                vweight: Number,
                vheight: Number,
                vwidth: Number,
                vlength: Number
            },
            vstock: Number
        }
    ],
    reviews: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        rating: Number,
        comment: String
    }],
    metatitle: String,
    metadescription: String,
    metakeywords: String,
    published: Boolean,
    vendor: String
})

const product = mongoose.model("product", ProductSchema)

module.exports = product