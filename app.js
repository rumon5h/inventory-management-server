const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Middlewares
app.use(express.json());
app.use(cors());

// Schema => Model => Query 

// Routes
const productRoute = require('./routes/product.route');


app.get('/', (req, res, next) => {
    res.send("Hello, world!");
})

// Posting to database
app.use('/api/v1/product', productRoute);

module.exports = app;