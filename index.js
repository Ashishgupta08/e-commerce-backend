require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { User, Product, Wishlist, Cart } = require('./routes/index');
const { appConnection } = require('./utils/appConnection')

const app = express();
const PORT = process.env['PORT'];
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to the server of 100 Steps - ECommerce App.")
});

app.use('/user', User);

app.use('/product', Product);

app.use('/wishlist', Wishlist);

app.use('/cart', Cart);

app.use('*', (req, res) => {
    res.status(404).send("Error 404 - Route not found.")
});

app.listen(PORT, () => appConnection(PORT));