const ProductService = require("../services/ProductSvc");
const reviewService = require("../services/reviewSvc");

const ProductCtrl = {
    getAll : async(req, res) => {
        try{
            const products = await ProductService.getAllProducts();
            res.status(200);
            res.send({
                data : products
            })
        }catch(error){
            res.status(400);
            res.send({
                error : "Server_error",
                description : error
            })
        }
    },
    getById : async (req, res) => {
        try{
            const product = await ProductService.getById(req.params.id);
            const ratings = await reviewService.calCountByProductId(req.params.id);
            const averageRating = await reviewService.averageRatingByProductId(req.params.id);
            // console.log(averageRating);
            // adding property to object
            const jsonproduct = product.toJSON();
            jsonproduct.ratings = ratings;
            // to remove decimal points
            jsonproduct.averageRating = averageRating?.[0]?.average.toFixed(1);
            // convert string into number using parsefloat
            jsonproduct.averageRating = jsonproduct.averageRating ? parseFloat(jsonproduct.averageRating) : undefined;
            res.status(200);
            res.send({
                data : jsonproduct
            })
        }catch(error){
            res.status(400);
            res.send({
                error : "Server_error",
                description : error
            });
        }
    },

    add : async (req, res) => {
        try{
            const product = await ProductService.getByName(req.body.name);
            if(product){
                res.status(409);
                res.send({
                    error: 'Product already exist',
                    errorDescription: 'Product already exist with the name provided in the request'
                });
            }else {
                const addedProduct = await ProductService.add(req.body);
                res.status(200);
                res.send({
                    status : "product added",
                    data : addedProduct
                })
            }
        }catch(error){
            res.status(400);
            res.send({
                error : "Server_error",
                description: error
            })
        }
    },
    update : async(req, res) => {
        try{
            const updatedproduct = await ProductService.update(req.params.id,req.body);
            res.status(200);
            res.send({
                status : "upadted sucessfully",
                data : updatedproduct
            })
        }catch(error){
            res.status(400);
            res.send({
                error : "Server_error",
                description: error
            })
        }
    },
    delete : async(req, res) => {
        try{
            const deletedProduct = await ProductService.delete(req.params.id);
            res.status(200);
            res.send({
                status : "product deleted Sucessfully",
                data : deletedProduct
            })
        }catch(error){
            res.status(400);
            res.send({
                error : "Server_error",
                description: error
            })
        }
    },
    patch : async(req, res) => {
        try{
            const updatedProduct = await ProductService.patch(req.params.id,req.body);
            res.status(200);
            res.send({
                status : "product deleted Sucessfully",
                data : updatedProduct
            })
        }catch(error){
            res.status(400);
            res.send({
                error : "Server_error",
                description: error
            })
        }
    },
    pagination : async(req, res) => {
        try{
            const pagePerData = +req.query.pagePerData;
            const pageNo = +req.query.pageNo;
            const totalRecords = await ProductService.getCount();
            const totalPages = Math.ceil(totalRecords/pagePerData);
            const dispalyedProducts = await ProductService.pagination(pageNo,pagePerData);
            const metadata = {
                isPrevious: pageNo > 0,
                isNext: (pageNo + 1) !== totalPages,
                count: totalRecords
            };
            res.status(200);
            res.send({
                metadata,
                data :dispalyedProducts
            });
        }catch(error){
            res.status(400);
            res.send({
                error : "Server_error",
                description: error
            });
        }
    }
}

module.exports = ProductCtrl;