const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Catalog = require("../models/catalogModel");

const createCatalog = asyncHandler(async (req, res) => {
    const { products } = req.body;
    
    
    if (!products) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const user = await User.findById(req.user._id);
    if(user.typeOfUser !== "seller"){
        res.status(400).json({
            success: false,
            error: "You are not a seller",
            catalog:null,
        });
        throw new Error("You are not a seller");
    }

    const catalogExists = await Catalog.find({
        userId: req.user._id,
        // userId: ObjectId(req.body.userId),
    });
    // console.log(catalogExists);


    if(catalogExists.length>0){
        return res.status(400).json({
            success:false,
            error:"Catalog already exists",
            catalog:null,
        });
        throw new Error("Catalog already exists");
    }


    
    

    const catalog = await Catalog.create({
        userId:req.user._id,
        products,
    });
    if (catalog) {
        res.status(200).json({
            status: 200,
            success: true,
            message: "Catalog created successfully",
            catalog,
            count: catalog.length,
        });
    } else {
        res.status(400);
        throw new Error("Catalog not created");
    }
});


const getCatalog = asyncHandler(async (req, res) => {
    try {
    const catalog = await Catalog.find({
        userId:req.params.seller_id,
    }).populate("products");
    console.log(catalog);
    if(catalog.length===0){
        return res.status(400).json({
            success: false,
            status: 400,
            error: "Catalog not found",
            catalog:null,
        });
        
        throw new Error("Catalog not found");
    }

    res.status(200).json({
        success: true,
        status: 200,
        message: "Catalog found",
        catalog,
    });
    // res.send(catalog);
    } catch (error) {
        res.status(400).json({
            success: false,
            status: 400,
            error: "Catalog not found",
            catalog:null,
        });
    }
    // res.json(catalog);
});

module.exports = { createCatalog, getCatalog };
