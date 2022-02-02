const Product = require("../models/Product");
const ObjectId = require('mongodb').ObjectId; 

exports.getProducts = async (req,res) => {
    try {
        const {_categoryId} = req.query;
        const query = _categoryId == 'all'?{}:{"categories._id":_categoryId}
        const products = await Product.find(query)
        res.json({products,error:false})
    } catch (err) {
        console.log(err);
        res.json({err,error:true})
    }
}

exports.saveProduct = async (req,res) => {
    try {
        let newProduct = Product(req.body);
        console.log(req.body)
        newProduct = await newProduct.save();
        res.json({message:"success",error:false})
    } catch (err) {
        console.log(err)
        res.json({err,error:true})
    }
}

exports.updateProduct = async (req,res) => {
    try {
        const {_productId} = req.body;
        await Product.updateOne({_id:ObjectId(_productId)},req.body);
        res.json({message:"success",error:false})
    } catch (err) {
        console.log(err);
        res.json({err,error:true})
    }
}

exports.getProduct = async (req,res) => {
    try {
        const {_productId} = req.query;
        const product = await Product.findOne({_id:ObjectId(_productId)})
        res.json({product,error:false})
    } catch (err) {
        console.log(err);
        res.json({err,error:true})
    }
}