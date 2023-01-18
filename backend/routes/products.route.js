const express=require("express");
const {Productmodel}=require("../models/product.model");
const productRouter=express.Router();


productRouter.get("/",async (req,res)=>{
    let category=req.query.category;
    const page=(req.query.page)-1||0;
    const limit=req.query.limit||3;
    //verify token
    try {
        if(category){
            let data=await Productmodel.find({category:category})
            .skip(page*limit)
            .limit(limit);
            res.send(data);
        }else{
            let data=await Productmodel.find()
            .skip(page*limit)
            .limit(limit);
            res.send(data);
        }

    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})


productRouter.post("/create",async (req,res)=>{
       //verify token
    let payload=req.body;
    let {category}=req.body;
    try {
        // let data= await Productmodel.insertMany(payload);
        let data=new Productmodel(payload);
        await data.save();
        res.send(`Created a ${category} item`);
    } catch (error) {   
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})
module.exports={
    productRouter
}