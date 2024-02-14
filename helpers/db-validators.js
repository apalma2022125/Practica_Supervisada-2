const Student = require('../models/student')

const existenteEmail = async (email = '') =>{
    const existenteEmail = await Student.findOne({email});
    if(existenteEmail){
        throw new Error(`The email ${ email} is not exist in database`);
    }
}


const existenteStudentById = async (id ='') =>{
    const existenteStudent = await Student.findOne({id});
    if(existenteStudent){
        throw new Error(`The estudent ${id} is not exist`)
    }
}

module.exports = {
    existenteStudentById,
    existenteEmail
}