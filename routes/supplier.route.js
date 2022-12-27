const express = require("express");
const supplierController = require("../controllers/supplier.controller");

const router = express.Router();

router.route("/")
  .post(supplierController.createSupplier)

module.exports = router;