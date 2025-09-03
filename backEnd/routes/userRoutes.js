import express from 'express'
import { loginUser , registerUser , getAllUsers } from '../controllers/userController.js'


const userRouter  = express.Router();

userRouter.post('/login' , loginUser )
userRouter.post('/register' , registerUser )
userRouter.get('/allusers' , getAllUsers )

export default userRouter ;