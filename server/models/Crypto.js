const mongoose=require("mongoose")

const cryptoSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    }
},{timestamps:true})
const Crypto=mongoose.model("Crypto",cryptoSchema);
module.exports=Crypto