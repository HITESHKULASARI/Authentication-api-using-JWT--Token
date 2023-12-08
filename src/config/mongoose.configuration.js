import mongoose from "mongoose";

//database running on
const url = "mongodb://127.0.0.1:27017/userDB";

export const connectUsingMongoose = async ()=>{
    try{

        await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Mongodb connected using mongoose");
    }catch(err){
        console.log("error while connecting to the database");
        console.log(err);
    }
}