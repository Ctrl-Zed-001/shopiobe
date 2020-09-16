const express = require("express")
const router = express.Router()
const Order = require("../Models/Order")
const Product = require("../Models/Product")

router.get("/all", (req, res, next) => {
    Order.find()
        .then(doc => {
            res.status(200).send(doc)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

router.get("/:id", (req, res, next) => {
    Order.findById(req.params.id)
        .then(doc => {
            res.status(200).send(doc)
        })
        .catch(err => {
            res.send(err)
        })
})

router.post("/new", (req, res, next) => {
    let today = new Date()
    let productArray = [];
    req.body.products.map(product => {
        let newProductObject = {
            _id: product._id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        }
        productArray.push(newProductObject)



        // INCREASE SOLD_QUANTITY OF PRODUCT IN THE PRODUCT COLLECTION
        Product.findById(product._id)
            .then(doc => {
                doc.quantity_sold += product.quantity;

                // DECREASE STOCK QUANTITY OF THE PRODUCT
                doc.stock -= product.quantity;

                doc.save()
            })
            .catch(er => {
                console.log(er)
            })
    })
    const newOrder = new Order({
        date: today,
        user: req.body.user ? req.body.user._id : null,
        products: productArray,
        grandtotal: req.body.grandtotal,
        tax: req.body.tax,
        discount: req.body.discount,
        recieved: req.body.recieved,
        pending: req.body.pending,
        paymentmode: req.body.paymentmode,
        paymentstatus: req.body.paymentstatus,
        status: req.body.orderstatus
    })

    newOrder.save()
        .then(doc => {
            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

router.get("/byuser/:id", (req, res, next) => {
    Order.find({ user: req.params.id })
        .then(doc => {
            res.status(200).send(doc)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

module.exports = router