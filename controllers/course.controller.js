const Course = require('../models/courses')
const Student = require('../models/student');
const jwt = require('jsonwebtoken');

const {res = respose, req = request} = require('express');


const courseGet = async (req, res) =>{
    const {limite, desde } = req.query;
    const token = req.header('x-token');

    try{
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const query = {estado: true, teacherId: uid};
        const [total, courses] = await Promise.all([
            Course.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            courses,
            msg: 'Id of the logged in teacher', id
        });
    } catch(e){
        res.status(400).json({
            msgg: 'Error displaying courses'
        });
    }
};

const courseGetByStudent = async(req, res) =>{
    const {limite, desde} = req.query;


    try {
        const query = {estado: true};

        const [total, courses] = await Promise.all([
            Course.countDocuments(query),
            Course.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            courses,
        });

    } catch (e) {
        res.status(400).json({
            msg: 'Error displaying courses'

        });
    }
};

const coursesPut = async (req, res) =>{
    const {id} = req.params;
    const {_id, teacherId, ...resto} = req.body;
    const courseUpdate = await Course.findByIdAndUpdate(id,resto, {new:true});

    try {
        await updateCoursesByStudent(id, courseUpdate._id);
    } catch (e) {
        console.error('Error updating the course', error);
    }

    res.status(202).json({
        msg: 'This course was updated',
        courseUpdate
    });
}

const courseDelete = async(req,res) =>{
    const {id} = req.params;
    const course = await Course.findByIdAndUpdate(id,{estado: false});
    const courseAuthenticated = req.teacher;
    res.status(200).json({
        msg: 'this course was removed',
        course,
        courseAuthenticated
    });

}

const coursePost = async (req, res) =>{
    const token = req.header('x-token');

    const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
    const {CourseName, description}= req.body;
    const course = new Course({CourseName, description, teacherId: uid});

    await course.save();
    res.status(202).json({
        uid,
        course
    });

}


module.exports = {
    courseGet,
    courseGetByStudent,
    coursesPut,
    courseDelete,
    coursePost
}