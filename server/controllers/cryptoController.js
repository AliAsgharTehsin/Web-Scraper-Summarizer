const Crypto=require("../models/Crypto.js")

const getCryptos=async(req,res)=>{
    try {
        const cryptos=await Crypto.find()
        if (cryptos.length<0){
            return res.status(200).json({message:"No cryptos available"})
        }
        res.status(200).json(cryptos)

    } catch (error) {
        console.log("Error in getCryptos controller:",error)
        res.status(500).json({message:"Internal Server Error"})
    }
}
const getCrypto=async(req,res)=>{
    try {
        const cryptoID=req.params.id
        const crypto=await Crypto.findById(cryptoID)
        if (!crypto){
            return res.status(404).json({message:"Crypto not found"})
        }
        res.status(200).json({message:"Crypto retrieved"},crypto)
    } catch (error) {
        console.log("Error in getCrypto controller:",error)
        res.status(500).json({message:"Internal Server Error"})
    }
    
}
const createCrypto=async(req,res)=>{
    try {
        const {name,summary}=req.body
        const newCrypto=new Crypto({
            name:name,
            summary:summary,
        })
        if (!newCrypto){
            return res.status(400).json({message:"Failed to create crypto"})
        }
        await newCrypto.save()
        res.status(201).json({message:"Note successfully created"},newCrypto)
    } catch (error) {
        console.log("Error in createCrypto controller:",error)
        res.status(500).json({message:"Internal Server Error"})
    }
}
const updateCrypto=async(req,res)=>{
    try {
        const cryptoID=req.params.id
        const {name,summary}=req.body
        const updatedCrypto=await Crypto.findByIdAndUpdate(cryptoID,{
            name:name,
            summary:summary
        })
        if (!updatedCrypto){
            return res.status(404).json({message:"Failed to update crypto"})
        }
        res.status(200).json({message:"Crypto successfully updated"})
    } catch (error) {
        console.log("Error in updateCrypto controller:",error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}
const deleteCrypto=async(req,res)=>{
    try {
        const cryptoID=req.params.id
        const deletedCrypto=await Crypto.findById(cryptoID)
        if (!deletedCrypto){
            return res.status(404).json({message:"Crypto not found."})
        }
        res.status(200).json({message:"Note successfully deleted"},deletedCrypto)
    } catch (error) {
        console.log("Error in deleteCrypto controller:",error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}
const getName=async(req,res)=>{
    try {
        const cryptoName=req.params.title
        const crypto=await Crypto.findOne({name:cryptoName})
        if (!crypto){
            return res.status(404).json({message:"Crypto with that name not found."})
        }
        res.status(200).json(crypto)
    } catch (error) {
        console.log("Error in getName controller:",error)
        res.status(500).json({message:"Internal Server Error"})
    }
}
module.exports={getCryptos,getCrypto,createCrypto,updateCrypto,deleteCrypto,getName}