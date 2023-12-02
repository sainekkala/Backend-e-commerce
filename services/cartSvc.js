const cartModel = require("../model/CartModel");

const cartService = {
    create : (data) => {
        const cart = new cartModel(data);
        return cart.save();
    },
    getByUserId : (userId) => {
        return cartModel.aggregate([
            {
                $match : {userId},
            },
            {
                $lookup : {
                    from : "products",
                    localField : "products.productId",
                    foreignField : "_id",
                    as : "productInfo"
                }
            },
            {
                $project : {
                    quantity : "$products.quantity",
                    producInfo : "$productInfo"
                }
            }
        ]);
    }
}

module.exports = cartService;