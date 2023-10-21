const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const getAllSellers = asyncHandler(async (req, res) => {
    const sellers = await User.find({ typeOfUser: "seller" });
    if (!sellers) {
        res.status(400);
        throw new Error("Sellers not found");
    }
    res.status(200).json({
        success: true,
        sellers,
        count: sellers.length,
    });
});


module.exports = { getAllSellers };