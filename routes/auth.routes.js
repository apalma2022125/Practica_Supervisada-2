const { Router } = require('express');
const { check } = require('express-validator');

const {login} = require('../controllers/auth.controller');
const {validarCampos} = require('../middlewares/validar-campos')

const router = Router();

router.post(
    '/login',
    [
        check('email','This email is not valid').isEmail(),
        check('password',"the password is required").not().isEmpty(),
        validarCampos
    ],login);

    module.exports = router;