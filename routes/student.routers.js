const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, hasRoleAuthorized} =require('../middlewares')

const {
    studentPost,
    studentGet,
    getStudentById,
    putStudents,
    studentDelete} = require('../controllers/student.Controller');


const { existingEmail, existingStudentById, isCourseValid,MaxCourses,DuplicateCourses, maxCuorses} = require('../helpers//db-validators');

    const router = Router();

    router.get("/", studentGet);

    router.get(
        "/:id",
        [
            check('id', 'Is not a valid id').isMongoId(),
            check('id').custom(existingStudentById),
            validarCampos
        ], getStudentById);

    router.put(
            "/:id",
            [
                validarJWT,
                hasRoleAuthorized('STUDENT_ROLE'),
                check('id', "Is not a valid id").isMongoId(),
                check('id').custom(existingStudentById), 
                check("courses").custom(isCourseValid), 
                check("courses").custom(maxCuorses),           
                check("courses").custom(DuplicateCourses),                                  
                validarCampos    
            ],putStudents);


    router.delete(
        "/:id",
        [
            validarJWT,
            hasRoleAuthorized('STUDENT_ROLE'),
            check('id', 'Is not a valid is').isMongoId(),
            check('id').custom(existingStudentById),
            validarCampos
        ], studentDelete);     

    router.post(
         "/",
        [
            check("name", "The name cannot be empty").not().isEmpty(),
            check("password","Password must be longer than 6 characters").isLength({min:6}),
            check("password", "Password cannot be empty").not().isEmpty(),
            check("email", "email cannot be empty"),
            check("email","Is not a valid email").isEmail(),
            check("email").custom(existingEmail),            
            check("courses").custom(maxCuorses),
            check("courses").custom(DuplicateCourses),
            check("courses").custom(isCourseValid),
            validarCampos
        ], studentPost);

    module.exports = router;
