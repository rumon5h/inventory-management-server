const Store = require("../models/Store");


exports.getStoresService = async () => {
  const result = await Store.find({});
  return result;
};

exports.createStoreService = async (data) => {
    const store = await Store.create(data);
    return store;
  };