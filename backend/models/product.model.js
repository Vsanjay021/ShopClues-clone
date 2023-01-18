const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    img:{type:String,required:true},
    productname:{type:String,required:true},
    price:{type:String,required:true},
    old_price:{type:String,required:true},
    discount:{type:String,required:true},
    category:{type:String,required:true}
},{versionKey:false})

const Productmodel=mongoose.model("products",productSchema);

module.exports={
    Productmodel
}