const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioRegister = '/api/usuarioRegister';
        this.administradorRegister = '/api/administradorRegister';

        this.conectarDB();
        this.middlware();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlware(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.usuarioRegister, require('../routers/usuarioRegister.routes'));
        this.app.use(this.administradorRegister, require('../routers/administradorRegister.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutandose y escuchando el puerto', this.port)
        });
    };
}

module.exports = Server;