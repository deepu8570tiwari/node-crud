const mongoose=require("mongoose");
const ProductInfoSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter the product name"]
    },
    description:{
        type:String,
        required:[true, "Please enter the product description"]
    },
    price:{
        type:Number,
        required:[true, "Please Enter the price"]
    },
    quantity:{
        type:Number,
        required:[true, "Please enter the quantity"]
    },
    image:{
        type:String
    }
}, {timestamp:true})


const products= mongoose.model("ProductInfo",ProductInfoSchema);
module.exports=products;