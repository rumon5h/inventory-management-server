const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controllers");

router.route("/").get(storeController.getStores);

module.exports = router;
