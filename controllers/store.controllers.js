const { getStoresService } = require("../services/store.service");

exports.getStores = async (req, res) => {
  try {
    const result = await getStoresService();

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to get the stores data.",
      error: error.message,
    });
  }
};
