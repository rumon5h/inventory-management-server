const mongoose = require('mongoose');

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

module.exports = Product;