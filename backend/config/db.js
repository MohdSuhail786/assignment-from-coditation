const mongoose = require('mongoose')
require('dotenv').config()

exports.connectToMongoDB = async ()=> {
  try {
    mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.k4adx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connected to MongoDB...")
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}