const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') =>{
    return new Promise ((resolve, reject) =>{
        const playload = {uid,};
        jwt.sign(
            playload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '3h',
            },
            (err,token)=>{
                err ? (console.log(err),reject('No token can be generated')): resolve(token);
            }
        );
    });
};

module.exports = {
    generarJWT
}
