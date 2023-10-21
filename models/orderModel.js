const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    buyerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    
    },
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
    },],

});

const Order = mongoose.model("Order",orderSchema);

module.exports= Order;