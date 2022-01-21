const mongoConnection = require('../connection/connection');
const jwt = require("jsonwebtoken");

const get_usuario = (req, res) => {
    var todoOk = req.body["nickname"] != undefined ||
        req.body["_id"] != undefined;
    if (!todoOk) {
        res.status(400).json({
            "error": "faltan datos importantes",
            "ejemploJson": {
                "nickname": "nickname",
                "_id": "id",
                "nota:": "solo uno de los dos es necesario, si se envian ambos se tomara el nickname"
            }
        })
        return;
    }

    var find = {}
    if (req.body["nickname"] != undefined) {
        find = {
            nickname: req.body["nickname"]
        }
    } else {
        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body["_id"]);
        find = {
            _id: o_id
        }
    }
    const collection = mongoConnection.db('SADB').collection("usuario");
    collection.find(find, {}).toArray(function (err, docs) {

        console.log(docs);
        if (docs.length == 0) {
            res.status(400).json({
                "error": "usuario no encontrado"
            });
            return;
        }
        var user = docs[0];
        res.json({
            "todoBien": "todo correcto",
            "data": docs[0]
        });
        return;
    });

}

const login = (req, res) => {
    var todoOk = req.body["nickname"] != undefined &&
        req.body["pass"] != undefined;


    if (!todoOk) {
        res.status(400).json({
            "error": "faltan datos importantes",
            "ejemploJson": {
                "nickname": "nickname",
                "pass": "pass"
            }
        })
        return;
    }

    const collection = mongoConnection.db('SADB').collection("usuario");
    collection.find({
        nickname: req.body["nickname"],
        pass: req.body["pass"]
    }, {
        projection: {
            "nickname": 1,
            "nombreCompleto": 1,
            "telefono": 1,
            "tipoUsuario": 1,
            "direccion": 1,
            "activo": 1,
            "validado": 1
        }
    }).toArray(function (err, docs) {

        console.log(docs);
        if (docs.length == 0) {
            res.status(400).json({
                "error": "credenciales no validas"
            });
            return;
        }
        var user = docs[0];
        console.log(user);
        if (!user.activo) {
            res.status(400).json({
                "error": "usuario desactivado"
            })
            return;
        }
        if (user.tipoUsuario == "proveedor" && !user.validado) {
            res.status(400).json({
                "error": "empresa no validado"
            });
            return;
        }


        // const username =user.nickname
        // const tipo = user.tipoUsuario
        // const id = user._id
        // const userAuth = { id: id, username: username, tipo: tipo }
    
        // const accessToken = jwt.sign(userAuth, process.env.ACCESS_TOKEN_SECRET)
        res.json({
            "todoBien": "todo correcto",
            "data": user,
            // "accessToken": accessToken
        });
        return;
    });

}



const listar_usuarios = (req, res) => {
    const collection = mongoConnection.db('SADB').collection("usuario");
    collection.find({}, {
        projection: {
            "nickname": 1,
            "nombreCompleto": 1,
            "telefono": 1,
            "tipoUsuario": 1,
            "validado": 1,
            "validadoPor": 1,
            "activo": 1,
            "eliminadoPor": 1,
            "direccion": 1,
        }
    }).toArray(function (err, docs) {
        console.log(docs);
        res.json(docs);
        return;
    });

}

