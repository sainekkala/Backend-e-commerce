const joi = require('joi');

const ProductValidator = async(req, res, next) => {
    try{
        const ProductSchema = joi.object({
            name : joi.string().required(),
            price : joi.number().required(),
            rating : joi.number().required(),
            stock : joi.boolean().required()
        });
        await ProductSchema.validateAsync(req.body);
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
};

module.exports = ProductValidator;