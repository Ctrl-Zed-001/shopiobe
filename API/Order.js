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

    // TODO : AFETR GENERATING NEW ORDER THE ORDER ID SHOULD BE ADDED TO USERS DB IF USER IS SELECTED DURING CHECKOUT
})

module.exports = router