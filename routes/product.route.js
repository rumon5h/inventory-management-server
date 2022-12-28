const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controllers");
const uploader = require("../middleware/uploader");
const authorization = require('../middleware/authorization');

// multiple image > uploader.array('image')
router.post('/file-upload', uploader.single('image'), productController.fileUpload)


router.route("/bulk-update").patch(productController.bulkUpdateProducts);

router.route("/bulk-delete").delete(productController.bulkDeleteProducts);

router
  .route("/")
  .get(productController.getProducts)
  .post(authorization('admin', 'store-manager'),productController.createProduct);

router
  .route("/:id")
  .patch(productController.updateProductById)
  .delete(productController.deleteProductById);

module.exports = router;
