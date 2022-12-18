const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Middlewares
app.use(express.json());
app.use(cors());


// Schema design 
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this product'],
        trim: true,
        unique: [true, 'Name must be unique.'],
        minLength: [3, 'Name must be at least 3 characters long'],
        maxLength: [150, 'Name is to large.']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this product'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price for this product'],
        min: [0, 'Price cannot be negative.'],
    },
    unit: {
        type: String,
        required: [true, 'Please provide a unit for this'],
        enum: {
            value: ['kg', 'liter', 'pcs'],
            message: 'Unit value must be one of "kg", "liter", or "pcs"'
        }
    },
    quantity: {
        type: Number,
        required: [true, 'Please provide the quantity for this product'],
        min: [0, 'Quantity cannot be negative.'],
        validator: (value) => {
            const isInteger = Number.isInteger(value);
            if(isInteger) {
                return true;
            }
            else {
                return false;
            }
        },
        message: 'Quantity must be an integer'

    },
    status: {
        type: String,
        enum: {
            value: ['is-stock', 'out-of-stock', 'discontinued'],
            message: 'Status must be one of "is-stock", "out-of-stock", or "discontinued"'
        },
         required: true
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
    },
    categories: [{
        name: {
            type: String,
            required: true,
        },
        _id: mongoose.Schema.Types.ObjectId;
    }]
}, {
    timestamps: true
})
app.get('/', (req, res, next) => {
    res.send("Hello, world!");
})

module.exports = app;