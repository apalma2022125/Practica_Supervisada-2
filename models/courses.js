const { Schema, model} = require('mongoose');

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

CoursesSchema.methods.toJSON = function(){
    const{ __v,password, _id, profesorId, ...course} = this.toObject();
    course.Id_del_course = _id;
    return course;
};

module.exports =  model('Course',CoursesSchema);
