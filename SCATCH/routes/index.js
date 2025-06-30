const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");

router.get("/", function (req, res) {
    let error = req.flash("error");
    res.render("index", { error });
});

router.get("/shop", isloggedin, async function (req, res) {
    try {
        const products = await productModel.find({});
        res.render("shop", { products, user: req.user });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send("Error loading shop");
    }
});

module.exports = router;