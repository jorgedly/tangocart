const mongoConnection = require('../connection/connection');

const devolverTodosLibros = (req, res) => {
    const collection = mongoConnection.db('SADB').collection("libro");
    collection.find({
        "eliminado": false
    }, {
        projection: {
            "imagen": 1,
            "nombre": 1,
            "precio": 1,
            "cantidad": 1,
            "generos": 1 
        }
    }).toArray(function (err, docs) {
        console.log(docs);
        res.json(docs);
        return;
    });

}

const crearLibro = (req, res) => {
    var todoOk = req.body["imagen"] != undefined &&
        req.body["nombre"] != undefined &&
        req.body["precio"] != undefined &&
        req.body["cantidad"] != undefined && 
        req.body["generos"] != undefined; 

    if (!todoOk) {
        res.status(400).json({
            "Error": "faltan datos importantes",
            "ejemplo json correcto": {
                "imagen": "golc//quetepele.com",
                "nombre": "Como vender coca",
                "precio": 104.29,
                "cantidad": 12, 
                "generos" : [
                    {
                        "id": "s4356",
                        "nombre": "gay",
                        "descripcion": "para que no se ofenda la people"
                    },{
                        "id": "s4356",
                        "nombre": "gay",
                        "descripcion": "para que no se ofenda la people"
                    }
                ]
            }
        });
        return;
    }

    var arr = {
        "imagen": req.body["imagen"],
        "nombre": req.body["nombre"],
        "precio": req.body["precio"],
        "cantidad": req.body["cantidad"],
        "generos": req.body["generos"], 
        "eliminado": false
    }
    const collection = mongoConnection.db('SADB').collection("libro");
    collection.insertOne(arr, function (err, result) {
        if (err) {
            res.status(400).json({
                "error": err.message
            });
            return;
        } else {
            console.log("Libro con id [" + result.insertedId + "] y nombre " + arr["nombre"] + " insertado con exito")
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

const modificarLibro = (req, res) => {
    var todoOk = req.body["_id"] != undefined &&
        req.body["imagen"] != undefined &&
        req.body["nombre"] != undefined &&
        req.body["precio"] != undefined &&
        req.body["cantidad"] != undefined && 
        req.body["generos"] != undefined;

    if (!todoOk) {
        res.status(400).json({
            "Error": "faltan datos importantes",
            "ejemplo json correcto": {
                "id": "asdf4sdf345",
                "imagen": "golc//quetepele.com",
                "nombre": "Como vender coca",
                "precio": 104.29,
                "cantidad": 12,
                "generos" : [
                    {
                        "id": "s4356",
                        "nombre": "gay",
                        "descripcion": "para que no se ofenda la people"
                    },{
                        "id": "s4356",
                        "nombre": "gay",
                        "descripcion": "para que no se ofenda la people"
                    }
                ]
            }
        });
        return;
    }

    const collection = mongoConnection.db('SADB').collection("libro");

    var mongo = require('mongodb');
    var o_id = new mongo.ObjectID(req.body["_id"]);

    collection.updateOne({
        _id: o_id
    }, {
        $set: {
            "imagen": req.body["imagen"],
            "nombre": req.body["nombre"],
            "precio": req.body["precio"],
            "cantidad": req.body["cantidad"],
            "generos": req.body["generos"]
        }
    }, {
        upsert: true
    }, function (err, docs) {
        console.log(docs);
        res.json({
            "todoBien": "usuario modificado con exito"
        });
        return;
    });
}

const eliminarLibro = (req, res) => {
    const collection = mongoConnection.db('SADB').collection("libro");

    if (req.query.id == undefined) {
        res.status(400).json({
            "error": "faltan datos importantes",
            "ejemploJson": {
                "id": "4sdfsdfw"
            }
        });
        return;
    }

    var mongo = require('mongodb');
    var o_id = new mongo.ObjectID(req.query.id);

    collection.updateOne({
        _id: o_id 
    }, {
        $set: {
            "eliminado": true
        }
    }, {
        upsert: true
    }, function (err, docs) {
        console.log(docs);
        res.json({
            "todoBien": "usuario eliminado con exito"
        });
        return;
    });
}

module.exports = {
    get_all_libro: devolverTodosLibros,
    post_libro: crearLibro,
    put_libro: modificarLibro,
    delete_libro: eliminarLibro
}