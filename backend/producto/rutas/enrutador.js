const Router = require('express');
const router = Router();
const consultar = require('../utilidades/conexion');
const jwt = require('jsonwebtoken');
const guardar = require('../utilidades/subida');
const verificar = require('../utilidades/envio');

router.get('/', (req, res) => {
    res.send("ok desde pro1");
});

router.get('/productos', async (req, res) => {
    try {
        const consulta = `SELECT * FROM Producto`;
        const resultado = await consultar(consulta);
        res.send(resultado);
    } catch (error) {
        res.send(error);
    }
});

router.post('/crear/:token', async (req, res) => {
    try {
        const token = req.params.token;
        const datos = jwt.verify(token, 'GRUPO3');
        const usuario = datos['usuario'];
        const { precio, stock, nombre, descripcion, objFoto, categoria } = req.body;
        const { url_foto, url_thumbnail } = await guardar(objFoto, 'productos');
        const consulta = `INSERT INTO Producto (precio, stock, nombre, descripcion, foto, thumbnail, categoria, proveedor) VALUES (${precio}, ${stock}, '${nombre}', '${descripcion}', '${url_foto}', '${url_thumbnail}', ${categoria}, ${usuario})`;
        await consultar(consulta);
        res.send({
            status: 1,
            mensaje: 'Producto creado.'
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: 2,
            mensaje: 'Mensaje de error.'
        });
    }
});


router.put('/modificar', async (req, res) => {
    try {
        const { producto, precio, stock } = req.body;
        const consulta = `UPDATE Producto SET precio = ${precio}, stock = ${stock} WHERE producto = ${producto}`;
        await consultar(consulta);
        verificar();
        res.send({
            status: 1,
            mensaje: 'Producto modificado.'
        });
    } catch (error) {
        res.send({
            status: 2,
            mensaje: 'Mensaje de error.'
        });
    }
});

router.delete('/eliminar/:producto', async (req, res) => {
    try {
        const producto = req.params.producto;
        const consulta = `DELETE FROM Producto where producto = ${producto}`;
        await consultar(consulta);
        res.send({
            status: 1,
            mensaje: 'Producto eliminado.'
        });
    } catch (error) {
        res.send({
            status: 2,
            mensaje: 'Mensaje de error.'
        });
    }
});

router.get('/products/:token', async (req, res) => {
    try {
        const token = req.params.token;
        const datos = jwt.verify(token, 'GRUPO3');
        const usuario = datos['usuario'];
        const consulta = `select p.producto, p.precio, p.stock, p.nombre, p.descripcion, p.foto, p.thumbnail, c.nombre as categoria from producto p, categoria c where p.proveedor = ${usuario} and c.categoria = p.categoria`;
        const productos = await consultar(consulta);
        res.send(productos);
    } catch (error) {
        res.send({
            status: 2,
            mensaje: 'Mensaje de error.'
        });
    }
});

router.get('/catalogo', async (req, res) => {
    try {
        const consultaCategorias = 'SELECT * FROM Categoria';
        const categorias = await consultar(consultaCategorias);
        const completo = [];
        let consultaProductos = '';
        console.log('here')
        console.log(categorias)
        for (let i = 0; i < categorias.length; i++) {
            const datoCategoria = categorias[i];
            consultaProductos = `SELECT producto, precio, stock, nombre, descripcion, foto FROM Producto WHERE categoria = ${datoCategoria['categoria']}`;
            console.log("consultaProductos")
            console.log(consultaProductos)
            const productos = await consultar(consultaProductos);
            console.log("productos")
            console.log(productos)

            completo.push({
                nombre: datoCategoria['nombre'],
                productos: productos
            });
        }
        res.send(completo);
    } catch (error) {
        res.send({
            status: 2,
            mensaje: 'Mensaje de error.'
        });
    }
});

router.get('/catalogo/:categoria', async (req, res) => {
    try {
        const categoria = req.params.categoria;
        const consulta = `SELECT producto, precio, stock, nombre, descripcion, foto, thumbnail FROM Producto WHERE categoria = ${categoria}`;
        const productos = await consultar(consulta);
        res.send(productos);
    } catch (error) {
        res.send({
            status: 2,
            mensaje: 'Mensaje de error.'
        });
    }
});

router.get('/categorias', async (req, res) => {
    try {
        const consulta = `SELECT * FROM Categoria`;
        const categorias = await consultar(consulta);
        res.send(categorias);
    } catch (error) {
        res.send({
            status: 2,
            mensaje: 'Mensaje de error.'
        });
    }
});

router.post('/categoria', async (req, res) => {
    try {
        const { nombre } = req.body;
        const consulta = `INSERT INTO Categoria (nombre) VALUES ('${nombre}')`;
        await consultar(consulta);
        res.send({
            status: 1,
            mensaje: 'Categoría creada.'
        });
    } catch (error) {
        res.send({
            status: 2,
            mensaje: 'Mensaje de error.'
        });
    }
});

module.exports = router;