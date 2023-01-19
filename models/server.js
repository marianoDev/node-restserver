// MODELO PARA EL SERVER

const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath     = '/api/auth';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConection();
    }

    middlewares() { // funciones que me ayudan a conectar distintas partes de mi app.
        this.app.use( cors() );

        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server corriendo en el puerto:', this.port );
        });
    }

}

module.exports = Server;
