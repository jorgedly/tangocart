const Router = require('express');
const router = Router();
const consultar = require('../utilidades/conexion');
const jwt = require('jsonwebtoken');
const guardar = require('../utilidades/subida');

router.get('/', (req, res) => {
    res.send("ok desde usu2");
});

router.get('/usuarios', async (req, res) => {
    try {
        const consulta = 'SELECT * FROM Usuario';
        const resultado = await consultar(consulta);
        res.send(resultado);
    } catch (error) {
        res.send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body;
        let contra = password;
        const consulta = `SELECT * FROM Usuario WHERE correo = '${correo}' AND password = '${contra}'`;
        const resultado = await consultar(consulta);
        if (Array.isArray(resultado) && resultado.length === 1) {
            const usuario = resultado[0]['usuario'];
            const tipo = resultado[0]['tipo'];
            res.send({
                status: 1,
                token: jwt.sign({ usuario, tipo }, 'GRUPO3')
            });
        } else {
            res.send({
                status: 2,
                mensaje: 'Mensaje de error.'
            });
        }
    } catch (error) {
        res.send({
            status: 2,
            mensaje: 'Mensaje de error.'
        });
    }
});

router.post('/registrar', async (req, res) => {
    try {
        const { nombre, apellido, correo, password, objFoto, tipo } = req.body;
        const { url_foto, url_thumbnail } = await guardar(objFoto, 'usuarios');
        const consulta = `INSERT INTO Usuario (nombre, apellido, correo, password, foto, thumbnail, tipo) VALUES ('${nombre}', '${apellido}', '${correo}', '${password}', '${url_foto}', '${url_thumbnail}', '${tipo}')`;
        await consultar(consulta);
        res.send({
            status: 1,
            mensaje: 'Registro exitoso.'
        });
    } catch (error) {
        res.send({
            status: 2,
            mensaje: 'Mensaje de error.'
        });
    }
});

router.get('/perfil/:token', async (req, res) => {
    try {
        const token = req.params.token;
        const datos = jwt.verify(token, 'GRUPO3');
        const usuario = datos['usuario'];
        const consulta = `SELECT nombre, apellido, correo, password, foto, thumbnail, tipo FROM Usuario WHERE usuario = ${usuario}`;
        const resultado = await consultar(consulta);
        if (resultado instanceof Array && resultado.length === 1) {
            res.send(resultado[0]);
        } else {
            res.send({
                status: 2,
                mensaje: 'Mensaje de error.'
            });
        }
    } catch (error) {
        res.send({
            status: 2,
            mensaje: 'Mensaje de error.'
        });
    }
});

module.exports = router;