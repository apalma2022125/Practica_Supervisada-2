const Student = require('../models/student')
const Teacher = require('../models/teacher');

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

module.exports = {
    existingStudentById,
    existingEmail
}