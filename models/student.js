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
        type: [String],
        default: ['unassigned']
    }
});

module.exports = model('Student', StudentSchema);