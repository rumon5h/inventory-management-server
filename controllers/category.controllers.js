const { getCategoriesService, createCategoryService } = require("../services/category.service");

exports.getCategories = async (req, res) => {
  try {
    const result = await getCategoriesService();

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to get the categories",
      error: error.message,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {

    const result = await createCategoryService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the category!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to create category!",
      error: error.message,
    });
  }
};
