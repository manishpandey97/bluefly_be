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
    const { name,  email, password, role,mobile_no } = req.body;
    try {
        const userExists = await userModel.findOne({ email, mobile_no});
        if (userExists) {
            console.log(`user  already register:${userExists}`)
            return res.status(400).send(`user  already register:${userExists}`);
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                console.log(`err in hasing:${err}`)
                return res.status(400).send(`err in hasing:${err}`)
            }
            if (hash) {
                const registerUser = userModel({ name, email, password: hash, role,mobile_no });
                await registerUser.save();
                console.log(`user register successfully:${registerUser}`)
                return res.status(200).send(`user register successfully:${registerUser}`)
            }
        })


    } catch (error) {
        console.log(`error during error registering  is :${error}`)
        return res.status(500).send(`error during error registering  is :${error}`)
    }
})

userRouter.post('/login', authUserRole(["buyer", "seller", "admin"]), async (req, res) => {
    const { email, password ,mobile_no} = req.body;
    try {
        const userLogin = await userModel.findOne({  email,mobile_no });
        if (!userLogin) {
            console.log(`please register first`)
            return res.status(400).send(`please register first !`)
        }
        bcrypt.compare(password, userLogin.password, async (err, result) => {
            if (err) {
                console.log(`err in comapreing password:${err}`)
                return res.status(400).send(`err in comapreing password:${err}`)
            }
            if (result) {
                const accesstoken = jwt.sign({ userId: userLogin._id, password, email,mobile_no},
                    process.env.secret_key1, { expiresIn: '1h' });
                const refreshtoken = jwt.sign({ userId: userLogin._id, password, email,mobile_no },
                    process.env.secret_key2, { expiresIn: '1d' });
                if (!accesstoken && !refreshtoken) {
                  console.log( `error in token regentration`)
                    return res.status(500).send(`error in token regentration`)
                }
                console.log({"email":userLogin.email,"msG": `user login successfully`, "accesstoken": accesstoken, 
                    "refreshtoken": refreshtoken })
                return res.status(200).json({ "msG": `user login successfully`, "accesstoken": accesstoken, "refreshtoken": refreshtoken })
            }
        })
    } catch (error) {
        console.log(`error during  login  is :${error}`)
        return res.status(500).send(`error during  login  is :${error}`)
    }
})


userRouter.post('/logout', authUserRole(["buyer", "seller", "admin"]), async (req, res) => {
    const {email } = req.body;
    const accesstoken = req.headers.authorization?.split(" ")[1];

    try {
        const userLogout = await userModel.findOne({email });

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