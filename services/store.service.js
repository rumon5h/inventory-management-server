const Store = require("../models/Store");


exports.getStoresService = async () => {
  const result = await Store.find({});
  return result;
};
