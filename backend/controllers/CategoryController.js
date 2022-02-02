const Category = require("../models/Category");
const ObjectId = require('mongodb').ObjectId; 

exports.getCategoryNames = async (req,res) => {
    try {
        const categories = await Category.find({},{name:1});
        res.json({categories,error:false})
    } catch (err) {
        console.log(err)
        res.json({err,error:true})
    }
}

exports.getCategories = async (req,res) => {
    try {
        let categories = await Category.find({});
        categories = await Promise.all(categories.map(async c => {
            const child_categories = await Category.find({_parentCategoryId: ObjectId(c._id)},{name:1})
            return {id:c._id,name:c.name,child_categories}
        }))
        res.json({categories,error:false})
    } catch (err) {
        console.log(err)
        res.json({err,error:true})
    }
}

exports.saveCategory = async (req,res) => {
    try {
        const newCategory = Category(req.body);
        await newCategory.save()
        res.json({message:"success",error:false})
    } catch (err) {
        console.log(err);
        res.json({err,error:true});
    }
}