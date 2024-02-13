const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log('Base de datos conectada exitosamente');        
    } catch (e) {
        throw new Error('No se pudo conectar la base de datos por esto:',e);
    }
};

module.exports = {
    dbConnection
}