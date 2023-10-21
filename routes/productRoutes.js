const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

const {createProduct, getProducts, getProductBySeller} = require('../controllers/productController');

router.route("/").post(protect,createProduct).get(protect, getProducts);
router.route("/").get(protect, getProductBySeller);

module.exports = router;