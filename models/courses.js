const {Schema, model} = require('mongoose');

const CoursesSchema = Schema({

    coursesName:{
        type: String,
        require:[true,'The name of de course is required']
    },

    description:{
        type:String,
        default: 'No description has been added'
    },
    teacherId:{
        type:String
    },
    estado:{
        type: Boolean,
        default:true
    }
});


module.exports =  model('Course',CoursesSchema);
