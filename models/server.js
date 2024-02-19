const express = require('express') ;
const cors = require('cors');
const {dbConnection} = require("../db/config");

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.studentPath = '/api/students';
        this.teacherPath = '/api/teacher';
        this.authPath = '/api/auth';
        this.coursePath = '/api/course';

        this.conectarDB();
        this.middlewares();
        this.routes();    
    }

    async conectarDB(){
        await dbConnection();
    }


    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.studentPath, require('../routes/student.routers'));
        this.app.use(this.teacherPath, require('../routes/teacher.routes'))
        this.app.use(this.coursePath, require('../routes/courses.routes'))
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server is running on port:', this.port)
        });
    }
}

module.exports = Server;