const bcryptjs = require('bcryptjs');
const Teacher =require('../models/teacher');
const {response, request} = require('express');

const teacherGet = async (req, res) =>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, teachers] = await Promise.all([
        Teacher.countDocuments(query),
        Teacher.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        teachers
    });
}

    const getTeacherById = async (req = request, res = response) =>{
        const { id } = req.params;
        const teacher = await Teacher.findOne({_id : id});

        res.status(200).json({
            teacher
        });
    }

    const teacherPut = async (req, res) =>{
        const {id} = req.params;
        const {_id, email, password, role, ...resto} = req.body;

        if(password){
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password,salt);            
        }

        const updateTeacher = await Teacher.findByIdAndUpdate(id, resto, {new:true});


        res.status(202).json({
            msg: 'This teacher was update',
            updateTeacher
        });
    }

        const teacherDelete = async(req,res)=>{
            const {id} = req.params;
            const teacher = await Teacher.findByIdAndUpdate(id, {estado: false});
            const teacherAuthenticated = req.teacher;

            res.status(200).json({
                msg: 'This teacher was removed',
                teacher,
                teacherAuthenticated
            });
        }


        const teacherPost = async (req, res) =>{
            const {name, email, password} = req.body;
            const teacher = new Teacher({name, email, password});

            const salt = bcryptjs.genSaltSync();
            teacher.password = bcryptjs.hashSync(password, salt);

            await teacher.save();
            res.status(202).json({
                teacher
            });
        }


        module.exports = {
            teacherGet,
            getTeacherById,
            teacherPut,
            teacherDelete,
            teacherPost
        }
    
