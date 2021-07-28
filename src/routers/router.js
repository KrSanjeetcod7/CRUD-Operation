const express = require('express');
const router = new express.Router();
const Student = require('../models/students');

router.get('/', (req, res) =>{
    res.send('Home page');
});

//create students by Postman
//By promises in javascript
// router.post('/students', (req, res) =>{
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(() =>{
//       res.status(201).send(user);
//     }).catch((err) =>{
//         console.log(err);
//         res.status(400).send("Not Registered");
//     });
// });

//Read the students from Database
router.get('/students', async (req, res) =>{
     try {
         const readStudents = await Student.find();
         res.status(200).send(readStudents); 
     } catch (error) {
         console.log(error);
         res.status(400).send('No data found');
     }
});

//Get individual data of a Student
router.get('/students/:id', async (req, res) =>{
     try {
         const _id = req.params.id;
         console.log(_id);
         const getIndividual = await Student.findById(_id);
         res.status(200).send(getIndividual); 
     } catch (error) {
         console.log(error);
         res.status(500).send('No data found');
     }
});

// create students by Postman
//By async-await
router.post('/students', async (req, res) =>{
    try {
         console.log(req.body);
         const user = new Student(req.body);
         const Registered = await user.save();
         res.status(201).send(Registered);
     } catch (error) {
        console.log(error);
        res.status(400).send("Not Registered");
    }

});

// Update the Students by id
router.patch('/students/:id', async (req, res) =>{
    try {
        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate({_id : _id}, req.body,{
            new:true
        });
        res.status(200).send(updateStudents);
    } catch (error) {
        console.log(error);
        res.status(404).send('Not Updated');
    }
});

//Delete the Students by ID:
router.delete('/students/:id', async (req, res) =>{
    try {
        // const id = req.params.id;
        const deleteStudent= await Student.findByIdAndDelete(req.params.id);
        // if(!req.params.id){
           res.status(200).send(deleteStudent);
        // }else{
        //     res.status(200).send(deleteStudent);
        // }
    } catch (error) {
        // console.log(error);
        res.status(500).send('Not deleted');
    }
});

module.exports = router;