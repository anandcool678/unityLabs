const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Product = require("../models/productsModel");

const createProduct = asyncHandler(async (req, res) => {
    const {name, price} = req.body;

    if(!name || !price){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const product = await Product.create({
        name,
        price,
    });
    if(product){
        res.status(200).json({
            status: 200,
            message:"Product created successfully",
            product:{
                _id: product._id,
                name: product.name,
                price: product.price,
            }
        });
    }
    else{
        res.status(400);
        throw new Error("Product not created");
    }
});

const getProducts = asyncHandler(async (req, res) => {
    
    const products = await Product.find();
    if(!products){
        res.status(400);
        throw new Error("Products not found");
    }
    res.status(200).json(
        {
            success:true,
            products,
            count:products.length,
            
        }
    );
});

const getProductBySeller = asyncHandler(async(req,res)=>{
    const products = await Product.find({userId: req.params.userId});
    if(!products){
        res.status(400);
        throw new Error("Products not found");
    }
    res.status(200).json(
        {
            success:true,
            products,
            count:products.length,
            
        }
    );
})

module.exports = { createProduct, getProducts, getProductBySeller };