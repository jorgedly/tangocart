//Uso del modo estricto especificado en ecmascript5 
'use strict';
//Paquete para el envio de variables de sesion 
require('dotenv').config();
//Analice los cuerpos de las solicitudes entrantes en un middleware antes que sus controladores
var bodyParser = require('body-parser');
//Paquete npm para mostrar informacion de las solicitudes http 
var logger = require('morgan');
//Paquete npm para levantar el servidor 
const express = require('express');
//Puerto de coneccion usado en dockerfile
const port = process.env.PORT || 5000;
//Paquete para manejo de directorios internos del servidor 
const path = require('path');
//obvio o no? 
const cors = require('cors');

//Inicializacion de la instancia de express 
const app = express();

//Lineas extras de configuracion 
app.use(logger('dev')); 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({limit: '700mb'}));

//Direccion de las apis 
//mias jajajaja 
//agrego un prefijo para que funcione el endpoint '/servicio/'
app.use('/servicio/prueba', require('./src/routes/ejemplo') );
app.use('/servicio/usuarios', require('./src/routes/rusuarios')); 
app.use('/servicio/generos', require('./src/routes/rgenero'));
app.use('/servicio/libro',require('./src/routes/libro'));
app.use('/servicio/pedido',require('./src/routes/pedido'));

//Levantado del servidor 
app.listen(port, function() {
    console.log('Servidor corriendo en el puerto ' + port);
});
