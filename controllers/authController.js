import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address,answer } = req.body;
    //validations
    if (!name) {
      return res.send({  Message : "Name is Required" });
    }
    if (!email) {
      return res.send({  Message : "Email is Required" });
    }
    if (!password) {
      return res.send({  Message : "Password is Required" });
    }
    if (!phone) {
      return res.send({  Message : "Phone no is Required" });
    }
    if (!address) {
      return res.send({  Message : "Address is Required" });
    }
    if (!answer) {
      return res.send({  Message : "Answer is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      answer,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        adddress: user.address,
         role:user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgot password

 export const forgotPasswordController= async(req,res)=>{
  try{ const {email,answer,newPassword}=req.body;
  if(!email){
    return res.status(404).send({
      success:false,
      message:"Email is required"
    })
  }

  if(!answer){
    return res.status(404).send({
      success:false,
      message:"  answer is required"
    })
  }





  if(!newPassword){
    return res.status(404).send({
      success:false,
      message:" newPassword is required"
    })
  }
//check
const user = await userModel.findOne({email,answer});
//validation
if(!user){
  return res.status(404).send({
    success:false,
    message:"Invalid email or answer"
  })
}

const hashed= await hashPassword(newPassword);
await userModel.findByIdAndUpdate(user._id,{password:hashed});
res.status(200).send({
  success:true,
  message:"password changed successfully"
})

 
  }
  catch{
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in forgot password",
      error,
    });

  }

 }








//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};