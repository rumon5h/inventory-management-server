const {
  getProductsService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductServiceById,
  bulkDeleteProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    const filters = { ...req.query };
    const excludeField = ["sort", "page", "limit"];

    excludeField.forEach((field) => delete filters[field]);

    const queries = {};

    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        queries.sortBy = sortBy;
    }

    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        queries.fields = fields;
    }

    // To get all products
    const products = await getProductsService(filters, queries);

    res.status(200).json({
      status: "success",
      message: "Successfully get the products",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  // Save or create product
  try {
    // If I don't want to change anything
    const result = await createProductService(req.body);
    result.logger();

    // If I want to change any properties of the product
    // const product = await new Product(req.body);
    // const res = await product.save();

    res.status(200).json({
      status: "success",
      message: "Successfully saved product",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully updated product",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.bulkUpdateProducts = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully updated products",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const result = await deleteProductServiceById(req.body.ids);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "Failed",
        message: "Something went wrong",
        error: error.message,
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully deleted products",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.bulkDeleteProducts = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);

    res.status(200).json({
      status: "success",
      message: "Successfully updated products",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: "Something went wrong",
      error: error.message,
    });
  }
};
