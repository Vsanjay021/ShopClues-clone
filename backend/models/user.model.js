const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phonenumber:{type:String,required:true}
},{versionKey:false})

const Usermodel=mongoose.model("userdata",userSchema);

module.exports={
    Usermodel
}