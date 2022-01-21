const mysql = require('mysql');

const conexion = mysql.createPool({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b83dc0a88c4689',
    password: 'b16e9d46',
    database: 'heroku_779fd77ef1c0300'
});

consultar = (consulta) => {
    return new Promise((resolve, reject) => {
        conexion.query(consulta, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

module.exports = consultar;