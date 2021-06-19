const express = require('express');
const router = express.Router();
const { User } = require('../models/user.model');
const { authorizedUser } = require('../utils/authorizedUser');

router.route('/')
    .get(authorizedUser, async (req, res) => {
        const { username } = req.body;
        try {
            const { wishlist } = await User.findOne({ username: username })
                            .populate({ path: 'wishlist', populate: 'Product' });
            res.json({
                success: true,
                result: wishlist
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
            const updatedData = await User.findOneAndUpdate({ username: username }, { $push: { wishlist: productId } })
            res.json({
                success: true,
                result: "Added to Wishlist."
            })
        } catch (e) {
            console.log(e.message);
            res.status(501).json({
                success: false,
                error: e.message,
                result: 'Unable to save to playlist.'
            })
        }
    })
    .delete(authorizedUser, async (req, res) => {
        const { username, productId } = req.body;
        try {
            const updatedData = await User.findOneAndUpdate({ username: username }, { $pull: { wishlist: productId } })
            res.json({
                success: true,
                result: "Removed from Wishlist."
            })
        } catch (e) {
            console.log(e.message);
            res.status(501).json({
                success: false,
                error: e.message,
                result: 'Unable to delete from playlist.'
            })
        }
    })

module.exports = router