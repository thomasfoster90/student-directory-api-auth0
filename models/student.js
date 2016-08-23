const mongoose = require('mongoose');

const studentSchema = {
  firstName: String,
  lastName: String,
  salary: Number,
  bonusPoints: { type: Number, default: 1000 }
}

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
