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

router.post("/addnew", (req, res, next) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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
                                .catch(error => {
                                    res.status(500).send(err)
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