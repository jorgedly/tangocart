const mongoConnection = require('../connection/connection');

const get_libros = (req, res) => {
    const collection = mongoConnection.db('SADB').collection("libro");
    collection.find({
        "eliminado": false
    }, {
        projection: {
            "foto": 1,
            "nombre": 1,
            "precio": 1,
            "stock": 1,
            "categorias": 1,
            "proveedor": 1
        }
    }).toArray(function (err, docs) {
        enviar = docs.filter(doc => doc.stock > 0);
        res.json(enviar);
        return;
    });

}

const post_pedido = (req, res) => {
    var arr = {};

    // var todoOk = req.body["direccion"] != undefined &&
    //     req.body["departamento"] != undefined &&
    //     req.body["codigoPostal"] != undefined &&
    //     req.body["numeroTarjeta"] != undefined &&
    //     req.body["fechaVencimiento"] != undefined &&
    //     req.body["ccv"] != undefined &&
    //     req.body["total"] != undefined &&
    //     req.body["cliente"] != undefined &&
    //     req.body["fecha"] != undefined &&
    //     req.body["estado"] != undefined &&
    //     req.body["productos"] != undefined;


    // if (!todoOk) {
    //     res.status(400).json({
    //         "Error": "faltan datos importantes",
    //         "ejemplo json correcto": {
    //             "direccion": "esta",
    //             "departamento": "Huehuetenango... ese no burro",
    //             "codigoPostal": 10407,
    //             "numeroTarjeta": 13039423,
    //             "fechaVencimiento": "01/04/1997",
    //             "ccv": 104,
    //             "total": 104.29,
    //             "productos": "direccion",
    //             "cliente": {},
    //             "fecha": "01/01/2021",
    //             "estado": "solicitado",
    //         }
    //     });
    //     return;
    // }

    // var arr = {
    //     "direccion": req.body["direccion"],
    //     "departamento": req.body["departamento"],
    //     "codigoPostal": req.body["codigoPostal"],
    //     "numeroTarjeta": req.body["numeroTarjeta"],
    //     "fechaVencimiento": req.body["fechaVencimiento"],
    //     "ccv": req.body["ccv"],
    //     "total": req.body["total"],
    //     "productos": req.body["productos"],
    //     "cliente": req.body["cliente"],
    //     "fecha": req.body["fecha"],
    //     "estado": req.body["estado"],
    //     "_id": req.body["_id"]
    // }
    var arr = {
        "idUser": req.body["idUser"],
        "nombre": req.body["nombre"],
        "nit": req.body["nit"],
        "products": req.body["products"],
        "cliente": req.body["cliente"],
        "fecha": req.body["fecha"],
        "estado": req.body["estado"],
        "total":req.body["total"],
    }
    console.log("HERE")

    var usuarioobtenido = {}
    const collection2 = mongoConnection.db('SADB').collection("usuario");
    collection2.find().toArray(function (err, docs) {
        
        docs.forEach(el=>{
            if(el._id==req.body["idUser"]){
                usuarioobtenido.correo=el.correo;
                usuarioobtenido.nombre=el.nombre;
                
            }
        })
        console.log("HEHEHEHEHEY")
        console.log(usuarioobtenido)
        if(Object.keys(usuarioobtenido).length === 0){
            usuarioobtenido = req.body["cliente"];
        }
        console.log("HEHEHEHEHEX")
        console.log(docs)
        console.log(usuarioobtenido)
        
    console.log("HERE")
    console.log(arr)
    console.log(req.body)

    const collection = mongoConnection.db('SADB').collection("pedido");
    collection.insertOne(arr, function (err, result) {
        if (err) {
            res.status(400).json({
                "error": err.message
            });
            return;
        } else {

            // Envío de correo
            let correo = usuarioobtenido.correo;
            let asunto = "Pedido realizado con éxito | Tango Cart";

            let productos = `<tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>cantidad</th>
                            <th>Subtotal</th>
                        </tr>`;

            for (producto of arr.products) {
                productos = productos + `
                    <tr>
                        <td>${producto.nombre}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.cantidad}</td>
                        <td>${Number(producto.precio) * Number(producto.cantidad)}</td>
                    </tr>
                `
            }

            let codigoProductos = `<table>
                ${productos}
            </table>`


            let contenido = `
                <div>
                    <h3>Hola ${usuarioobtenido.nombre}</h3>
                    <hr />
                    <br />
                    <div>Tu pedido ha sido procesado exitosamente.</div>
                    <p>ID del pedido: ${arr._id}</p>
                    <p>Estado: ${arr.estado}</p>
                    <p>Fecha: ${arr.fecha}</p>
                    ${codigoProductos}
                    <br />
                    <hr />
                    <h4>Total: Q ${arr.total}</h4>
                </div>
            `
            enviarMail(correo, asunto, contenido)

            console.log("Pedido con id [" + result.insertedId + "] y total " + arr["total"] + " insertado con exito")
            arr["products"].forEach(element => {
                const collection = mongoConnection.db('SADB').collection("libro");

                var mongo = require('mongodb');
                var o_id = new mongo.ObjectID(element._id);

                collection.updateOne({
                    _id: o_id
                }, {
                    $inc: {
                        "stock": -(Number(element.cantidad))
                    }
                }, {
                    upsert: true
                }, function (err, docs) {
                    console.log({
                        "todoBien": "compra realizada con exito"
                    });
                });
            });
            res.json({
                "todoBien": "todo correcto",
                "data": [
                    result.ops
                ],
                "idInsertado": result.insertedId
            });
            return;
        }
    });
});

}

