const mongoose = require('mongoose');
const uri = "mongodb+srv://AliAsgharTehsin:34YRxTZTpBrL7hc5@cluster0.91bt2bq.mongodb.net/?appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function connectDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(error) {
    // Ensures that the client will close when you finish/error
    console.log("MongoDB connection failed:",error);
  }
}
module.exports=connectDB
