const express = require("express")
const router = express.Router()
const Restock = require("../Models/Restock")

// GET ALL RESTOCKS
router.get("/getAll", (req, res, next) => {
    Restock.find()
        .then(doc => {
            res.status(200).send(doc)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

// ADD NEW RESTOCK REQUEST
router.post('/addNew', (req, res, next) => {
    const newRestock = new Restock({
        vendor: req.body.vendor,
        products: req.body.products,
        expected: req.body.expected,
        tracking_number: req.body.tracking
    })
    newRestock.save()
        .then(doc => {
            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

module.exports = router