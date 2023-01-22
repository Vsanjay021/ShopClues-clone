const express=require("express");
const {Usermodel}=require("../models/user.model")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const accountSid = "AC1e83d074ba09a5d47d76471601848755";
const authToken = "4b58b9fb3c812426fc6b53c93296c68e";
const serviceId='VA39ce9a89ec419166742079926c3a1886';
const client = require('twilio')(accountSid, authToken);

const userRouter=express.Router();

userRouter.post("/register",async (req,res)=>{
    let userdata=req.body;
    try {
                const data=new Usermodel(userdata);
                await data.save();
                res.send("User Registered")
      }
    catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})
userRouter.post("/login", async(req,res)=>{
    const {phonenumber}=req.body;
    try {
        let userdata=await Usermodel.find({phonenumber});
        console.log(userdata);
        // res.send(userdata)
        if(userdata.length>0){
                    client.verify.services(serviceId)
                    .verifications
                    .create({to: "+91"+ phonenumber, channel: "sms"})
                    .then(verification => {
                       if(verification.status=="pending"){
                        res.send("Otp sent")
                       }else{
                        res.send("Something went wrong");
                       }
                    })
                    // res.send("hello not gone above me")
                 }
                 else{
                     res.send("wrong phone number");
                 }
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }

})

userRouter.post("/verifyotp",async(req,res)=>{
    const {phonenumber,code}=req.body;
    let userdata=await Usermodel.findOne({phonenumber});
    try {
        client
        .verify
        .services(serviceId)
        .verificationChecks
        .create(
          {to: "+91"+phonenumber, code:code})
        .then(verification_check => {
            if(verification_check.status=="approved"){
                const token = jwt.sign({ "userID":userdata._id }, 'masai');
                res.send({"msg":"login successful","token":token,"userdetails":userdata});
            }else{
                res.send("wrong otp");
            }
        }).catch(error =>{
            res.status(400).json({error})
        });
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

// userRouter.get("/cart",(req,res)=>{
//     const token=req.query.token
//     jwt.verify(token, 'masai',(err,decoded)=>{
//             if(err){
//                 res.send("Invalid token");
//                 console.log(err);
//             }else{
//                 res.send("Cart page");
//          }
//     })
// })
module.exports={
    userRouter
}





















module.exports={
    userRouter
}