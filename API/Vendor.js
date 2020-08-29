const express = require("express")
const router = express.Router();
const Vendor = require("../Models/Vendor")

router.get("/getall", (req, res, next) => {
    Vendor.find()
        .then(doc => {
            res.status(200).send(doc)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

router.post("/addnew", (req, res, next) => {

    const newVendor = new Vendor({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: {
            line1: req.body.line1,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            country: req.body.country
        }
    })

    newVendor.save()
        .then(doc => {
            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).send(err)
        })

})

module.exports = router;