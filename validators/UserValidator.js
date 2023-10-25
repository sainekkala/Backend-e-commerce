const joi = require('joi');

const userValidator = async(req, res, next) => {
    try{
        const UserSchema = joi.object({
            firstname : joi.string().required(),
            lastname : joi.string().required(),
            email : joi.string().email().required(),
            password : joi.string().required()
        });
        await UserSchema.validateAsync(req.body);
        next();
    }catch (error){
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

module.exports = userValidator;