const mongoose = require('mongoose');
const validator = require("validator");
const {ObjectId} = mongoose.Schema.Types;

// Schema design 
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this product'],
        trim: true,
        unique: [true, 'Name must be unique.'],
        minLength: [3, 'Name must be at least 3 characters long'],
        maxLength: [150, 'Name is to large.'],
        lowerCase: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this product'],
        trim: true,
    },
    unit: {
        type: String,
        required: [true, 'Please provide a unit for this'],
        enum: {
            values: ['kg', 'liter', 'pcs', 'bag'],
            message: 'Unit value must be one of kg, liter, bag or pcs'
        }
    },
    imageURLs:[{
        type: String,
        required: true,
        validate: () => {
            validator: (value) => {
                if(!Array.isArray(value)){
                    return false;
                }
                let isValid = true;
                value.forEach(url => {
                    if(!validator.isURL(url)){
                        isValid = false;
                    }
                })
                return isValid;
            };
            message: 'please provide valid image URLs'
        }
    }],
    category: {
        type: String,
        required: true
    },
    brand: {
        name: {
            type: String,
            required: true
        },
        id: {
                type: ObjectId,
                ref: 'Brand',
                required: true
        }
    }
}, {
    timestamps: true
});

// Mongoose middleware for saving data: pre 
productSchema.pre('save', function(next) {
    if(this.quantity == 0){
        this.status = 'out-of-stock';
    }
    next()
})


// Model 
const Product = mongoose.model('product', productSchema)

module.exports = Product;