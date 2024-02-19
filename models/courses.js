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

CoursesSchema.methods.toJSON = function () {
    const course = this.toObject();
    delete course.__v;
    course.Id_of_course = course._id;
    delete course._id;
    delete course.password;
    delete course.profesorId;
    return course;
};

module.exports =  model('Course',CoursesSchema);
