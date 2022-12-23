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

exports.updateBrandService = async (id, data) => {
  const result = await Brand.update({ _id: id }, data, {
    runValidators: true
  });

  return result;
}