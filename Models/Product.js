const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    sku: String,
    name: String,
    brand: String,
    category: [String],
    shortdescription: { type: String, default: "" },
    longdescription: { type: String, default: "" },
    mrp: Number,
    price: Number,
    cost: Number,
    profit: Number,
    margin: Number,
    dimensions: {
        weight: { type: Number, default: "0" },
        height: { type: Number, default: "0" },
        width: { type: Number, default: "0" },
        length: { type: Number, default: "0" }
    },
    displayurl: String,
    additionalurls: [String],
    video: { type: String, default: "" },
    barcode: Number,
    stock: Number,
    lowstock: Number,
    minquantity: { type: Number, default: "0" },
    maxquantity: { type: Number, default: "0" },
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
    metatitle: { type: String, default: "" },
    metadescription: { type: String, default: "" },
    metakeywords: { type: String, default: "" },
    published: Boolean,
    vendor: { type: String, default: "" },
    quantity_sold: { type: Number, default: 0 }
})

const product = mongoose.model("product", ProductSchema)

module.exports = product