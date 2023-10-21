const express = require('express');

const router = express.Router();

const { getAllSellers } = require('../controllers/buyerController');
const { protect } = require('../middleware/authMiddleware');
const {getCatalog} = require('../controllers/catalogController');
const { createOrder } = require('../controllers/orderController');


router.route('/list-of-sellers').get(protect,getAllSellers);
router.route("/seller-catalog/:seller_id").get(protect,getCatalog);
router.route("/create-order/:seller_id").post(protect,createOrder);

module.exports = router;