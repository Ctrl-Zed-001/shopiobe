const express = require("express")
const router = express.Router()
const Order = require("../Models/Order")
const Product = require("../Models/Product")
// const escpos = require('escpos');
// // install escpos-usb adapter module manually
// escpos.USB = require('escpos-usb');
// // Select the adapter based on your printer type
// const device = new escpos.USB();

// const printer = new escpos.Printer(device, options);

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



        // INCREASE SOLD_QUANTITY OF PRODUCT IN THE PRODUCT COLLECTION
        Product.findById(product._id)
            .then(doc => {
                doc.quantity_sold += product.quantity;

                // DECREASE STOCK QUANTITY OF THE PRODUCT
                doc.stock -= product.quantity;

                doc.save()
            })
            .catch(er => {
                console.log(er)
            })
    })
    const newOrder = new Order({
        date: today,
        user: req.body.user ? req.body.user._id : null,
        products: productArray,
        grandtotal: req.body.grandtotal,
        tax: req.body.tax,
        discount: req.body.discount,
        recieved: parseInt(req.body.recieved),
        pending: req.body.pending,
        paymentmode: req.body.paymentmode,
        paymentstatus: req.body.paymentstatus,
        status: req.body.orderstatus
    })

    newOrder.save()
        .then(doc => {
            // PRINT RECIEPT
            // device.open(function (error) {
            //     printer
            //         .font('a')
            //         .align('ct')
            //         .style('bu')
            //         .size(1, 1)
            //         .text('The quick brown fox jumps over the lazy dog')
            //         .barcode('1234567', 'EAN8')
            //         .table(["One", "Two", "Three"])
            //         .tableCustom(
            //             [
            //                 { text: "Left", align: "LEFT", width: 0.33, style: 'B' },
            //                 { text: "Center", align: "CENTER", width: 0.33 },
            //                 { text: "Right", align: "RIGHT", width: 0.33 }
            //             ],
            //             { encoding: 'cp857', size: [1, 1] } // Optional
            //         )

            // });

            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

router.get("/byuser/:id", (req, res, next) => {
    Order.find({ user: req.params.id })
        .then(doc => {
            res.status(200).send(doc)
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

router.post("/update_pending", (req, res, next) => {
    Order.findById(req.body.orderid)
        .then(doc => {
            doc.recieved += parseInt(req.body.amount);
            doc.pending -= parseInt(req.body.amount);
            if (doc.pending == 0) {
                doc.paymentstatus = "Completed";
            }
            doc.save()
                .then(newdoc => {
                    res.status(200).json({ status: "updated" })
                })
                .catch(error => {
                    res.status(500).send(error)
                })
        }).catch(err => {
            res.status(500).send(err)
        })
})

module.exports = router