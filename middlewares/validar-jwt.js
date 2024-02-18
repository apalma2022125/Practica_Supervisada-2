const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const {request, response} = require('express');

const validarJWT= async(req = request, res= response, next)=>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:"No token in the request"
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const student = await Student.findById(uid);
        if(!student){
            return res.status(401).json({
                msg: "The student is not exist in the database",
                student
            });
        }

        if(!student.estado){
            return res.status(401).json({
                msg:"Invalid token, student with false status"
            });
        }

        req.student = student;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg:"Invalid Token"
        });
    }
}

module.exports = {
    validarJWT
}