const express=require("express");
const {Adminmodel}=require("../models/admin.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const adminRouter=express.Router();

adminRouter.post("/register",async (req,res)=>{
    let {name,email,password,gender}=req.body;
    console.log(req.body);
    try {
        bcrypt.hash(password,5, async (err, secure_password)=> {
            if(err){
                console.log(err);
            }else{
                const admindata=new Adminmodel({name,email,password:secure_password,gender});
                await admindata.save();
                res.send("Registered")
            }
      });
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})
adminRouter.post("/login",async (req,res)=>{
    let {email,password}=req.body;
    try {
        let admindata=await Adminmodel.find({email:email});
        if(admindata.length>0){
            bcrypt.compare(password, admindata[0].password, (err, result)=> {
                if(result){
                    const token = jwt.sign({ accesstoken:"generated" }, 'masai');
                    res.send({"msg":"login successful",token:token,"userdetails":admindata})
                }else{
                    res.send("wrong credentials");
                }
            });
        }else{
            res.send("Data not found")
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

module.exports={
    adminRouter
}