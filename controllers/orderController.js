const asyncHandler = require('express-async-handler');

const Order = require('../models/orderModel');

const createOrder = asyncHandler(async (req, res) => {
    const {products } = req.body;
    if(!products){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const order = await Order.create({
        buyerId: req.user._id,
        sellerId: req.params.seller_id,
        products,
    });

    if(order){
        res.status(200).json({
            status: 200,
            success: true,
            message: "Order created successfully",
            order,
            count: order.length,
        });
    }
    else{
        res.status(400);
        throw new Error("Order not created");
    }
});



const getAllOrders = asyncHandler(async (req, res) => {
    // const {sellerId} = req.body;
    const orders =await Order.find({
        sellerId:req.user._id,
    })
    // console.log(orders );
    if(!orders){
        res.status(400);
        throw new Error("Orders not found");
    }
    res.send(orders);
    
});


module.exports = {createOrder, getAllOrders};
