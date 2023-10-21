const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const { createCatalog, getCatalog } = require("../controllers/catalogController");
const {getAllOrders} = require("../controllers/orderController");
router.route("/create-catalog").post(protect, createCatalog);

router.route("/orders").get(protect,getAllOrders);

module.exports = router;