const express = require("express")
const router = express.Router()
const User = require("../Models/User")
const Order = require("../Models/Order")
const Product = require("../Models/Product")


// GET THIS MONTH ORDER COUNT
router.get("/ordercount", (req, res, next) => {
    Order.countDocuments()
        .then(count => {
            res.status(200).json({ count: count })
        })
        .catch(err => {
            res.status(500).send(err)
        })
})


// GET TOTAL CUSTOMER COUNT
router.get("/customercount", (req, res, next) => {
    User.countDocuments()
        .then(count => {
            res.status(200).json({ count: count })
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

// GET THIS MONTH REVENUE
router.get("/revenue", (req, res, next) => {
    Order.find()
        .then(orders => {
            let revenue = 0;
            orders.map(order => {
                revenue += order.grandtotal;
            })

            res.status(200).json({ revenue: revenue })
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

// GET TOTAL PRODUCTS COUNT
router.get("/productCount", (req, res, next) => {
    Product.countDocuments()
        .then(count => {
            res.status(200).json({ count: count })
        })
        .catch(err => {
            res.status(500).send(err)
        })
})

// GET MONTHLY SALES
router.get("/monthlysales", (req, res, next) => {
    let date = new Date();
    let monthlyOrders = [];
    Order.find()
        .then(orders => {
            for (var i = 0; i < 12; i++) {
                let orderCount = orders.filter(order => {

                    return `${order.date.getMonth()} ${order.date.getFullYear()}` == `${i} ${date.getFullYear()}`
                })
                monthlyOrders.push(orderCount.length)
            }
            res.status(200).send(monthlyOrders)
        })
        .catch(err => console.log(err))

})

// GET THIS WEEKS SALE
router.get("/dailysales", (req, res, next) => {
    let date = new Date();
    let dailyOrders = [];
    Order.find()
        .then(orders => {
            for (var i = 0; i < 31; i++) {
                let orderCount = orders.filter(order => {

                    return `${order.date.getDate()} ${order.date.getMonth()} ${order.date.getFullYear()}` == `${i} ${date.getMonth()} ${date.getFullYear()}`
                })
                dailyOrders.push(orderCount.length)
            }
            res.status(200).send(dailyOrders)
        })
        .catch(err => console.log(err))
})

// GET TODAY AND YESTERDAYS SALES AMOUNT
router.get("/comparesales", (req, res, next) => {
    let date = new Date();
    Order.find()
        .then(orders => {
            let today = orders.filter(order => {
                return `${order.date.getDate()} ${order.date.getMonth()} ${order.date.getFullYear()}` == `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`
            })
            let yesterday = orders.filter(order => {
                return `${order.date.getDate()} ${order.date.getMonth()} ${order.date.getFullYear()}` == `${date.getDate() - 1} ${date.getMonth()} ${date.getFullYear()}`
            })
            let todayRevenue = 0
            let yesterdayRevenue = 0;
            today.map(o => {
                todayRevenue += o.grandtotal
            })
            yesterday.map(o => {
                yesterdayRevenue += o.grandtotal
            })
            res.status(200).json({ today: todayRevenue, yesterday: yesterdayRevenue })
        })
        .catch(err => {
            console.log(err)
        })
})

// GET TOP SELLING PRODUCTS
router.get("/topselling", (req, res, next) => {
    Product.find().sort({ quantity_sold: -1 }).limit(15)
        .then(doc => {
            res.status(200).send(doc)
        })
        .catch(err => console.log(err))
})

module.exports = router