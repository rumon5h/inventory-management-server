const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// Middlewares
app.use(express.json());
app.use(cors());

// Schema => Model => Query 
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
            values: ['kg', 'liter', 'pcs'],
            message: 'Unit value must be one of kg, liter, or pcs'
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
            values: ['in-stock', 'out-of-stock', 'discontinued'],
            message: 'Status must be one of is-stock, out-of-stock, or discontinued'
        },
         required: true
    },
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Supplier',
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]
}, {
    timestamps: true
});

// Mongoose middleware for saving data: pre : post
productSchema.pre('save', function(next) {
    if(this.quantity == 0){
        this.status = 'out-of-stock';
    }
    next()
})

// productSchema.post('save', function(doc, next) {
//     console.log('After saving product');
//     next();
// })

productSchema.methods.logger= function(){
    console.log(`Data save for ${this.name}`);
}
// Model 
const Product = mongoose.model('product', productSchema)



app.get('/', (req, res, next) => {
    res.send("Hello, world!");
})

// Posting to database
app.post('/api/v1/product', async(req, res, next) => {
    // Save or create product
    try{
        // If I don't want to change anything
        const result = await Product.create(req.body);
        result.logger()

        // If I want to change any properties of the product
        // const product = await new Product(req.body);
        // const res = await product.save();

    res.status(200).json({
        status: 'success',
        message: 'Successfully saved product',
        data: result
    })
    }
    catch(error){
        res.status(404).json({
            status: 'Failed',
            message: 'Something went wrong',
            error: error.message
        })
    }
});

app.get('/api/v1/product', async(req,res, next) => {
    try {
        // To get specific product
        // const product = await Product.find({_id: '639feb8c48f4bf4c6e071b45'});

        // To get all products
        // const products = await Product.find({});

        // To get only in-stock products
        // const products = await Product.find({status: {$ne: 'out-of-stock'}});

        // To get only name and quantity 
        // const products = await Product.find({}, 'name quantity');

        // To get without name and quantity
        // const products = await Product.find({}, '-name -quantity');

        // Advantage of using mongoose
        // const products = await Product.where('name').equals(/\w/)
        // .where('quantity').gt(50).lt(600)
        // .limit(2).sort({quantity: -1});

        // To get specific one product
        // const product = await Product.findById('639feb8c48f4bf4c6e071b');


        res.status(200).json({
            status: 'success',
            message: 'Successfully get the products',
            data: products
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: 'Something went wrong',
            error: error.message
        })
    }
})
module.exports = app;