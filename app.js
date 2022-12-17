const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res, next) => {
    res.send("Hello, world!");
})

module.exports = app;