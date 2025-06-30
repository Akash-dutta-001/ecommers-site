const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");


router.post("/create", upload.single("image"), function (req, res) {
    // TODO: Add product creation logic here
    res.redirect("/owners/admin");
});

router.post("/owners/products/create", upload.single("image"), function (req, res) {
    // TODO: Add product creation logic here
    res.redirect("/owners/admin");
});

module.exports = router;
