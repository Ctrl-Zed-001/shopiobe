const express = require("express")
const router = express.Router()
const Restock = require("../Models/Restock");
const Product = require("../Models/Product")

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

// UPDATE RESTOCK DATA
router.post('/update', (req, res, next) => {
    Restock.findById(req.body.id)
        .then(doc => {

            let totalIncomming = 0;
            let totalUpdates = 0;

            // MAP ALL PRODUCTS AND GET EACH FIELD AND ADD VALUE TO EXISTING
            doc.products.map(product => {
                req.body.data.map(newproduct => {
                    if (newproduct.sku === product.sku) {
                        product.recieved = product.recieved + parseInt(newproduct.recieved);
                        product.canceled = product.canceled + parseInt(newproduct.canceled);
                        product.returned = product.returned + parseInt(newproduct.returned);

                        Product.findById(product._id)
                            .then(prod => {
                                prod.stock += parseInt(newproduct.recieved);
                                prod.stock -= parseInt(newproduct.returned);
                                prod.save();
                            })
                            .catch(er => {
                                res.status(500).send(er)
                            })
                    }
                })


                // FOR STATUS PURPOSE
                totalIncomming = totalIncomming + product.incomming;
                totalUpdates = totalUpdates + product.recieved + product.canceled
            })
            if (totalUpdates >= totalIncomming) {
                doc.status = "Completed";
            }





            doc.save()
                .then(newrestock => {
                    res.status(200).send(newrestock)
                }).catch(error => {
                    res.send(error)
                })

        })
        .catch(err => {
            res.send(err)
        })
})

module.exports = router