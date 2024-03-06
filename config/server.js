'use strict'


import express from 'express';
import cors from'cors';
import { dbConnection } from './config.js';
import userRoutes from '../src/users/usuarioRegister.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import adminRoutes from '../src/admin/administradorRegister.routes.js';
import categoriaRoutes from '../src/categoria/categoria.routes.js';
import productoRoutes from '../src/producto/producto.routes.js';


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioRegisterPath = '/MercadoEnLinea/v1/usuarioRegister';
        this.administradorRegisterPath = '/MercadoEnLinea/v1/administradorRegister';
        this.loginPath = '/MercadoEnLinea/v1/auth';
        this.categoriaPath =  '/MercadoEnLinea/v1/categoria'
        this.productoPath = '/MercadoEnLinea/v1/producto'

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
        this.app.use(this.usuarioRegisterPath, userRoutes );
        this.app.use(this.administradorRegisterPath, adminRoutes);
        this.app.use(this.loginPath, authRoutes);
        this.app.use(this.categoriaPath, categoriaRoutes);
        this.app.use(this.productoPath, productoRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor ejecutandose y escuchando el puerto', this.port)
        });
    };
}
export default  Server;