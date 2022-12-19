const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Middlewares
app.use(express.json());
app.use(cors());

// Schema => Model => Query 



app.get('/', (req, res, next) => {
    res.send("Hello, world!");
})

// Posting to database
app.post('/api/v1/product', );

app.get('/api/v1/product', )
module.exports = app;