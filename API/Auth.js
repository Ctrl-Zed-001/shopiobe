const express = require("express")
const router = express.Router();
const Admin = require("../Models/Admin")
const Store = require("../Models/Store")
const bcrypt = require("bcryptjs")


router.post("/create", (req, res, next) => {
    Admin.findOne({ username: req.body.username })
        .then(doc => {
            if (doc) {
                res.status(400).json({ msg: "User Already Exists" })
            } else {
                const newadmin = new Admin({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                })

                const newStore = new Store({
                    name: req.body.storename,
                    phone: req.body.phone,
                    address: {
                        line1: req.body.line1,
                        city: req.body.city,
                        pincode: req.body.pincode,
                        state: req.body.state
                    }
                })

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        newadmin.password = hash;
                        newadmin.save()
                            .then(admin => {
                                newStore.save()
                                    .then(store => {
                                        res.status(200).json({ admin: doc, store: store })
                                    })
                                    .catch(storeError => res.status(500).send(storeError))

                            })
                            .catch(err => {
                                res.status(500).send(err)
                            })
                    })
                })
            }
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

router.post("/login", (req, res, next) => {
    // CHECK IF USER EXISTS
    Admin.findOne({ username: req.body.username })
        .then(admin => {
            if (!admin) {
                res.status(404).json({ message: "Invalid username" })
            } else {
                // COMPARE PASSWORD
                bcrypt.compare(req.body.password, admin.password, (error, ismatch) => {
                    if (error) {
                        res.status(500).send(error)
                    }
                    if (ismatch) {
                        res.status(200).send(admin)

                    } else {
                        res.status(400).json({ message: "Invalid password" })
                    }
                })
            }
        })
        .catch(err => res.status(500).send(err))
})



module.exports = router