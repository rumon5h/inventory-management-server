const {
  getStoresService,
  createStoreService,
  getStoreByIdService,
} = require("../services/store.service");

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

exports.createStore = async (req, res) => {
  try {
    const result = await createStoreService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the store!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to create store",
      error: error.message,
    });
  }
};

exports.getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getStoreByIdService(id);

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to get the store",
      error: error.message,
    });
  }
};
