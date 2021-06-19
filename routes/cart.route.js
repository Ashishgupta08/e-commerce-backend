const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model');
const { authorizedUser } = require('../utils/authorizedUser');

router.route('/')
    .get(authorizedUser, async (req, res) => {
        const { username } = req.body;
        try {
            const { cart } = await User.findOne({ username: username })
                            .populate({ path: 'cart', populate: { path: 'productId', populate: 'Product' } });
            res.json({
                success: true,
                result: cart
            })
        } catch(e) {
            console.log(e.message);
            res.status(501).json({
                success: false,
                error: e.message,
                result: 'Unable to fetch data.'
            })
        }
    })
    .post(authorizedUser, async (req, res) => {
        const { username, productId } = req.body;
        try {
            const updatedData = await User.findOneAndUpdate({ username: username }, { $push: { cart: { productId: productId, qty: 1 } } })
            res.json({
                success: true,
                result: "Added to Cart."
            })
        } catch (e) {
            console.log(e.message);
            res.status(501).json({
                success: false,
                error: e.message,
                result: 'Unable to save to cart.'
            })
        }
    })
    .delete(authorizedUser, async (req, res) => {
        const { username, productId } = req.body;
        try {
            const updatedData = await User.findOneAndUpdate({ username: username }, { $pull: { cart: { productId: productId } } })
            res.json({
                success: true,
                result: "Removed from Cart."
            })
        } catch (e) {
            console.log(e.message);
            res.status(501).json({
                success: false,
                error: e.message,
                result: 'Unable to remove from cart.'
            })
        }
    })

router.patch('/:id', authorizedUser, async (req, res) => {
    const { id } = req.params;
    const { username, qty } = req.body;
    try {
        const updatedData = await User.findOneAndUpdate({ username: username, "cart._id": id }, { $set: { "cart.$.qty": qty } })
        res.json({
            success: true,
            result: "Cart updated successfully."
        })
    } catch (e) {
        console.log(e.message);
        res.status(501).json({
            success: false,
            error: e.message,
            result: 'Unable to update the cart.'
        })
    }
})

module.exports = router