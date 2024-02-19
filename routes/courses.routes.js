const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos, validarJWT, hasRoleAuthorized} = require('../middlewares')


const {
    courseGet,
    coursesPut,
    courseDelete,
    coursePost,
    courseGetByStudent
} = require('../controllers/course.controller');


const router = Router();

router.get(
    "/",
    [
        validarJWT,
        hasRoleAuthorized('TEACHER_ROLE'),
    ],courseGet);
    
    router.get("/showCourses", courseGetByStudent);

router.put(
    "/:id",
     [
        validarJWT,
        hasRoleAuthorized('TEACHER_ROLE'),            
        check('id', 'Is not valid id').isMongoId(),
        validarCampos
    ], coursesPut);

router.delete(
     "/:id",
    [ 
        validarJWT,
        hasRoleAuthorized('TEACHER_ROLE'),
        check('id', 'Is not valid id').isMongoId(),
        validarCampos
    ], courseDelete);

router.post(
    "/",
    [
        validarJWT,
        hasRoleAuthorized('TEACHER_ROLE'),
        check("courseName", "Course name cannot be empty").not().isEmpty(),
        validarCampos
    ],coursePost);


    module.exports = router;