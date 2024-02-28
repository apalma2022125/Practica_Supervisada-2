const {Schema, model} = require('mongoose');

const TeacherSchema = Schema({
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    email:{
        type:String,
        required:[true, 'The email is required']
    },
    password:{
        type:String,
        required: [true, 'The password is required']
    },
    role:{
        type:String,
        default: 'TEACHER_ROLE',
    },
    estado:{
        type: Boolean,
        default: true
    }
});

TeacherSchema.methods.toJSON = function(){
    const{ __v,password, _id, ...teacher} = this.toObject();
    teacher.aId = _id;
    return teacher;
};


module.exports = model('Teacher', TeacherSchema);