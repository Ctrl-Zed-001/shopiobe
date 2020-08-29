const express = require("express")
const router = express.Router();
const Mod = require("../Models/Mods")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { secret } = require("../keys")

router.post("/newadmin", (req, res, next) => {
    const newmod = new Mod({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            newmod.password = hash;
            newmod.save()
                .then(doc => {
                    res.send(doc)
                })
                .catch(err => {
                    res.send(err)
                })
        })
    })
})

router.post("/admin", (req, res, next) => {
    // CHECK IF USER EXISTS
    Mod.findOne({ username: req.body.email })
        .then(mod => {
            if (!mod) {
                res.status(404).json({ message: "Invalid username" })
            } else {
                // COMPARE PASSWORD
                bcrypt.compare(req.body.password, mod.password, (error, ismatch) => {
                    if (error) {
                        res.send(error)
                    }
                    if (ismatch) {
                        // SEND JWT
                        jwt.sign({ data: mod }, secret, function (err, token) {
                            if (err) {
                                res.send(err)
                            }
                            res.status(200).json({ access_token: token, mod: mod })
                        })

                    } else {
                        res.status(400).json({ message: "Invalid password" })
                    }
                })
            }
        })
        .catch(err => res.status(500).send(err))
})



module.exports = router