const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos} =require('../middlewares/validar-campos')

const {
    studentPost,
    studentGet,
    getStudentById,
    putStudents,
    studentDelete} = require('../controllers/student.Controller');


    const { existenteEmail, existenteStudentById} = require('../helpers/db-validators');

    const router = Router();

    router.get("/", studentGet);

    router.get(
        "/:id",
        [
            check('id', 'Is not a valid id').isMongoId(),
            check('id').custom(existenteStudentById),
            validarCampos
        ], getStudentById);

    router.put(
            "/:id",
            [
                check('id', "Is not a valid id"),
                check('id').custom(existenteStudentById),
                validarCampos    
            ],putStudents);


     router.post(
        "/",
        [
            check("name", "The name cannot be empty").not().isEmpty(),
            check("password","Password must be longer than 6 characters").isLength({min:6}),
            check("email","Is not a valid email").isEmail(),
            check("email").custom(existenteEmail),
            validarCampos
        ], studentPost);

    router.delete(
        "/:id",
        [
            check('id', 'Is not a valid is').isMongoId(),
            check('id').custom(existenteStudentById),
            validarCampos
        ], studentDelete);     

        module.exports = router;
