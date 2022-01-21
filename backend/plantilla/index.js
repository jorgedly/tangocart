'use strict';
require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 5000;
const cors = require('cors');
const contexto = '/plantilla';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ extended: true, limit: '10mb' }));

app.use(contexto, require('./src/routes/ejemplo') );

app.listen(port, function() {
    console.log('Servidor corriendo en el puerto ' + port);
});