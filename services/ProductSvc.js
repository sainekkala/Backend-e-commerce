const ProductModel = require("../model/ProductModel")

const ProductService = {
    getAllProducts : () => {
        return ProductModel.find();
    },
    getById : (id) => {
        return ProductModel.findById(id);
    },
    getByName : (name) => {
        return ProductModel.findOne({name})
    },
    add : (data) => {
        const newProduct = new ProductModel(data);
        return newProduct.save();
    },
    update : (id, data) => {
        return ProductModel.findByIdAndUpdate(id,data, {new : true});
    },
    delete : (id) => {
        return ProductModel.findByIdAndDelete(id);
    },
    patch : (id, data) => {
        return ProductModel.findByIdAndUpdate(id,{$set: {...data}}, {new : true});
    },
    getCount : () => {
        return ProductModel.countDocuments();
    },
    pagination : (pageNo, pagePerData) => {
        return ProductModel.find().skip(pageNo * pagePerData).limit(pagePerData);
    }
};

module.exports = ProductService;