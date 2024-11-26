    const express = require('express');
    const mongoose = require('mongoose');
    const Student = require('./models/Student');
    const app = express();
    const port = 3000;

    // Middleware to parse JSON
    app.use(express.json());

    // Use your actual MongoDB Atlas connection string from the existing cluster
    // const mongoUri = 'mongodb+srv://user1:user1@dravya01.ioeeo.mongodb.net/mydb?retryWrites=true&w=majority&appName=Dravya01';
       const mongoUri = 'mongodb+srv://user1:user1@dravya01.ioeeo.mongodb.net/mydb?retryWrites=true&w=majority';

    mongoose.connect(mongoUri)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log(err));



        

        app.post('/students', async (req, res) => {
            const student = new Student(req.body);
            try {
                const savedStudent = await student.save();
                res.status(201).json(savedStudent);
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    
        // Read all students
        app.get('/students', async (req, res) => {
            try {
                const students = await Student.find();
                res.json(students);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });
    
        // Update a student by ID
        app.put('/students/:id', async (req, res) => {
            try {
                const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
                res.json(student);
            } catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    
        // Delete a student by ID
        app.delete('/students/:id', async (req, res) => {
            try {
                const student = await Student.findByIdAndDelete(req.params.id);
                res.json(student);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        });

    // Start server
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
