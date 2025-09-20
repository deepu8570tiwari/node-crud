const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const Connection=async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.NODE_MONGOOSE_USER_NAME}:${process.env.NODE_MONGOOSE_USER_PASSWORD}@backend-crud.zufjl0e.mongodb.net/?retryWrites=true&w=majority&appName=backend-crud`)
        console.log("Database connected");
    }
    catch(error){
        console.log("Database is not connected", err.message);
        process.exit(1); // exit process if DB fails
    }
}
module.exports = Connection;