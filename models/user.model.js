const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    username: { type: String, 
        lowercase: true, 
        index: true, 
        required: [true, "Username cannot be empty"],
        unique: [true, "Username already exists"] 
    },
    password: { type: String, required: [true, "Password cannot be empty"] },
    name: { type: String, required: [true, "Name cannot be empty"] },
    email: { type: String, required: [true, "EMail cannot be empty"] },
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    cart: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            qty: { type: Number }
        }
    ]
}, { timestamps: true })
const User = mongoose.model('User', userSchema)

module.exports = { User }