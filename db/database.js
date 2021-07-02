const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DATABASE_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
