const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    title: {
        type: 'String'
    },
    description: {
        type: 'String'
    },
    rating: {
        type: 'Number'
    },
    productId: {
        type: 'String'
    },
    userId: {
        type: 'String'
    }
}, { timestamps: true });

const reviewModel = mongoose.model('reviews', reviewSchema);

module.exports = reviewModel;
