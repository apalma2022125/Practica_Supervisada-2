const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
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
        let user = await Student.findById(uid);
        if(!user){
            user = await Teacher.findById(uid);
            if(!user){
                return res.status(400).json({
                    uid,
                    msg: "This user does not exist in the database",
                    user,
                });
            }
        }
        console.log(user);

        if(!user.estado){
            return res.status(401).json({
                msg:"Invalid token, user with false status"
            });
        }

        req.user = user;
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