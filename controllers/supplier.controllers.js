const {
  createSupplierService,
  getSuppliersService,
  getSupplierByIdService,
} = require("../services/supplier.services");

exports.createSupplier = async (req, res) => {
  try {
    const result = await createSupplierService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the supplier!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "Failed to create the supplier",
    });
  }
};

exports.getSuppliers = async (req, res, next) => {
  try {
    const result = await getSuppliersService(req.body);

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      error: "Failed to get the suppliers",
    });
  }
};

exports.getSupplierById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const supplier = await getSupplierByIdService(id);

    if (!supplier) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find a supplier with this id",
      });
    }

    res.status(200).json({
      status: "success",
      data: supplier,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      error: "Failed to get the brands",
    });
  }
};
