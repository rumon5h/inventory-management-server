const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);

  return result;
};

exports.getAllBrandService = async () => {
  const result = await Brand.find({});

  return result;
}

exports.getBrandByIdService = async (brandId) => {
  const result = await Brand.findOne({ _id: brandId });
  
  return result;
}