const Brand = require("../models/Brand");


exports.getAllBrandService = async () => {
  const result = await Brand.find({}) //.populate('products');

  return result;
}

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);

  return result;
};



exports.getBrandByIdService = async (brandId) => {
  const result = await Brand.findOne({ _id: brandId });
  
  return result;
}

exports.updateBrandService = async (id, data) => {
  const result = await Brand.update({ _id: id }, data, {
    runValidators: true
  });

  return result;
}

exports.deleteBrandByIdService = async (id) => {
  const result = await Brand.deleteOne({ _id: id });

  return result;
}