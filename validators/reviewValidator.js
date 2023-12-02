const joi = require('joi');

const reviewValidator = async(req, res, next) => {
    try {
        const reviewSchema = joi.object({
            title : joi.string().required(),
            description : joi.string().required(),
            rating : joi.number().required(),
            userId: joi.string().required(),
            productId: joi.string().required(),
        });
        await reviewSchema.validateAsync(req.body);
        next();
    }catch(error){
        const errorMessages = [];
        if (error.details) {
            error.details.forEach(obj => {
                errorMessages.push(obj.message);
            });
            res.status(400);
            res.send({errors: errorMessages});
        } else {
            res.status(500);
            res.send(error);
        }
    }
}

module.exports = reviewValidator;