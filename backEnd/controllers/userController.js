import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";


const creatUserToken = (id)=>{
 
    return jwt.sign({id,
        role:"user"
    }, process.env.JWT_SECRET)
}

const loginUser = async(req,res)=>{
    try {
        const {email , password} = req.body ;
        // check if user exist or not 
        const user = await userModel.findOne({email});
        if(user)
        {
            const isMatch = await bcrypt.compare(password , user.password);
            if(isMatch)
            {
                const token = creatUserToken(user._id);
                return res.status(200).json({success:true , token})
            }
            else
            {
                return res.status(400).json({
                    success:false ,
                    msg:"Wrong username or password" })

            }

        }
        else
        {
            return res.status(500).json({
                success:false ,
                msg:"Email doesn't exist" })
        }
        
    } catch (error) {
        res.status(400).json({
            msg: error.message , status:"faild to login"
        })
    }

}
//******************************************************************************** */
const registerUser = async(req,res)=>{

    try {
        const { name , email , password} = req.body ;

         // check if user exist or not 
         const exist = await userModel.findOne({ email });
        if (exist) {
                return res.status(400).json({
                    success: false,
                    msg: "User already exists"
                });
        }

        // validate data
        if(!validator.isEmail(email))
        {
            return  res.status(400).json({success:false ,msg:"its not an email"})
        }
       
        // if(!validator.isStrongPassword(password))
        // {
        //     return  res.json({success:false ,msg:"user already exist"})

        // }

        if(password.length < 8)
        {
            return  res.status(400).json({success:false ,msg:"password is weak"})
        }

        // encrypting password and save user
        const salt = await bcrypt.genSalt(10)
        const encodedPass = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password:encodedPass
        });

        const user = await newUser.save();
        const token = creatToken(user._id)

        res.status(200).json({success:true , token})

    } catch (error) {
        
        res.status(400).json({success:false ,msg:error.message})
        
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password'); // Exclude passwords
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

export { loginUser , registerUser , getAllUsers };