const Router = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const secret = 'GRUPO6';
const request = require('request');

router.get('/', (req, res) => {
    res.send('PROVIDER');
});
//Develop
//const BASE_URL = "http://localhost:5000/servicio/"
//Prod
const BASE_URL = "http://www.tangocart-api.ml/servicio/"

router.post('/newProduct', async (req, res) => {
    try {
        const { nombre, descripcion, foto, precio, stock, categorias, idProvider, id_producto, proveedor } = req.body;
 //       const { token } = req.headers;
//        const data = jwt.verify(token, secret);
        //data tiene ids y mas informacion para enviarla en json
        if(id_producto==undefined){
            id_producto = new Date().getTime().toString()
        }
        if(idProvider==undefined){
            idProvider=proveedor.id;
        }

        const requestOptions = {
            url: BASE_URL+'libro/libro',
            method: 'POST',
            json: {
                nombre,
                descripcion,
                foto,
                precio,
                stock,
                categorias,
                proveedor,
                idProvider,
                id_producto
            }
        };
        request(requestOptions, (error, response, body) => {
            if (error) {
                console.log(error)
                res.status(400).send('error');
            } else {
                res.status(200).json(body);
            }
        });
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
});

router.get('/allProducts', async (req, res) => {
    try {
        //const { token } = req.headers;
        //const data = jwt.verify(token, secret);
        //data tiene ids y mas informacion para enviarla en qs
        const requestOptions = {
            url: BASE_URL + 'libro/all_libro',
            method: 'GET',
            qs: {

            }
        };
        request(requestOptions, (error, response, body) => {
            console.log(body)
            body = JSON.parse(body)
            if (error) {
                res.status(400).json('error');
            } else {
                res.status(200).json(body);
            }
        });
    } catch (error) {
        res.status(400).json(error);
    }
});



module.exports = router;