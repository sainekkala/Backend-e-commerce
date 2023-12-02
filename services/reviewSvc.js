const reviewModel = require('../model/reviewModel');


const reviewService = {
    add: (data) => {
        const review = new reviewModel(data);
        return review.save();
    },
    calCountByProductId : (productId) => {
        return reviewModel.aggregate([
            {
                $match : {productId:productId}
            },
            {
                $group : {_id : "$rating", count : {$sum : 1}}
            },
            {
                $sort : {
                    _id : -1 // 1 for ascending order, -1 for descending order
                }
            },
            {
                $project : {
                    rating : "$_id",
                    count : "$count",
                    _id : 0
                }
            }
        ])
    },
    averageRatingByProductId : (productId) => {
        return reviewModel.aggregate([
            {
                $match : {productId : productId},
            },
            {
                $group : {_id : "$productId", average : {$avg : "$rating"}}
            }
        ])
    }
};

module.exports = reviewService;