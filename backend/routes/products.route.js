const express=require("express");
const {Productmodel}=require("../models/product.model");
const productRouter=express.Router();


productRouter.get("/",async (req,res)=>{
    let category=req.query.category;
    let ID=req.query.Id;
    const page=(req.query.page)-1||0;
    const limit=req.query.limit||3;
    //verify token
    try {
        if(category || ID){
            if(category){
                let data=await Productmodel.find({category:category})
                res.send(data);
            }
            if(ID){
                let data=await Productmodel.findOne({_id:ID})
                res.send(data);
            }  
        }
        else{
            let data=await Productmodel.find()
            // .skip(page*limit)
            // .limit(limit);
            res.send(data);
        }

    } catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"})
    }
})

productRouter.get("/count",async (req,res)=>{
    try {
        let data=await Productmodel.countDocuments();
        res.send(JSON.stringify({count:data})); 
    }
    catch (error) {
        console.log(error);
        res.send({"msg":"Something went wrong"});
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
productRouter.delete("/delete/:id",async (req,res)=>{
    //verify token
 let payload=req.params.id
 try {
    await Productmodel.findByIdAndDelete({_id:payload});
    res.send({"msg":"Item.deleted"});
 } catch (error) {   
     console.log(error);
     res.send({"msg":"Something went wrong"})
 }
})
productRouter.patch("/update/:id",async (req,res)=>{
    //verify token
 let payload=req.params.id;
 let data=req.body;
 try {
    await Productmodel.findByIdAndUpdate({_id:payload},data);
    res.send({"msg":"Item updated"});
 } catch (error) {   
     console.log(error);
     res.send({"msg":"Something went wrong"})
 }
})
module.exports={
    productRouter
}