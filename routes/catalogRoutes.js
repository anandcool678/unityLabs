const express = require("express");
const router = express.Router();

const { createCatalog, getCatalog } = require("../controllers/catalogController");
const { protect } = require("../middleware/authMiddleware");
//you can test the API in postman after setting the bearer token in the header
router.route("/").post(protect,createCatalog);
router.route("/:userId").get(getCatalog);


module.exports = router;