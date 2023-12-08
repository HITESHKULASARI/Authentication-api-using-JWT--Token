import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const UserModel = mongoose.model('User',userSchema);


export default class UserRepository{

    async signUp(user){
        

        try{
            //first we will create the instance
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;

        }catch(err){
            console.log("error while creating the user in signup")
            console.log(err);


        }
        
    }

    async signIn(email,password){

        try{
            
            return await UserModel.findOne({email,password});

        }catch(err){
            console.log("error while creating the user in signup")
            console.log(err);
        }
    }

    async addTokenWhileSignIn(token , email){
          
        try{ 
             
            const user = await UserModel.findOne({email});

            let oldTokens = user.tokens || [];

            if(oldTokens.length){
                console.log(oldTokens);
                oldTokens  = await oldTokens.filter(t =>{
                    const timeDiff = (Date.now() - parseInt(t.signedAt))/1000;
                    console.log(timeDiff);
                    if(timeDiff <= 86400){
                        return t;
                    }
                })
            }
            
            await UserModel.findOneAndUpdate({email},{tokens:[...oldTokens,{token, signedAt : Date.now().toString()}]})


        }catch(err){
            console.log("error while storing the token on database");
            console.log(err);
        }
    }

    async logout(token , email){
        try{
            const flag = true;
            
            const user = await UserModel.findOne({email});

            const tokens = user.tokens;

            const oldSize = user.tokens.length;

            const newTokens = tokens.filter(t => t.token != token);
            
            const newSize = newTokens.length;
            
            
            if(oldSize > newSize){

                

                await UserModel.findOneAndUpdate({email},{tokens:newTokens});
                
                return true;
            }else{

                return false;
            }

            
            

        }catch(err){

            console.log("error while logout in repository");
            console.log(err);

        }
    }
    
    async resetPassword(newPassword,email){

        try{
            await UserModel.findOneAndUpdate({email},{password:newPassword});
        }catch(err){
            console.log("error while connecting the user");
            console.log(err);
        }


    }
    
}