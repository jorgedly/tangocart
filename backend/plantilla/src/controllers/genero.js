const mongoConnection = require('../connection/connection');


const listar_generos = (req, res) => {
    const collection = mongoConnection.db('SADB').collection("genero");
    collection.find({}, {}).toArray(function (err, docs) {
        console.log(docs);
        res.json(docs);
        return;
    });
}

const crearGenero = (req, res) => {
    /*
    
        {
            "nombre" : "nombre del genero", 
            "descripcion" : "descripcion"
        }

    */
    var arr = {};
    var todoOk = req.body["nombre"] != undefined &&
        req.body["descripcion"] != undefined;


    if (!todoOk) {
        res.status(400).json({
            "Error": "faltan datos importantes",
            "ejemplo json correcto": {
                "nombre": "nombre del genero",
                "descripcion": "descripcion"
            }
        });
        return;
    }

    arr = {
        "nombre": req.body["nombre"],
        "descripcion": req.body["descripcion"],
        //"activo": true,
    }
    //TODO validar que el nickname sea unico 
    const collection = mongoConnection.db('SADB').collection("genero");
    collection.insertOne(arr, function (err, result) {
        if (err) {
            res.status(400).json({
                "error": err.message
            });
            return;
        } else {
            console.log("gnero con id [" + result.insertedId + "] creado con exito")
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

const actualizar_genero = (req, res) => {
    var jsonEjemplo = {
        "_id": "id del genero que se va a acutalizar",
        "nombre": "nuevo nombre del genero",
        "descripcion": "nueva descripcion del genero",
        "nota": "tiene que estar el nombre o la descripcion."
    }

    if (req.body["_id"] == undefined || (req.body["nombre"] == undefined && req.body["descripcion"] == undefined)) {
        res.status(400).json({
            "error": "faltan datos importantes",
            "ejemploJson": jsonEjemplo
        });
        return;
    }

    var set = {};
    if (req.body["nombre"] != undefined) {
        set["nombre"] = req.body["nombre"];
    }
    if (req.body["descripcion"] != undefined) {
        set["descripcion"] = req.body["descripcion"];
    }
    const collection = mongoConnection.db('SADB').collection("genero");
    var mongo = require('mongodb');

    var o_id = ""

    try {
        o_id = new mongo.ObjectID(req.body["_id"]);
    } catch (error) {

    }
    console.log(set);
    collection.updateOne({
        _id: o_id
    }, {
        $set: set
    }, function (err, docs) {

        if (err) {
            console.log(err);
            res.status(400).json({
                "error": "algo ha salido mal"
            })
            return;
        }
        console.log("------")
        //console.log(docs);

        console.log(docs.result.nModified)
        if (docs.result.nModified == 0) {
            res.status(400).json({
                "error": "no se actualizo ningun genero"
            })
            return;
        }

        console.log("------")
        res.json({
            "todoBien": "genero actualiado con exito"
        });
        return;
    });

}

const eliminar_genero = (req, res) => {
    var jsonEjemplo = {
        "_id": "id del genero que se va a acutalizar"
    }

    if (req.body["_id"] == undefined) {
        res.status(400).json({
            "error": "debes mandar el _id a eliminar",
            "ejemploJson": jsonEjemplo
        });
        return;
    }

    var set = {};
    if (req.body["nombre"] == undefined) {
        set["nombre"] = req.body["nombre"];
    }
    if (req.body["descripcion"] == undefined) {
        set["descripcion"] = req.body["descripcion"];
    }
    const collection = mongoConnection.db('SADB').collection("genero");
    var mongo = require('mongodb');

    var o_id = ""
    try {
        o_id = new mongo.ObjectID(req.body["_id"]);
    } catch (error) {

    }

    collection.deleteOne({
        _id: o_id
    }, function (err, docs) {
        if (err) {
            console.log(err);
            res.status(400).json({
                "error": "algo ha salido mal"
            })
            return; 
        }
        console.log(docs.deletedCount );
        if(docs.deletedCount == 0){
            res.status(400).json({"error": "no se elimino ningun genero"})
            return; 
        }
        res.json({
            "todoBien": "genero eliminado con exito"
        });
        return;
    });

}




module.exports = {
    listar_generos: listar_generos,
    crearGenero: crearGenero,
    actualizar_genero: actualizar_genero,
    eliminar_genero: eliminar_genero,
}