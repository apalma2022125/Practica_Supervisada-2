const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, hasRoleAuthorized} =require('../middlewares')

const {
    studentPost,
    studentGet,
    getStudentById,
    putStudents,
    studentDelete} = require('../controllers/student.Controller');


const { existingEmail, existingStudentById} = require('../helpers//db-validators');

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
                validarCampos    
            ],putStudents);


     router.post(
        "/",
        [
            check("name", "The name cannot be empty").not().isEmpty(),
            check("password","Password must be longer than 6 characters").isLength({min:6}),
            check("email","Is not a valid email").isEmail(),
            check("email").custom(existingStudentById),
            validarCampos
        ], studentPost);

    router.delete(
        "/:id",
        [
            validarJWT,
            hasRoleAuthorized('STUDENT_ROLE'),
            check('id', 'Is not a valid is').isMongoId(),
            check('id').custom(existingStudentById),
            validarCampos
        ], studentDelete);     

        module.exports = router;
