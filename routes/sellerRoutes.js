const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const { createCatalog, getCatalog } = require("../controllers/catalogController");
const {getAllOrders} = require("../controllers/orderController");
router.route("/create-catalog").post(protect, createCatalog);
//you can test the API in postman after setting the bearer token in the header
router.route("/orders").get(protect,getAllOrders);

module.exports = router;