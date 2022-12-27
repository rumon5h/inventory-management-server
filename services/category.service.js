const Category = require("../models/Category");

exports.getCategoriesService = async () => {
    const result = await Category.find({});
    return result;
}