const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controllers');


router.route('/')
.get(productController.getProducts)
.post(productController.createProduct)

router.route('/bulk-update').patch(productController.bulkUpdateProducts)

router.route('/:id').patch(productController.updateProduct)
.delete(productController.deleteProductById)




module.exports = router;