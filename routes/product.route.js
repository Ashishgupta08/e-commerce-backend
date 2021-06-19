const express = require('express')
const router = express.Router()
const { Product } = require('../models/product.model')
const { authorizedUser } = require('../utils/authorizedUser')

router.route('/')
    .get(async(req, res)=>{
        try{
            const products = await Product.find();
            res.json({
                success: true,
                result: products
            })
        }catch(e){
            console.log(e.message);
            res.status(501).json({
                success: false,
                error: e.message,
                result: 'Unable to fetch data.'
            })
        }
        
    })
    .post(authorizedUser, async(req,res)=>{
        const { name, price, imgUrl, size, color, category, brand, gender, description, rating, stock } = req.body;
        try{
            const newProduct = await new Product({
                name: name,
                price: price,
                imgUrl: imgUrl,
                size: size,
                color: color,
                category: category,
                brand: brand,
                gender: gender,
                description: description,
                rating: rating,
                stock: stock
            })
            const product = await newProduct.save();
            res.json({
                success: true,
                result: `${product.name} - product added successfully.`
            })
        }catch(e){
            console.log(e.message);
            res.status(409).json({
                success: false,
                error: e.message,
                result: "Failed to add new product."
            })
        }
    })

router.route('/:id')
    .get(async(req, res)=>{
        const  { id }  = req.params;
        try{
            const product = await Product.findById({ _id: id});
            res.json({
                success: true,
                result: product
            })
        }catch(e){
            console.log(e.message);
            res.status(404).json({
                success: false,
                error: e.message,
                result: 'Product not found'
            })
        }
    })

module.exports = router