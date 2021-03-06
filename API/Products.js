const express = require("express")
const router = express.Router()
const Product = require("../Models/Product");
const Category = require("../Models/Category")
const Brand = require("../Models/Brand")
const { url } = require("../keys")
var multer = require('multer')

var productstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/products/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: productstorage })
var productupload = upload.fields([{ name: 'displayurl', maxCount: 1 }, { name: 'additionalurls', maxCount: 6 }])


// GET ALL PRODUCTS
router.get("/getall", (req, res, next) => {
    Product.find()
        .then(doc => {
            res.send(doc)
        })
        .catch(err => {
            res.send(err)
        })
})

// GET PRODUCT BY ID
router.get("/:id", (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            res.send(product)
        })
        .catch(err => {
            res.send(err)
        })
})

// ADD NEW PRODUCT
router.post("/addnew", productupload, (req, res, next) => {

    let dp = "";
    if (req.files.displayurl !== undefined) {
        dp = `${url}/products/${req.files.displayurl[0].originalname}`;
    } else {
        dp = `${url}/products/no-product.png`;
    }
    let mp = [];
    if (req.files.additionalurls) {
        req.files.additionalurls.map(image => {
            mp = [
                ...mp,
                `${url}/products/${image.originalname}`
            ]
        })
    }
    Product.findOne({ barcode: req.body.barcode })
        .then(product => {
            if (product) {
                res.status(400).json({ message: "Product already exists" })
            } else {
                const newProduct = new Product({
                    sku: req.body.sku,
                    name: req.body.name,
                    brand: req.body.brand,
                    category: req.body.category,
                    shortdescription: req.body.shortdescription,
                    longdescription: req.body.longdescription,
                    mrp: req.body.mrp,
                    price: req.body.price,
                    cost: req.body.cost,
                    margin: req.body.margin,
                    profit: req.body.profit,
                    stock: req.body.stock,
                    lowstock: req.body.lowstock,
                    minquantity: req.body.minquantity,
                    maxquantity: req.body.maxquantity,
                    barcode: req.body.barcode,
                    dimensions: {
                        weight: req.body.weight,
                        height: req.body.height,
                        width: req.body.width,
                        length: req.body.length
                    },
                    displayurl: dp,
                    additionalurls: mp,
                    video: req.body.video,
                    metatitle: req.body.metatitle,
                    metadescription: req.body.metadescription,
                    metakeywords: req.body.metakeywords,
                    published: req.body.published,
                    vendor: req.body.vendor
                })
                newProduct.save()
                    .then(product => {
                        res.status(201).send(product)
                    })
                    .catch(err => {
                        res.status(500).send(err)
                    })
            }
        })
})

// EDIT SINGLE PRODUCT
router.post("/edit", productupload, (req, res, next) => {
    let dp = "";
    if (req.files.displayurl !== undefined) {
        dp = `${url}/products/${req.files.displayurl[0].originalname}`;
    } else {
        dp = req.body.displayurl
    }
    let mp = [];
    if (req.files.additionalurls) {
        req.files.additionalurls.map(image => {
            mp = [
                ...mp,
                `${url}/products/${image.originalname}`
            ]
        })
    } else if (req.body.additionalurls == undefined) {

        mp = []

    } else {
        mp = [
            ...mp,
            req.body.additionalurls
        ]
    }

    const newFields = {
        sku: req.body.sku,
        name: req.body.name,
        brand: req.body.brand,
        category: req.body.category,
        shortdescription: req.body.shortdescription,
        longdescription: req.body.longdescription,
        mrp: req.body.mrp,
        price: req.body.price,
        cost: req.body.cost,
        margin: req.body.margin,
        profit: req.body.profit,
        stock: req.body.stock,
        lowstock: req.body.lowstock,
        minquantity: req.body.minquantity,
        maxquantity: req.body.maxquantity,
        barcode: req.body.barcode,
        dimensions: {
            weight: req.body.weight,
            height: req.body.height,
            width: req.body.width,
            length: req.body.length
        },
        displayurl: dp,
        additionalurls: mp,
        video: req.body.video,
        metatitle: req.body.metatitle,
        metadescription: req.body.metadescription,
        metakeywords: req.body.metakeywords,
        published: req.body.published,
        vendor: req.body.vendor
    }
    Product.findByIdAndUpdate(req.body.id, newFields, (err, doc) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(doc)
        }
    })
})

// DELETE PRODUCT BY ID
router.delete("/delete/:id", (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
        .then(doc => {
            res.status(200).send(doc)
        })
        .catch(err => res.status(500).send(err))
})

// PUBLISH / UNPUBLISH SINGLE PRODUCT
router.post("/publish", (req, res, next) => {
    Product.findById(req.body.id)
        .then(product => {
            product.published = !product.published
            product.save()
                .then(doc => {
                    res.status(200).send(doc)
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        })
        .catch(error => {
            res.status(500).send(error)
        })


})


// GET ALL CATEGORIES
router.get("/category/all", (req, res, next) => {
    Category.find()
        .then(doc => {
            res.send(doc)
        })
        .catch(err => {
            res.send(err)
        })
})

// ADD CATEGORY
router.post("/category/add", (req, res, next) => {
    const newCategory = new Category({
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description
    })

    newCategory.save()
        .then(doc => {
            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

// GET ALL BRANDS
router.get("/brands/all", (req, res, next) => {
    Brand.find()
        .then(doc => {
            res.send(doc)
        })
        .catch(err => {
            res.send(err)
        })
})


// ADD BRAND
router.post("/brands/add", (req, res, next) => {
    const newBrand = new Brand({
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description
    })
    newBrand.save()
        .then(doc => {
            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})



module.exports = router