import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";
import jwt from "jsonwebtoken";
const userModel = new UserModel();

export default class UserController{
    constructor(){

        this.userRepository = new UserRepository();
    }

    async  signUp(req,res){
        
        try{
            const {name,email,password,phone,age,type} = req.body;

            const newUser = userModel.createUser(name,password, email,phone,age,type);

            const createdUser = await this.userRepository.signUp(newUser);

            res.status(200).send(createdUser);

        }catch(err){
            
            console.log("error while signup from usercontroller :");
            console.log(err);
        }
        
    }

    async signIn(req,res){

         try{

            const {email,password} = req.body;

            const user = await this.userRepository.signIn(email,password);
            
            if(user){
                // 1. Create token.
                    const token = jwt.sign(
                    {
                      name: user.name,
                      email: user.email,
                    },
                    "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz" ,
                    {
                      expiresIn: '1h',
                    }
                  );
                  await this.userRepository.addTokenWhileSignIn(token,email);
                  // 2. Send token.
                  return res.status(200).send(token);
            }else{

               return res.status(401).send("User is not found");

            }
 

         }catch(err){
            console.log("error in signIn in controller");
            console.log(err);
         }
    }

    async logout(req,res){
        
        // https://www.youtube.com/watch?v=TO51hGC5zDA
        const token = req.token;
        const email = req.email;

        try{ 
            
            const tokenExits = await this.userRepository.logout(token,email);
            console.log("tokenExits :",tokenExits);
            if(!tokenExits){

                res.status(401).send("authorization is required ");

            }else{

                
                res.status(200).send("user is logout");

            }

            

        }catch(err){
            console.log("error in logout in controller");
            console.log(err);
        }

    }

    async resetPassword(req,res){
        
        const {newPassword} = req.body;
        const email = req.email;

        try{
            await this.userRepository.resetPassword(newPassword,email);

            res.status(200).send("password is changed");
        }catch(err){
             console.log("error while reseting the password");
             console.log(err);
        }

        

    }
}