const mongoose=require("mongoose");
const ProductInfo=require("../models/product.model");
const { cloudinary } = require("../config/cloudinary");
const createProducts=async(req, res)=>{
    try {
        const {name, description, price, quantity}=req.body;
        if(!req.file){
            return res.status(400).json({message:"Image is required"});
        }
        const productCreated=await ProductInfo.create({
            name,
            description,
            price,
            quantity,
            image:req.file.path,
            imagePublicId:req.file.filename
        });
        res.status(201).json({message:"Product Created Successfully", data: productCreated})
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
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        const findProductInfo = await ProductInfo.findById(id);

        if (!findProductInfo) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            message: "Single product found",
            data: findProductInfo
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const updateProducts=async(req, res)=>{
    try {
        const {id}=req.params;
        let updateData = { ...req.body };
        const product=await ProductInfo.findById(id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        if(req.file){
            if(product.imagePublicId){
                await cloudinary.uploader.destroy(product.imagePublicId);
            }
            updateData.image = req.file.path;
            updateData.imagePublicId = req.file.filename;
        }
        const updateProduct=await ProductInfo.findByIdAndUpdate(id, updateData,{new : true, runValidators: true,},);
        res.status(200).json({message:"Updated Product", data: updateProduct})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
const deleteProducts=async(req, res)=>{
    try {
        const {id}=req.params;
        const findProductInfo=await ProductInfo.findById(id);
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