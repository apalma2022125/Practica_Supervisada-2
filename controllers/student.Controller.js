const bcryptjs = require('bcrypt');
const Student = require('../models/student');
const {response} = require('express');

const studentGet = async (req, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, students] = await Promise.all([
        Student.countDocuments (query),
        Student.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        students
    });
}

    const getStudentById = async (req, res) =>{
        const {id} = req.params;
        const student= await Student.findOne({_id: id});

        res.status(200).json({
            student
        });
    }

    const putStudents = async (req, res = response) =>{
    const {id} = req.params;
    const {_id, password,email, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const student = await Student.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'The student has been successfully upgraded',
        student
    });
}

const studentDelete = async (req, res) =>{
    const {id} = req.params;
    const student = await Student.findByIdAndUpdate(id, {estado:false});

    res.status(200).json({
        msg: 'The student has been successfully removed',
        student
    });
}

const studentPost = async (req, res) => {
    const {name, email, password, role} = req.body;
    const student = new Student({name, email, password, role});

    const salt = bcryptjs.genSaltSync();
    student.password = bcryptjs.hashSync(password,salt);

    await student.save();
    res.status(202).json({
        student
    });
}

module.exports = {

    studentPost,
    studentGet,
    getStudentById,
    putStudents,
    studentDelete    
}


