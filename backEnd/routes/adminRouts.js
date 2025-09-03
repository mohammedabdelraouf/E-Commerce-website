import express from 'express'

const adminRouter  = express.Router();
import { loginAdmin , registerAdmin } from '../controllers/adminController.js'
adminRouter.post('/login' , loginAdmin )
adminRouter.post('/register' , registerAdmin )

export default adminRouter ;

