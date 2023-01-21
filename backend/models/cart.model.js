const mongoose=require("mongoose");

const cartSchema=mongoose.Schema({
    img:{type:String,required:true},
    productname:{type:String,required:true},
    price:{type:String,required:true},
    old_price:{type:String,required:true},
    discount:{type:String,required:true},
    category:{type:String,required:true},
    userID:{type:String},
    quantity:{type:Number,required:true}
},{versionKey:false})


const Cartmodel=mongoose.model("cartitems",cartSchema);

module.exports={
    Cartmodel
}