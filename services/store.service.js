const Store = require("../models/Store");

exports.getStoresService = async () => {
  const result = await Store.find({});
  return result;
};

exports.createStoreService = async (data) => {
  const result = await Store.create(data);
  return result;
};

exports.getStoreByIdService = async (id) => {
  const result = await Store.find({ _id: id });
  return result;
};
