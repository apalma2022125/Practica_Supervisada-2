const {Schema, model} = require('mongoose');

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

TeacherSchema.methods.toJSON = function () {
    const teacher = this.toObject();
    delete teacher.__v;
    teacher.pId = teacher._id;
    delete teacher._id;
    delete teacher.password;
    return teacher;
};


module.exports = model('Teacher', TeacherSchema);