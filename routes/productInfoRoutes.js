const express=require("express");
const routes=express.Router();
const {createProducts,getAllProducts,getSingleProducts,updateProducts,deleteProducts}=require("../controllers/productInfoController");
routes.post("/",createProducts);
routes.get("/", getAllProducts);
routes.get("/:id", getSingleProducts);
routes.put("/:id", updateProducts);
routes.delete("/:id", deleteProducts);
module.exports=routes;