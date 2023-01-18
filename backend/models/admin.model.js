const mongoose=require("mongoose");

const adminSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    gender:{type:String,required:true}
},{versionKey:false})

const Adminmodel=mongoose.model("admindata",adminSchema);

module.exports={
    Adminmodel
}