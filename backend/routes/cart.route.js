const express=require("express");
const {Cartmodel}=require("../models/cart.model");
const cartRouter=express.Router();


cartRouter.get("/",async (req,res)=>{
    let userID_req=req.body.userID;
    let q=req.query.ID;
    let cartdata=await Cartmodel.find({userID:userID_req});
    try {
    if(q){
        let data=await Cartmodel.find({userID:userID_req,_id:q});
       res.send(data);
    }
    else{
        let data=await Cartmodel.find({userID:userID_req});
        res.send(data);
    }
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"});
    }

})
cartRouter.get("/count",async (req,res)=>{
    try {
        let data=await Cartmodel.countDocuments();
        res.send(JSON.stringify({count:data})); 
    }
    catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"});
    }

})
cartRouter.get("/quantity/:id",async (req,res)=>{
    let id=req.params.id;
    try {
        let data=await Cartmodel.findOne({_id:id})
        res.send(JSON.stringify({quantity:data.quantity})); 
    }
    catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"});
    }

})


cartRouter.post("/create",async(req,res)=>{
    let cartdata=req.body;
    try {
        let data=new Cartmodel(cartdata);
         await data.save();
         res.send(data);
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"});
    }
})
cartRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const ID=req.params.id;
    const cart=await Cartmodel.findOne({_id:ID});
    const userID_cart=cart.userID;
    const userID_req=req.body.userID;
    try {
        if(userID_cart!=userID_req){
            res.send({"msg":"You are not authorized"})
        }else{
            console.log(payload);
            let data=await Cartmodel.findByIdAndUpdate({_id:ID},payload);
            res.send({"msg":"Updated the cart","data":data});
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})
cartRouter.patch("/updateprice/:id",async(req,res)=>{
    const payload=req.body;
    const ID=req.params.id;
    const cart=await Cartmodel.findOne({_id:ID});
    const userID_cart=cart.userID;
    const userID_req=req.body.userID;
    try {
        if(userID_cart!=userID_req){
            res.send({"msg":"You are not authorized"})
        }else{
            let data=await Cartmodel.findByIdAndUpdate({_id:ID},payload);
            res.send({"msg":"Updated the cart","data":data});
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})
cartRouter.delete("/delete/:id",async(req,res)=>{
    const ID=req.params.id;
    const cart=await Cartmodel.findOne({_id:ID});
    const userID_cart=cart.userID;
    const userID_req=req.body.userID;
    try {
        if(userID_cart!=userID_req){
            res.send({"msg":"You are not authorized"})
        }
        else{
            await Cartmodel.findByIdAndDelete({_id:ID});
            res.send({"msg":"Deleted the cart"});
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})
module.exports={
    cartRouter
}
