const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId
    },
    quantity : {
        type : "Number"
    }
});

const cartSchema = new mongoose.Schema ({
    userId : {
        type : "String"
    },
    products : [productSchema]
},{timestamps : true});

const cartModel = mongoose.model("carts", cartSchema);

module.exports = cartModel;