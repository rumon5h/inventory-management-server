const mongoose = require('mongoose');
const validator = require("validator");
const {ObjectId} = mongoose.Schema.Types;

// Schema design 
const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: 'Product'
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for this product'],
        trim: true,
        minLength: [3, 'Name must be at least 3 characters long'],
        maxLength: [150, 'Name is to large.'],
        lowercase: true
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
        validate: [validator.isURL, "Please provide a valid URL(s)"]
    }],
    price: {
        type: Number,
        required: true,
        min: [1, "Price cannot be negative."]
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity cannot be negative."]
    },
    category: {
        type: String,
        required: [true, 'Category is required.']
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
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['in-stock', 'out-of-stock', 'discontinued'],
            message: "Status cannot be {VALUE}."
        }
    },
    store: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a store name"],
            lowercase: true,
            enum: {
              values: ["dhaka", "chattogram", "rajshahi", "sylhet", "khulna", "barishal", "rangpur", "mymensingh"],
              message: "{VALUE} is not a valid name"
            }
          },
        id: {
            type: ObjectId,
            required: true,
            ref: 'Store',
        }
    },
    suppliedBy: {
        name: {
            type: String,
            trim: true,
            required: [true, "Please provide a supplier name"],
        },
        id: {
            type: ObjectId,
            ref: 'Supplier',
            required: true
        }
    },
    sellCount: {
        type: Number,
        default: 0,
        min: 0,
    }
}, {
    timestamps: true
});

// Mongoose middleware for saving data: pre 
stockSchema.pre('save', function(next) {
    if(this.quantity == 0){
        this.status = 'out-of-stock';
    }
    next()
})


// Model 
const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock;