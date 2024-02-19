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

const existingEmailTeacher  = async (id = '') => {
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
    for (const id of courses){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(`The id '${id}' is not valid`);
        }

        const courseExisting = await Courses.findOne({ _id: id });

        if (!courseExisting) {
            throw new Error(`The course with id:${id} does not exist in the database`);
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

const MaxCourses = async (courses = []) => {
    if (courses.length > 3) {
        throw new Error(`You can select up to 3 courses. Please remove any extra courses.`);
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
    MaxCourses,
    maxCuorses
}