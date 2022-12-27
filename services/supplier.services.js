const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
  const result = await Supplier.create(data);
  return result;
};

exports.getSuppliersService = async () => {
  const result = await Supplier.find({});
  return result;
};
