const {request, response} = require("express");
const Student = require("../models/student");
const bcryptjs= require('bcryptjs')
const { generarJWT } = require("../helpers/generar-jwt");


const login = async (req = request, res = response) =>{
    const {email, password} = req.body;

    try {
        const student = await Student.findOne({email});

        if(!student){
            return res.status(400).json({
                msg: "Incorrect credentials, mail does not exist in the database."
            });
        }

        if(!student.estado){
            return res.status(400).json({
                msg:"The student is not exist in tha database"
            });
        }

        const validarPassword = bcryptjs.compareSync(password, student.password);
        if(!validarPassword){
            return res.status(400).json({
                msg: "Invalid password"
            })
        }

        const token = await generarJWT(student.id);

        res.status(200).json({
            msg: "Welcome",
            student,
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
