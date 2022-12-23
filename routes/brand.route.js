const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controllers');

router.route('/')
.post(brandController.createBrand)
.get(brandController.getAllBrand)


router.route('/:id')
.get(brandController.getBrandById)


module.exports = router;