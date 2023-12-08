import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middleware/jwt.middleware.js';

const userRouter = express.Router();


const userController = new UserController();

userRouter.post('/signUp',(req,res)=>{
    userController.signUp(req,res);
})

userRouter.post('/signIn',(req,res)=>{
    userController.signIn(req,res);
})

userRouter.get('/logout',jwtAuth,(req,res)=>{
    userController.logout(req,res);
})

userRouter.post('/reset-password',jwtAuth,(req,res)=>{
    userController.resetPassword(req,res);
})
export default userRouter;