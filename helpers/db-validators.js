const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Courses = require('../models/courses');
const mongoose = require('mongoose');

const existingEmail = async (email = '') =>{
    const existEmail = await Student.findOne({email});
    if(existEmail){
        throw new Error(`The email ${ email} already registered`);
    }
}


const existingStudentById = async (id ='') =>{
    const existStudent = await Student.findOne({id});
    if(existStudent){
        throw new Error(`The estudent ${id} does not exist`)
    }
}

const existingEmailTeacher  = async (email = '') => {
    const existEmailTeacher = await Teacher.findOne({email});
    if(existEmailTeacher){
        throw new Error(`The email${email} already registered`);
    }
}

const existingTeacherById = async (id = '') =>{
    const existTeacher = await Teacher.findOne({id});
    if(existTeacher){
        throw new Error(`The Teacher with the id ${id} does not exist`)
    }
}



const isCourseValid = async (courses = []) => {
    for (const coursesName of courses) {
        const courseExisting = await Courses.findOne({ coursesName });
 
        if (!courseExisting) {
            throw new Error(`El curso '${coursesName}' no existe en la base de datos`);
        }
    }
};

const DuplicateCourses = async (courses = []) => {
    const uniqueCourseSet = new Set();

    for (const course of courses) {
        if (uniqueCourseSet.has(course)) {
            throw new Error(`Duplicate course detected: ${course}`);
        }
        uniqueCourseSet.add(course);
    }
};


const maxCuorses = async (Courses = []) => {
    const maxCourses = 3;

    if (Courses.length > maxCourses) {
        throw new Error(`You can only select up to ${maxCourses} courses.`);
    }
};




module.exports = {
    existingStudentById,
    existingEmail,
    existingEmailTeacher,
    existingTeacherById,
    isCourseValid,
    DuplicateCourses,
    maxCuorses
}