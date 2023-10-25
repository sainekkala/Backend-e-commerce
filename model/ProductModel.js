const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name : {
        type : "String"
    },
    price : {
        type : "Number"
    },
    rating : {
        type : "Number"
    },
    stock : {
        type : "boolean"
    }
}, {timestamps: true});

const ProductModel = mongoose.model("product",ProductSchema);

module.exports = ProductModel;