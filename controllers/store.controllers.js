const { getStoresService, createStoreService } = require("../services/store.service");

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