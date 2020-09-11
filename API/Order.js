const express = require("express")
const router = express.Router()
const Order = require("../Models/Order")

router.get("/all", (req, res, next) => {
    Order.find()
        .then(doc => {
            res.status(200).send(doc)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

router.post("/new", (req, res, next) => {
    let today = new Date()
    let productArray = [];
    req.body.products.map(product => {
        let newProductObject = {
            _id: product._id,
            quantity: product.quantity,
            total: product.total
        }
        productArray.push(newProductObject)
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

module.exports = router