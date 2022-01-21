const mongoConnection = require('../connection/connection');

const get_libros = (req, res) => {
    const collection = mongoConnection.db('SADB').collection("libro");
    collection.find({
        "eliminado": false
    }, {
        projection: {
            "imagen": 1,
            "nombre": 1,
            "autor": 1,
            "proveedor": 1,
            "anio": 1,
            "paginas": 1,
            "precio": 1,
            "cantidad": 1,
            "generos": 1
        }
    }).toArray(function (err, docs) {
        console.log(docs);
        enviar = docs.filter(doc => doc.cantidad > 0);
        res.json(enviar);
        return;
    });

}

const post_pedido = (req, res) => {
    var arr = {};
    var todoOk = req.body["direccion"] != undefined &&
        req.body["departamento"] != undefined &&
        req.body["codigoPostal"] != undefined &&
        req.body["numeroTarjeta"] != undefined &&
        req.body["fechaVencimiento"] != undefined &&
        req.body["ccv"] != undefined &&
        req.body["total"] != undefined &&
        req.body["productos"] != undefined;


    if (!todoOk) {
        res.status(400).json({
            "Error": "faltan datos importantes",
            "ejemplo json correcto": {
                "direccion": "esta",
                "departamento": "Huehuetenango... ese no burro",
                "codigoPostal": 10407,
                "numeroTarjeta": 13039423,
                "fechaVencimiento": "01/04/1997",
                "ccv": 104,
                "total": 104.29,
                "productos": "direccion"
            }
        });
        return;
    }

    var arr = {
        "direccion": req.body["direccion"],
        "departamento": req.body["departamento"],
        "codigoPostal": req.body["codigoPostal"],
        "numeroTarjeta": req.body["numeroTarjeta"],
        "fechaVencimiento": req.body["fechaVencimiento"],
        "ccv": req.body["ccv"],
        "total": req.body["total"],
        "productos": req.body["productos"]
    }
    const collection = mongoConnection.db('SADB').collection("pedido");
    collection.insertOne(arr, function (err, result) {
        if (err) {
            res.status(400).json({
                "error": err.message
            });
            return;
        } else {
            console.log("Pedio con id [" + result.insertedId + "] y total " + arr["total"] + " insertado con exito")
            arr["productos"].forEach(element => {
                const collection = mongoConnection.db('SADB').collection("libro");

                var mongo = require('mongodb');
                var o_id = new mongo.ObjectID(element._id);

                collection.updateOne({
                    _id: o_id
                }, {
                    $set: {
                        "cantidad": 0
                    }
                }, {
                    upsert: true
                }, function (err, docs) {
                    console.log({
                        "todoBien": "usuario modificado con exito"
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

}

module.exports = {
    get_libros: get_libros,
    post_pedido: post_pedido
}