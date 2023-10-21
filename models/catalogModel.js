const mongoose = require('mongoose');

const catalogSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
    },]
});


const Catalog = mongoose.model("Catalog",catalogSchema);

module.exports= Catalog;