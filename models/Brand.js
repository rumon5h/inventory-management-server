const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema(
  {
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a brand name."],
      maxLength: 100,
      unique: true,
      lowerCase: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowerCase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      required: true,
    },
    website: {
      type: String,
      validate: [validator.isURL, "Please provide a valid URL"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    suppliers: [
      {
        name: String,
        contactNumber: String,
        id: {
          type: ObjectId,
          ref: "Supplier",
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
