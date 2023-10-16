const mongoose = require('mongoose')
require('dotenv').config();

const connectToMongo = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
      console.log("MongoDB connected!!");
    } catch (error) {
      console.log("Failed to connect to MongoDB", error);
    }
  };

module.exports = connectToMongo;
