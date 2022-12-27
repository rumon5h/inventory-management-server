const { createSupplierService } = require("../services/supplier.services");

exports.createSupplier = async (req, res) => {
    try {
      const result = await createSupplierService(req.body);
  
      res.status(200).json({
        status: "success",
        message: "Successfully created the supplier!",
        data: result
      })
    } catch (error) {

        res.status(400).json({
        status: "failed",
        error: "Failed to create the supplier"
      })
    }
  }
  