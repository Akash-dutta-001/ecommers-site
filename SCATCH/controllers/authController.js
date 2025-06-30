const userModel = require("../models/user-model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({ email: email });
        if (user)
            return res.status(401).send("You already have an account, please login");

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        
        let newUser = await userModel.create({
            email,
            password: hash,
            fullname,
        });

        let token = generateToken(newUser);
        res.cookie("token", token);

        res.redirect("/shop");
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).send("Registration failed: " + err.message);
    }
};

module.exports.loginUser = async function (req, res) {
    try {
        let { email, password } = req.body;

        let user = await userModel.findOne({ email: email });
        if (!user) {
            req.flash("error", "Incorrect email or password");
            return res.redirect("/");
        }

        const result = await bcrypt.compare(password, user.password);
        if(result){
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        } else {
            req.flash("error", "Incorrect email or password");
            return res.redirect("/");
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send("Login failed: " + err.message);
    }
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};