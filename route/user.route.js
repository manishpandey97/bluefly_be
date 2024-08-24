const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userModel = require("../model/user.model");
const tokenModel = require('../model/token.model');
const authUserRole = require('../middleware/authUserRole.middleware');

const userRouter = express.Router()

userRouter.get('/', authUserRole(["admin"]), async (req, res) => {
    try {
        const users = await userModel.find();
        if (!users) {
            return res.status(400).send(`users not found`)
        }
        return res.status(200).send(`users:${users}`)

    } catch (error) {
        return res.status(500).send(`users not found and error is :${error}`)
    }
})

userRouter.post('/register', authUserRole(["buyer", "seller", "admin"]), async (req, res) => {
    const { fname, lname, mobile_no, email, password, role } = req.body;
    try {
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).send(`user  already register:${userExists}`)
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(400).send(`err in hasing:${err}`)
            }
            if (hash) {
                const registerUser = userModel({ fname, lname, mobile_no, email, password: hash, role });
                await registerUser.save();
                return res.status(200).send(`user register successfully:${registerUser}`)
            }
        })


    } catch (error) {
        return res.status(500).send(`error during error registering  is :${error}`)
    }
})

userRouter.post('/login', authUserRole(["buyer", "seller", "admin"]), async (req, res) => {
    const { mobile_no, email, password } = req.body;
    try {
        const userLogin = await userModel.findOne({  email });
        if (!userLogin) {
            return res.status(400).send(`please register first !`)
        }
        bcrypt.compare(password, userLogin.password, async (err, result) => {
            if (err) {
                return res.status(400).send(`err in comapreing password:${err}`)
            }
            if (result) {
                const accesstoken = jwt.sign({ userId: userLogin._id, password, email, mobile_no },
                    process.env.secret_Key1, { expiresIn: '1h' });
                const refreshtoken = jwt.sign({ userId: userLogin._id, password, email, mobile_no },
                    process.env.secret_Key1, { expiresIn: '1d' });
                if (!accesstoken && !refreshtoken) {
                    return res.status(500).send(`error in token regentration:${err}`)
                }
                return res.status(200).json({ "msG": `user login successfully`, "accesstoken": accesstoken, "refreshtoken": refreshtoken })
            }
        })
    } catch (error) {
        return res.status(500).send(`error during  login  is :${error}`)
    }
})


userRouter.post('/logout', authUserRole(["buyer", "seller", "admin"]), async (req, res) => {
    const { mobile_no, email } = req.body;
    const accesstoken = req.headers.authorization?.split(" ")[1];

    try {
        const userLogout = await userModel.findOne({ mobile_no, email });

        if (!userLogout) {
            return res.status(400).send(`please login first !`)
        }
        if (!accesstoken) {
            return res.status(400).send(` logout access token not fount!`)
        }

        const blockTokenObj = await tokenModel.findOne({ userId: userLogout._id })

        if (blockTokenObj) {
            await tokenModel.findByIdAndDelete({ _id: blockTokenObj._id })
        }
        const blockToken = tokenModel({ blockToken: accesstoken, userId: userLogout._id })
        await blockToken.save();
        return res.status(200).send(`logout successfully`);
    } catch (error) {
        return res.status(500).send(`error during  logout  is :${error}`)
    }
})


module.exports = userRouter