import adminModel from "../models/adminModel.js";
import validator from "validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const creatAdminToken = (admin) => {
  return jwt.sign({ admin, role: "admin" }, process.env.JWT_SECRET);
};

const loginAdmin = async (req, res) => {
  try 
  {
    const { email, password } = req.body;
    // check if admin exist or not
    const admin = await adminModel.findOne({ email });
    if (admin) {
      const validPass = await bcrypt.compare(password, admin.password);
      if (validPass) {
        var token = creatAdminToken(admin);
        return res.status(200).json({ success: true, token });
      } else 
        {
        return res.status(400).json({
          success: false,
          msg: "Wrong username or password",
        });
      }
    } 
    else 
      {
      return res.status(500).json({
        success: false,
        msg: "Email doesn't exist",
      });
    }
  }
   catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
      status: "faild to login",
    });
  }
};

const registerAdmin = async (req, res) => {
  try 
  {
    const { userName , email, password } = req.body;

    // check if admin exist or not
    const exist = await adminModel.findOne({ email });
    if (exist) {
      return res.status(400).json({
        success: false,
        msg: "Admin already exists",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid email",
      });
    }

     // encrypting password and save user
    const salt = await bcrypt.genSalt(10)
    const encodedPass = await bcrypt.hash(password, salt)
    
    // create new admin
    const newAdmin = new adminModel({
      userName,
      email,
      password: encodedPass,
    });

    const admin = await newAdmin.save();
    res.status(200).json({ success: true, admin });
  } 
  catch (error) 
  {
    res.status(400).json({
      success: false,
      msg: error.message,
      status: "faild to register",
    });
  }
  res.json({ msg: "registerAdmin api" })
};
export { loginAdmin, registerAdmin };


// validation of email and password
    // if(!validator.isStrongPassword(password))
    // {
    //     return res.status(400).json({
    //         success:false ,
    //         msg:"Password must be at least 6 characters long"
    //     })
    // }