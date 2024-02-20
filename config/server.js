'use strict'


import express from 'express';
import cors from'cors';
import { dbConnection } from './config.js';
import userRoutes from '../src/users/usuarioRegister.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import adminRoutes from '../src/admin/administradorRegister.routes.js';

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioRegister = '/api/usuarioRegister';
        this.administradorRegister = '/api/administradorRegister';
        this.login = '/api/auth'

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
        this.app.use(this.usuarioRegister, userRoutes );
        this.app.use(this.administradorRegister, adminRoutes);
        this.app.use(this.login, authRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutandose y escuchando el puerto', this.port)
        });
    };
}
export default  Server;