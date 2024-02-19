const {request, response} = require("express");
const Student = require("../models/student");
const Teacher = require('../models/teacher');
const bcryptjs= require('bcryptjs')
const { generarJWT } = require("../helpers/generar-jwt");


const login = async (req = request, res = response) =>{
    const {email, password} = req.body;

    try {
        let user = await Student.findOne({email});

        if(!user){
            user = await Teacher.findOne({email});
            if (!user){
                return res.status(400).json({
                  msg: "Incorrect credentials, mail does not exist in the database."
                });
            }
        }

        if(!user.estado){
            return res.status(400).json({
                msg:"The student is not exist in tha database"
            });
        }

        const validarPassword = bcryptjs.compareSync(password, user.password);
        if(!validarPassword){
            return res.status(400).json({
                msg: "Invalid password"
            });
        }

        const token = await generarJWT(user.id);

        res.status(200).json({
            msg: "Welcome",
            user,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg:"Contact the administrator"            
        });
    };
};

module.exports = {
    login
}
