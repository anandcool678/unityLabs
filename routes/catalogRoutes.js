const express = require("express");
const router = express.Router();

const { createCatalog, getCatalog } = require("../controllers/catalogController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post( createCatalog);
router.route("/:userId").get(getCatalog);


module.exports = router;