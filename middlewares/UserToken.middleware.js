const jwt = require('jsonwebtoken');

const userTokenValidator = async(req, res, next) => {
    try{
        // console.log(req.headers);
        const token = req.headers.authorization;
        if(token){
            const decodedToken = jwt.verify(token, "secretKey");
        if(decodedToken){
            next();
        }
        }else {
            res.status(400);
            res.send({
                error : "unauthorized_request",
                description : "token is required"
            })
        }
    }catch(error){
       if(error instanceof jwt.JsonWebTokenError){
         res.status(400);
         res.send({
            error : "unauthorized_request",
            description : "token is expired"
         })
       }else{
         res.status(500);
         res.send({
            error :"internal server error"
         })
       }
    }
}

module.exports = userTokenValidator;