const express = require("express")
const router = express.Router()
const User = require("../Models/User")
const bcrypt = require("bcryptjs")

router.get("/all", (req, res, next) => {
    User.find()
        .then(doc => {
            res.status(200).send(doc)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

router.post("/create", (req, res, next) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: {
            line1: req.body.line1,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode,
            country: req.body.country
        }
    });
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                res.status(401).json({ message: "User already exists." })
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        bcrypt.hash(req.body.password, salt, (error, hash) => {
                            newUser.password = hash;
                            newUser.save()
                                .then(doc => {
                                    res.status(201).send(doc)
                                })
                                .catch(er => {
                                    res.status(500).send(er)
                                })
                        })

                    }
                })
            }
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

module.exports = router