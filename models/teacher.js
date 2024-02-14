const {Schema, model} = require('mongoose');

const TeacherSchema = Schema({
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    email:{
        type:String,
        required
    }
})