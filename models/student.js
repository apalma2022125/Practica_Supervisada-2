const {Schema, model} = require('mongoose');

const StudentSchema = Schema({
    name:{
        type: String,
        required: [true, 'The name is required']
    },
    email:{
        type:String,
        required: [true, 'The email is required'],
        unique: true
    },
    password:{
        type:String,
        required: [true, 'The password id required']
    },
    role:{
        type: String,
        require: true,
        default: "STUDENT_ROLE",
        inmutable: true
    },
    estado:{
        type:String,
        default: true
    }
});

module.exports = model('Student', StudentSchema);