const eliminarUsuario = (req, res) => {
    const collection = mongoConnection.db('SADB').collection("usuario");

    var jsonEjemplo = {
        "eliminadoPor": "id del usuario administrador que eliminara una cuenta o del usuario que quiere eliminar su propia cuenta",
        "_id": "id del usuario que se va a eliniar",
        "nickname": "nick del usuario que se va a eliminar",
        "nota": "solo es necesario mandar uno de los dos ↑ si se envian ambos se buscara por el nickname"
    }

    if (req.body["eliminadoPor"] == undefined) {
        res.status(400).json({
            "error": "faltan datos importantes",
            "ejemploJson": jsonEjemplo
        });
        return;
    }

    var eliminadoPor = req.body["eliminadoPor"];

    if (req.body["nickname"] != undefined) {
        collection.updateOne({
            nickname: req.body["nickname"]
        }, {
            $set: {
                "activo": false,
                "eliminadoPor": eliminadoPor
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
    } else if (req.body["_id"] != undefined) {
        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body["_id"]);
        collection.updateOne({
            _id: o_id
        }, {
            $set: {
                "activo": false,
                "eliminadoPor": eliminadoPor
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
    } else {
        res.status(400).json({
            "error": "faltan datos importantes",
            "ejemploJson": jsonEjemplo
        });
        return;
    }
}



const activarUsuario = (req, res) => {
    var jsonEjemplo = {
        "activadoPor": "id del usuario administrador que adminitra una cuenta de proveedor",
        "_id": "id del usuario que se va a activar",
        "nickname": "nick del usuario que se va a activar",
        "nota": "solo es necesario mandar uno de los dos ↑ si se envian ambos se buscara por el nickname"
    }

    if (req.body["activadoPor"] == undefined) {
        res.status(400).json({
            "error": "faltan datos importantes",
            "ejemploJson": jsonEjemplo
        });
        return;
    }

    var activadoPor = req.body["activadoPor"];


    const collection = mongoConnection.db('SADB').collection("usuario");
    if (req.body["nickname"] != undefined) {
        collection.updateOne({
            nickname: req.body["nickname"]
        }, {
            $set: {
                "validado": true,
                "validadoPor": activadoPor
            }
        }, {
            upsert: true
        }, function (err, docs) {
            console.log(docs);
            res.json({
                "todoBien": "usuario activado con exito"
            });
            return;
        });
    } else if (req.body["_id"] != undefined) {
        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body["_id"]);
        collection.updateOne({
            _id: o_id
        }, {
            $set: {
                "validado": true,
                "validadoPor": activadoPor
            },
        }, {
            upsert: true
        }, function (err, docs) {
            console.log(docs);
            res.json({
                "todoBien": "usuario activado con exito"
            });
            return;
        });
    } else {
        res.status(400).json({
            "error": "faltan datos importantes",
            "ejemploJson": jsonEjemplo
        });
        return;
    }
}

const crearUser = (req, res) => {
    var arr = {};
    var todoOk = req.body["nickname"] != undefined &&
        req.body["pass"] != undefined &&
        req.body["nombreCompleto"] != undefined &&
        req.body["telefono"] != undefined &&
        req.body["tipoUsuario"] != undefined &&
        req.body["direccion"] != undefined &&
        req.body["correo"] != undefined;


    if (!todoOk) {
        res.status(400).json({
            "Error": "faltan datos importantes",
            "ejemplo json correcto": {
                "nickname": "nickname",
                "pass": "pass",
                "nombreCompleto": "nombre completo",
                "telefono": "123",
                "correo": "correo",
                "direccion": "direccion",
                "tipoUsuario": "cliente | proveedor"
            }
        });
        return;
    }

    arr = {
        "nickname": req.body["nickname"],
        "pass": req.body["pass"],
        "nombreCompleto": req.body["nombreCompleto"],
        "telefono": req.body["telefono"],
        "correo": req.body["correo"],
        "direccion": req.body["direccion"],
        "tipoUsuario": req.body["tipoUsuario"]
    }
    if (arr["tipoUsuario"] == "proveedor") {
        arr["validado"] = false;
    }
    if (arr["tipoUsuario"] != "proveedor") {
        arr["tipoUsuario"] = "cliente";
    }

    arr["activo"] = true; //si se elimina solo se pasara a false no se eliminara realmente :D 
    //TODO validar que el nickname sea unico 
    const collection = mongoConnection.db('SADB').collection("usuario");
    collection.insertOne(arr, function (err, result) {
        if (err) {
            res.status(400).json({
                "error": err.message
            });
            return;
        } else {
            console.log("Usuario con id [" + result.insertedId + "] y nick " + arr["nickname"] + " insertado con exito")
            result.ops[0]["pass"] = "confidencial ;)";
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
//TODO unir ambos metodos ↓↑ o hacer otro metodo ya que el codigo es bastante similar y eso es mala practica :D
const crearAdmin = (req, res) => {
    var arr = {};
    var todoOk = req.body["nickname"] != undefined &&
        req.body["pass"] != undefined &&
        req.body["nombreCompleto"] != undefined &&
        req.body["telefono"] != undefined &&
        req.body["correo"] != undefined;
    if (!todoOk) {
        res.status(400).json({
            "Error": "faltan datos importantes",
            "ejemplo json correcto": {
                "nickname": "nickname",
                "pass": "pass",
                "nombreCompleto": "nombre completo",
                "telefono": "123",
                "correo": "correo",
            }
        });
        return;
    }

    arr = {
        "nickname": req.body["nickname"],
        "pass": req.body["pass"],
        "nombreCompleto": req.body["nombreCompleto"],
        "telefono": req.body["telefono"],
        "correo": req.body["correo"],
    }
    arr["tipoUsuario"] = "admin";
    arr["activo"] = true; //si se elimina solo se pasara a false no se eliminara realmente :D 

    //TODO validar que el nickname sea unico 
    const collection = mongoConnection.db('SADB').collection("usuario");
    collection.insertOne(arr, function (err, result) {
        if (err) {
            console.log(err.message);
            res.status(400).json({
                "error": "algo ha salido mal"
            });
            return;
        } else {
            console.log("Usuario con id [" + result.insertedId + "] y nick " + arr["nickname"] + " insertado con exito")
            result.ops[0]["pass"] = "confidencial ;)";
            res.json({
                "todoBien": "todo correcto",
                "data": result.ops,
                "idInsertado": result.insertedId
            });
            return;
        }
    });
}



module.exports = {
    listar_usuarios: listar_usuarios,
    crearUser: crearUser,
    crearAdmin: crearAdmin,
    activarUsuario: activarUsuario,
    eliminarUsuario: eliminarUsuario,
    login: login,
    get_usuario: get_usuario,
}