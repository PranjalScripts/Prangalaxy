import express  from "express";
import {registerController,loginController, testController, forgotPasswordController, updateProfileController, getAllOrdersController, orderStatusController, getOrdersController} from "../controllers/authController.js";
import { isAdmin, requireSIgnIn } from "../middlewares/authMIddleware.js";
import { get } from "mongoose";
 
//import { isAdmin } from "../middlewares/authMIddleware.js";
// router object
const router = express.Router();
//routing
router.post("/register",  registerController)
 
//login
router.post('/login', loginController);

//test orutes
 router.get ('/test',requireSIgnIn,isAdmin,testController)
//forgot password ||post
router.post('/forgot-password', forgotPasswordController);
 



 //protected route
 router.get('/user-auth',requireSIgnIn,(req,res)=>{
    res.status(200).send({ok:true});
 });


//protected route for admin
router.get('/admin-auth',requireSIgnIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
 });



 //update profile

 router.put('/profile',requireSIgnIn,updateProfileController);


////orders
router.get("/orders", requireSIgnIn, getOrdersController);


 // all orders

router.get('/all-orders',requireSIgnIn,isAdmin,getAllOrdersController);

     
 // order status update
router.put(
   "/order-status/:orderId",
   requireSIgnIn,
   isAdmin,
   orderStatusController
 );
 


export default  router;