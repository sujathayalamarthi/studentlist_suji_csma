const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id: Number, name: String, photo: String, reg: String, branch: String,
  dob: String, bloodGroup: String, gender: String, grade: String, section: String, 
  CGPA: String, status: String, fatherName: String, motherName: String, 
  phone: String, email: String, address: String
});

module.exports = mongoose.model('Student', studentSchema);