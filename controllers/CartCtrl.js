const cartService = require('../services/cartSvc');

const cartController = {
    create : async(req, res) => {
       try{
        // console.log(req.body);
        const cart = await cartService.create(req.body);
        res.status(200);
        res.send({
            status : "added sucessful",
            data : cart
        });
       }catch(error){
        res.status(400);
        res.send({
            error : "server error",
            description : error
        })
       }
    },

    getByUserId : async(req, res) => {
       try{
        // console.log(req.params.userId)
        const cartInfo = await cartService.getByUserId(req.params.userId);
        console.log(cartInfo);
        res.status(200);
        res.send({
            status : "reterived sucessful",
            data : cartInfo
        })
       }catch  (error) {
        res.status(500);
        res.send({ error });
    }
    }
};

module.exports = cartController;