const get_pedidos = (req, res) => {
    const collection = mongoConnection.db('SADB').collection("pedido");
    collection.find().toArray(function (err, docs) {
        res.json(docs);
        return;
    });
}


const setEstadoPedido = (req, res) => {
    const collection = mongoConnection.db('SADB').collection("pedido");
    var mongo = require('mongodb');
    var o_id = new mongo.ObjectID(req.body["_id"]);
    collection.updateOne({
        _id: o_id
    }, {
        $set: {
            "estado": req.body["estado"]
        }
    }, {
        upsert: true
    }, function (err, docs) {
        res.json({
            "result": "estado del pedido modificado con exito."
        });
    });

    var arr = {
        "total": req.body["total"],
        "products": req.body["products"],
        "cliente": req.body["cliente"],
        "fecha": req.body["fecha"],
        "estado": req.body["estado"],
        "_id": req.body["_id"]
    }

    // Envío de correo
    let correo = arr.cliente.correo;
    let asunto = "Pedido procesado con éxito | Tango Cart";

    let productos = `<tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Subtotal</th>
                        </tr>`;

    for (producto of arr.products) {
        productos = productos + `
                    <tr>
                        <td>${producto.nombre}</td>
                        <td>${producto.precio}</td>
                        <td>${producto.cantidad}</td>
                        <td>${Number(producto.precio) * Number(producto.cantidad)}</td>
                    </tr>
                `
    }

    let codigoProductos = `<table>
                ${productos}
            </table>`


    let contenido = `
                <div>
                    <h3>Hola ${arr.cliente.nombre}</h3>
                    <hr />
                    <br />
                    <div>Tu pedido ha sido procesado exitosamente.</div>
                    <p>ID del pedido: ${arr._id}</p>
                    <p>Estado: ${arr.estado}</p>
                    <p>Fecha: ${arr.fecha}</p>
                    ${codigoProductos}
                    <br />
                    <hr />
                    <h4>Total: Q ${arr.total}</h4>
                </div>
            `
    enviarMail(correo, asunto, contenido)

    console.log("JAJA")
    console.log(req.body["estado"])
    if(req.body["estado"] == 'solicitado'){
        var nom = arr.cliente.nombre
        var cor = arr.cliente.correo
        console.log("JAJA2")
        setTimeout( () => {
            console.log("JAJA3")
            let nuevoContenido = `
            <div>
                <h3>Hola ${nom}</h3>
                <hr />
                <br />
                <p> Hace tiempo que no nos visitas, tenemos excelentes promociones esperandote!</p>
                <p>Saludos,</p>
                <br>
                <p>Tango Cart :D</p>
            </div>
        `
        enviarMail(cor, 'Te estamos esperando! | Tango Cart', nuevoContenido)
        },
        20000
        )
    }
}



const enviarMail = (correo, asunto, contenido) => {

    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'luistangocart@gmail.com',
            pass: 'Tango_cart1'
        }
    });


    const mailOptions = {
        from: 'luistangocart@gmail.com',
        to: correo,
        subject: asunto,
        html: contenido
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(info);
            }
        });
    });
};

module.exports = {
    get_libros: get_libros,
    post_pedido: post_pedido,
    get_pedidos: get_pedidos,
    setEstadoPedido: setEstadoPedido
}