const db = require("../models");
const User = db.user;

checkDuplicateLoginAndEmail = async (req, res, next) => {
    try {
        let user = await User.findOne({
            where: {
                login: req.body.login
            }
        });
        if (user) {
            return res.status(400).send({
                message: "Failed! Login is already in use!"
            });
        }
        user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user) {
            return res.status(400).send({
                message: "Failed! Email is already in use!"
            });
        }
        next();
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate Username!"
        });
    }
};


const verifySignUp = {
    checkDuplicateLoginAndEmail
};
module.exports = verifySignUp;
