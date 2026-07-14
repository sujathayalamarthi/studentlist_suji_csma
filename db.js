const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/studentDB'); 
    console.log('MongoDB Connected to studentDB');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

module.exports = connectDB;