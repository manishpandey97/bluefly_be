const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const productModel = require("../model/product.model");
const tokenModel = require('../model/token.model');
const authTaskRole = require('../middleware/authTaskRole.middleware');

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    try {
        const products = await productModel.find();
        if (!products) {
            return res.status(400).send(`products not found`)
        }
        return res.status(200).send(`products:${products}`)

    } catch (error) {
        return res.status(500).send(`products not found and error is :${error}`)
    }
})

productRouter.post('/create', authTaskRole(["seller", "admin"]), async (req, res) => {
    const { title, brand_name, product_type, frame_type, frame_shape, model_no, frame_size,
        frame_width, frame_dimensions, frame_colour, weight, weight_group, material, frame_material,
        temple_material, prescription_type, frame_style, imgaes } = req.body;
    const userId = req.user._id;

    try {
        const productExists = await productModel.findOne({ title });
        if (productExists) {
            return res.status(400).send(`product  already created:${productExists}`)
        }
        const productCreate = await productModel({
            title, brand_name, product_type, frame_type, frame_shape, model_no, frame_size,
            frame_width, frame_dimensions, frame_colour, weight, weight_group, material, frame_material,
            temple_material, prescription_type, frame_style, imgaes, userId
        });

        await productCreate.save();
        return res.status(200).send(`product  created sccessfully:${productCreate}`)

    } catch (error) {
        return res.status(500).send(`error during  creating  is :${error}`)
    }
})

productRouter.put('/update/:id', authTaskRole(["seller", "admin"]), async (req, res) => {
    const payload = req.body;
    const userId = req.user._id;
    const productId = req.params.id;
    try {
        const product = await productModel.findById({ _id: productId });
        if (!product) {
            return res.status(400).send(`please create  first !`)
        }
        if (userId.toString() == product.userId.toString()) {
            const productUpdate = await productModel.findByIdAndUpdate({ _id: productId }, payload);
            if (productUpdate) {
                return res.status(200).send(`please updated successfully! :${productUpdate}`)
            }
        } else {
            return res.status(400).send(`you are not allowed for update this product !`)
        }

    } catch (error) {
        return res.status(500).send(`error during  Update is :${error}`)
    }
})


productRouter.delete('/logout/:id', authTaskRole(["seller", "admin"]), async (req, res) => {
    const productId = req.params.id;
    const userId = req.user._id;

    try {
        const product = await productModel.findById({ _id: productId });

        if (!product) {
            return res.status(400).send(`product not found for delete !`)
        }
        if (userId.toString() == product.userId.toString()) {
            const deleteProduct = await productModel.findByIdAndUpDelete({ _id: productId });
            return res.status(200).send(`product deleted successfully:${deleteProduct}`);
        } else {
            return res.status(400).send(`you are not allowed for delete this product !`)
        }

    } catch (error) {
        return res.status(500).send(`error during deleteing  is :${error}`)
    }
})


module.exports = productRouter