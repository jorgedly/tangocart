const Router = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const secret = 'GRUPO6';
const request = require('request');
//prod
const BASE_URL = "http://www.tangocart-api.ml/servicio/"
//dev
//const BASE_URL = "http://localhost:5000/servicio/"

router.get('/', (req, res) => {
    res.send('USER');
});

router.post('/signup', async (req, res) => {
    try {
        const { nombre, apellido, correo, password, tipo, tarjetas } = req.body;
        const requestOptions = {
            url: BASE_URL+'usuarios/registrarse',
            // url: 'http://localhost:5000/servicio/usuarios/registrarse',
            method: 'POST',
            json: {
                nombre,
                apellido,
                correo,
                password,
                tipo,
                tarjetas
            }
        };
        request(requestOptions, (error, response, body) => {
            if (error) {
                res.status(400).send('error');
            } else {
                res.status(200).send(body);
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { correo, password } = req.body;
        const requestOptions = {
            url: BASE_URL+'usuarios/login',
            // url: 'http://localhost:5000/servicio/usuarios/login',
            method: 'POST',
            json: {
                correo,
                password
            }
        };
        request(requestOptions, (error, response, body) => {
            if (error) {
                res.status(400).send('error');
            } else {
                const token = jwt.sign(body, secret);
                body['token'] = token;
                console.log(token)
                console.log(body)
                res.status(200).send(body);
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/compra', async (req, res) => {
    try {
        const { idUser, nombre, nit, products} = req.body;
        var cliente = req.body.cliente
        var fecha = req.body.fecha
        var estado = req.body.estado
        var total = req.body.total

        if (cliente==undefined){
            cliente={"correo":"doer.factore@gmail.com","nombre":"David"}
        }
        if (fecha==undefined){
            fecha="12/11/2021"
        }
        if(estado==undefined){
            estado="solicitado" 
        }
        if(total==undefined){
            total=100
        }
        const requestOptions = {
            url: BASE_URL + 'pedido/pedido',
            // url: 'http://localhost:5000/servicio/usuarios/login',
            method: 'POST',
            json: {
                idUser,
                nombre,
                nit,
                products,
                cliente,
                fecha,
                estado,
                total
            }
        };
        request(requestOptions, (error, response, body) => {
//            body = JSON.parse(body)
            console.log(body)
            console.log(error)
            if (error) {
                res.status(400).send('error');
            } else {
                const token = jwt.sign(body, secret);
                body['token'] = token;
                console.log(token)
                console.log(body)
                res.status(200).json(body);
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;