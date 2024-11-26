const mongoose = require('mongoose');

    const studentSchema = new mongoose.Schema({
        name: String,
        age: Number,
        major: String,
    });

    const Student = mongoose.model('Student', studentSchema);
    module.exports = Student;