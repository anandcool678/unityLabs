const express = require('express');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

const {createProduct, getProducts, getProductBySeller} = require('../controllers/productController');
//you can test the API in postman after setting the bearer token in the header


router.route("/").post(protect,createProduct).get(protect, getProducts);
router.route("/").get(protect, getProductBySeller);

module.exports = router;