const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
    const result = await Supplier.create(data);
    return result;
  }