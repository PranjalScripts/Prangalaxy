import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
//protect routes token based
export const requireSIgnIn = async (req, res, next) => {
    try{
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
req.user =  decode;
        next();
    }
    catch(err){
        console.log(err);
      
        }
    }
//admin acess
export const isAdmin = async (req, res, next) => {
    try{
        const user = await userModel.findById(req.user._id);
if(user.role!==1){
    return res.status(401).send({
        succes:false,
        message:"unauthorized access"
    })
    }
    else{
        next();
    }

}
    catch(err){
        console.log(err);
        res.status(401).send({
            success:false,
            message:" error  in  admin acess"
        })
      
        }
}