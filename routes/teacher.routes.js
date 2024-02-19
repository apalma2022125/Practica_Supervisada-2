const { Router } = require('express');
const { check } = require('express-validator');

const {validarCampos, validarJWT, hasRoleAuthorized} =require('../middlewares')

const {existingEmailTeacher, existingTeacherById, DuplicateCourses,} = require('../helpers/db-validators')

const{
    teacherPost,
    teacherGet,
    getTeacherById,
    teacherPut,
    teacherDelete
} = require('../controllers/teacher.controller');

const router = Router();

router.get("/",teacherGet)

router.get(
    "/:id",
[
    check('id', 'is not a valid id').isMongoId(),
    check('id').custom(existingTeacherById),
    validarCampos
],getTeacherById);

router.put(
    "/:id",
    [
        validarJWT,
        hasRoleAuthorized,
        check('id', 'no is a valid id').isMongoId(),
        check('id').custom(existingTeacherById),
        validarCampos
    ],teacherPut);


router.delete(

    "/:id",
    [
        validarJWT,
        hasRoleAuthorized,
        check('id', 'is not a valid id').isMongoId(),
        check('id').custom(existingTeacherById),
        validarCampos
    ], teacherDelete);

router.post(
    "/",
    [
        check("name","The name cannot be empty").not().isEmpty(),
        check("password","The password cannot be empty" ).not().isEmpty(),
        check("password", "Password must be greater than 6 characters").isLength({min:6}),
        check("email","The email cannot be empty"),
        check("email").custom(existingEmailTeacher),
        check("courses").custom(DuplicateCourses),
        validarCampos
    ],teacherPost);


module.exports = router;