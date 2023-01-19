// CONFIGURACION PARA CONECTARSE A LA DB VIA MONGOOSE USANDO DOTENV

const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

const dbConection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_ATLAS)

        console.log('Arriba la DB kraken');

    } catch (error) {

        console.log(error);
        throw new Error('Explota la DB chabon, cual te mandaste');
    }

}

module.exports = {
    dbConection
}