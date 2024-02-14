const express = require('express') ;
const cors = require('cors');
const {dbConnection} = require("../db/config");

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.studentPath = '/api/students';
        this.authPath = '/api/auth'

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
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server is running on port:', this.port)
        });
    }
}

module.exports = Server;