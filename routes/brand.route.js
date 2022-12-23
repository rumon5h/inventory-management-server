const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controllers');

router.route('/')
.post(brandController.createBrand)

module.exports = router;