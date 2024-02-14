    const {response, request} = require("express");

    const esTEACHERROLE = (req, res, next) =>{
        if(!req.student){
            return res.status(500).json({
                msg: "You want to validate a user without validating token first"
            });
        }

        const {role, nombre} = req.student;

        if(role !== "TEACHER_ROLE"){
            return res.status(401).json({
                msg: `${nombre} you are not a Teacher, you cannot use this endpoint`
            });
        };
        next();
    }

    const tieneRolAutorizado = (...roles) =>{
        return (req=request, res =response, next) =>{
            if (!req.student){
                return res.status(500).json({
                    msg: "You want to validate a student without validating token first"
                });
            }
            
            if(!roles.includes(req.student.role)){
                return res.status(401).json({
                    msg: `The service requires one of the following authorized roles ${roles}`
                });
            }
            next();
        }
    }


    module.exports = {
        esTEACHERROLE,
        tieneRolAutorizado
    }