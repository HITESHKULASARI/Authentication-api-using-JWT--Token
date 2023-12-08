import express from "express";
import { connectUsingMongoose } from "./src/config/mongoose.configuration.js";
import userRouter from "./src/features/user/user.routes.js";

const server = express();

server.use(express.json()) ;

//api hiting will come here it's missing from here
server.use('/api/users',userRouter);
server.listen(8000,(err)=>{
    if(err){
        console.log("error while connecting to the server : ",err);
    }
    console.log("server is running on the port 8000");
    connectUsingMongoose();
})