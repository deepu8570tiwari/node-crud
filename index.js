const express =require("express");
const connectDB=require("./database/db.config.js");
const ProductRoutes=require("./routes/productInfoRoutes.js")
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use("/api/products", ProductRoutes);

connectDB().then(()=>{
    app.listen(4001,()=>{
         console.log("Node project app is running on port 4001");
    })
})


