const express = require("express")
const router = express.Router();
const Product = require("../Models/Product")


router.get("/getstock", (req, res, next) => {
    Product.findOne({ productid: req.body.id })
        .then(doc => {
            res.status(200).send(doc)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

router.post("/updatestock", (req, res, next) => {
    Product.findById(req.body.id)
        .then(doc => {
            doc.stock = req.body.newstock
            doc.save()
                .then(newproduct => {
                    res.status(200).send(newproduct)
                })
                .catch(err => {
                    res.status(500).send(err)
                })
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

module.exports = router