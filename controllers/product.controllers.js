const {
  getProductsService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductServiceById,
  bulkDeleteProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  // http://localhost:5000/api/v1/product?sort=-price,quantity&fields=name,description,price&price[gte]=13

  try {
    let filters = { ...req.query };
    const excludeField = ["sort", "page", "limit"];

    excludeField.forEach((field) => delete filters[field]);

    // gt, lt, gte, lte 
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`)
    filters= JSON.parse(filtersString);

    const queries = {};

    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        queries.sortBy = sortBy;
    }

    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        queries.fields = fields;
    }

    // Pagination 
    if(req.query.page){
      const {page=1, limit=10} = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
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
    // result.logger();

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

exports.updateProductById = async (req, res, next) => {
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

exports.fileUpload = async (req, res, next) => {
  // multiple image > req.files
  try {
    
    res.status(200).send(req.file)
  } catch (error) {
   res.status(400).json({
    status: "Failed",
    message: 'Something went wrong',
    error: error.message
   })
  }
}