const { getCategoriesService } = require("../services/category.service");


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
