const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const productModel = require("../model/product.model");
const tokenModel = require('../model/token.model');
const authTaskRole = require('../middleware/authTaskRole.middleware');
const userModel = require('../model/user.model');
const authUserTask = require('../middleware/authUserTask.middleware');

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    try {
        const products = await productModel.find();
        if (!products) {
            return res.status(400).send(`products not found`)
        }
        return res.status(200).json({ 'products': products })

    } catch (error) {
        return res.status(500).send(`products not found and error is :${error}`)
    }
})


productRouter.get('/:id', authUserTask,async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const product = await productModel.findOne({ _id: id });
        if (!product) {
            console.log(`product details not found`)
            return res.status(400).send(`product details not found`)
        }
        console.log(`user products found`)
        return res.status(200).json({ 'productdetail': product })

    } catch (error) {
        console.log(`product details not found and error is :${error}`)
        return res.status(500).send(`product details not found and error is :${error}`)
    }
})



productRouter.get('/userproduct/:id',authUserTask, async (req, res) => {
    const { id } = req.params;
    try {
        const products = await productModel.find({ userId: id });
        if (!products) {
            console.log(` user products not found`)
            return res.status(400).send(` user products not found`)
        }
        console.log(`user products found`)
        return res.status(200).json({ 'Userproducts': products })

    } catch (error) {
        console.log(`user products not found and error is :${error}`)
        return res.status(500).send(`user products not found and error is :${error}`)
    }
})



productRouter.post('/create', [authUserTask,authTaskRole(["seller"])], async (req, res) => {
    const { gender, category, subCategoryCloth, subCategoryShoes, subCategoryHandbag, subCategorySunglass,
        subCategoryDesigners, subCategoryJewelryWatch, subCategoryAccessories, title, brand_name, price, description,
        neck_type, dress_type, color, sleeve_type, material, wash, origin_countery, imgaes,
        discount, stock, size, rating } = req.body;
    const userId = req.user._id;

    try {
        const productExists = await productModel.findOne({ title });
        if (productExists) {
            console.log(`product  already created:${productExists}`)
            return res.status(400).send(`product  already created:${productExists}`)
        }
        const productCreate = await productModel({
            gender, category, subCategoryCloth, subCategoryShoes, subCategoryHandbag, subCategorySunglass,
            subCategoryDesigners, subCategoryJewelryWatch, subCategoryAccessories, title, brand_name, price, description,
            neck_type, dress_type, color, sleeve_type, material, wash, origin_countery, imgaes,
            discount, stock, size, rating, userId
        });

        await productCreate.save();
        console.log(`product  created sccessfully:${productCreate}`)
        return res.status(200).send(`product  created sccessfully:${productCreate}`)

    } catch (error) {
        console.log(`error during  creating product is :${error}`)
        return res.status(500).send(`error during  creating product is :${error}`)
    }
})


productRouter.patch('/update/:id', [authUserTask,authTaskRole(["seller", "admin"])], async (req, res) => {
    const payload = req.body;
    const userId = req.user._id;
    const productId = req.params.id;
    console.log("userId", userId,)
    try {
        const product = await productModel.findById({ _id: productId });
        const user = await userModel.findById({ _id: userId });
        if (!product) {
            console.log(`please create  first !`)
            return res.status(400).send(`please create  first !`)
        }
        if (!user) {
            console.log(`user not found for delete product!`)
            return res.status(400).send(`user not found for delete  product!`)
        }
        if (userId.toString() == product.userId.toString() || user.role == 'admin') {
            const productUpdate = await productModel.findByIdAndUpdate({ _id: productId }, payload);
            if (productUpdate) {
                console.log(`product updated successfully! :${productUpdate}`)
                return res.status(200).send(`product updated successfully! :${productUpdate}`)
            }
        } else {
            console.log(`you are not allowed for update this product !`)
            return res.status(400).send(`you are not allowed for update this product !`)
        }

    } catch (error) {
        console.log(`error during  Update is :${error}`)
        return res.status(500).send(`error during  Update is :${error}`)
    }
})


productRouter.delete('/delete/:id', [authUserTask,authTaskRole(["seller", "admin"])], async (req, res) => {
    const productId = req.params.id;
    const userId = req.user._id;

    try {
        const product = await productModel.findById({ _id: productId });
        const user = await userModel.findById({ _id: userId });

        if (!product) {
            console.log(`product not found for delete !`)
            return res.status(400).send(`product not found for delete !`)
        }

        if (!user) {
            console.log(`user not found for delete product!`)
            return res.status(400).send(`user not found for delete  product!`)
        }
        if (userId.toString() == product.userId.toString() || user.role == 'admin') {
            await productModel.findByIdAndDelete({ _id: productId });

            console.log(`product deleted successfully!`)
            return res.status(200).send(`product deleted successfully!`);
        } else {
            console.log(`you are not allowed for delete this product !`)
            return res.status(400).send(`you are not allowed for delete this product !`)
        }

    } catch (error) {
        console.log(`error during deleteing  is :${error}`)
        return res.status(500).send(`error during deleteing  is :${error}`)
    }
})


module.exports = productRouter