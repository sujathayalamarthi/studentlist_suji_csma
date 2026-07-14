const mongoose = require('mongoose');
const dns=require("dns")
dns.setServers(["8.8.8.8","8.8.4.4"])
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sujathayalamarthi-24:suji321@cluster0.n7izdpt.mongodb.net/"); 
    console.log('MongoDB Connected to studentDB');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDB;
