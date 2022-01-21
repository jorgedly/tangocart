const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const cors = require('cors');
const user = require('./routes/user');
const provider = require('./routes/provider');
const index = require('./routes/index');
const morgan = require('morgan');

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));
//app.use(context, router);
app.use('/', index);
app.use('/api/users', user);
app.use('/api/providers', provider);

app.listen(port, async () => {
    console.log(`Escuchando en puerto ${port}`);
    //const conn = require('./utilidades/connection');
    //await conn.main();
});