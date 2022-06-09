const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {

    try {
        let user
        user = User.create({
            email: req.body.email,
            login: req.body.login,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 12),
            birthDate: req.body.birthDate,
            country: req.body.country
        });
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
        });
        req.session.token = token;
        res.send({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const signin = async (req, res) => {
    try {
        let user
        if(req.body.email){
            user = await User.findOne({
                where: { email: req.body.email }
            }).catch((err) => {
                console.log(err.message)
            });
        } else {
            user = await User.findOne({
                where: { login: req.body.login }
            }).catch((err) => {
                console.log(err.message)
            });
        }
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                message: "Invalid Password!",
            });
        }
        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 24 hours
        });
        req.session.token = token;
        return res.status(200).send({
            id: user.id,
            email: user.email,
            login: user.login,
            username: user.username,
            birthDate: user.birthDate,
            country: user.country
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({
            message: "You've been signed out!"
        });
    } catch (err) {
        this.next(err);
    }
};

module.exports = {
    signup,
    signin,
    signout
}
