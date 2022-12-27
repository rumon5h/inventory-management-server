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
const brandRoute = require('./routes/brand.route');
const categoriesRoute = require('./routes/category.route');
const storeRoute = require('./routes/store.route');
const stockRoute = require('./routes/stock.route');
const suppliersRoute = require('./routes/supplier.route');
// const userRoute = require('./routes/user.route');



app.get('/', (req, res, next) => {
    res.send("Hello, world!");
})

// Posting to database
app.use('/api/v1/product', productRoute);
app.use('/api/v1/brand', brandRoute);
app.use('/api/v1/category', categoriesRoute);
app.use('/api/v1/store', storeRoute);
app.use('/api/v1/stock', stockRoute);
app.use('/api/v1/supplier', suppliersRoute);
// app.use('/api/v1/user', userRoute);

module.exports = app;