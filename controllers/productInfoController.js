const mongoose=require("mongoose");
const ProductInfo=require("../models/product.model");
const createProducts=async(req, res)=>{
    try {
        const productCreated=await ProductInfo.create(req.body);
        res.status(200).json({message:"Product Created Successfully", data: productCreated})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const getAllProducts=async(req, res)=>{
    try {
        const getAllProducts=await ProductInfo.find();
        res.status(200).json({message:"List of all products", data: getAllProducts})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const getSingleProducts=async(req, res)=>{
    try {
        const {id}=req.params;
        const getSingleProducts=await ProductInfo.find(id);
        res.status(200).json({message:"List of single product", data: getSingleProducts})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const updateProducts=async(req, res)=>{
    try {
        const {id}=req.params;
        const updateProduct=await ProductInfo.findByIdAndUpdate(id, req.body,{new : true});
        res.status(200).json({message:"Updated Product", data: updateProduct})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const deleteProducts=async(req, res)=>{
    try {
        const {id}=req.params;
        const findProductInfo=ProductInfo.findById(id);
        if(!findProductInfo){
            res.status(404).json({message:"Product not found"});
        }
        await ProductInfo.findByIdAndDelete(id);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
module.exports={
    createProducts,
    getAllProducts,
    getSingleProducts,
    updateProducts,
    deleteProducts
}