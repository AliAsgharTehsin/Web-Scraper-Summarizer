const {getCrypto,getCryptos,createCrypto,updateCrypto,deleteCrypto,getName}=require("../controllers/cryptoController.js")
const express=require("express")
const router=express.Router()

router.get("/",getCryptos)
router.get("/:id",getCrypto)
router.post("/",createCrypto)
router.put("/:id",updateCrypto)
router.delete("/:id",deleteCrypto)
router.get("/title/:title",getName)

module.exports=router