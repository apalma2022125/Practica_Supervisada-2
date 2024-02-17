const {Schema, model} = require('mongoose');
const { boolean } = require('webidl-conversions');

const TeacherSchema = Schema({
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    email:{
        type:String,
        required:[true, 'The email is required'],
    },
    password:{
        type:String,
        required: [true, 'The password is required']
    },
    role:{
        type:String,
        enum: "TEACHER_ROLE",
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Teacher', TeacherSchema);