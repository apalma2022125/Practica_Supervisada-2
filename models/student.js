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
        default: "STUDENT_ROLE",
    },
    estado:{
        type:Boolean,
        default: true
    },
    courses:{
        type: [Schema.Types.ObjectId],
        ref: 'Courses',
        default: ['unassigned']
    }
});

StudentSchema.methods.toJSON = function () {
    const student = this.toObject();
    delete student.__v;
    student.aId = student._id;
    delete student._id;
    delete student.password;
    return student;
};


module.exports = model('Student', StudentSchema);