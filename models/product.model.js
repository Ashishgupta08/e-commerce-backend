const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
    name: { type: String },
    price: {
        marked: { type: Number },
        selling: { type: Number }
    },
    imgUrl: { type: String },
    size: {
        uk: { type: Array },
        us: { type: Array }
    },
    color: { type: String },
    category: { type: String },
    brand: { type: String },
    gender: { type: String },
    description: { type: String },
    rating: { type: String },
    stock: { type: String }
}, { timestamps: true })
const Product = mongoose.model('Product', productSchema)

module.exports = { Product }