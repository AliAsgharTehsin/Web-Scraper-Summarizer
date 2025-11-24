const express=require("express")
const cors=require("cors")
const cryptoRouter=require("./routes/cryptoRoutes")
const connectDB=require("./db.js")
const app=express()
app.use(cors())
app.use(express.json())
app.use("/api/crypto",cryptoRouter)
connectDB()
app.listen(5000,()=>{
    console.log("Server is running at port 5000");
})