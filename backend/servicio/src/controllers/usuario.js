const mongoConnection = require('../connection/connection');
const jwt = require("jsonwebtoken");

const get_usuario = (req, res) => {
    var todoOk = req.body["correo"] != undefined ||
        req.body["id"] != undefined;
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
    if (req.body["correo"] != undefined) {
        find = {
            correo: req.body["correo"]
        }
    } else {
        var mongo = require('mongodb');
        var o_id = new mongo.ObjectID(req.body["id"]);
        find = {
            _id: o_id
        }
    }
    const collection = mongoConnection.db('SADB').collection("usuario");
    collection.find(find, {}).toArray(function (err, docs) {

        // console.log(docs);
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
    var todoOk = req.body["correo"] != undefined &&
        req.body["password"] != undefined;


    if (!todoOk) {
        res.status(400).json({
            "error": "faltan datos importantes",
        })
        return;
    }

    const collection = mongoConnection.db('SADB').collection("usuario");
    collection.find({
        correo: req.body["correo"],
        password: req.body["password"]
    }, {
        projection: {
            "_id": 1,
            "nombre": 1,
            "correo": 1,
            "tipo": 1
        }
    }).toArray(function (err, docs) {

        // console.log(docs);
        if (docs.length == 0) {
            res.status(400).json({
                "error": "credenciales no validas"
            });
            return;
        }
        var user = docs[0];
        // console.log(user);
        // const username =user.nickname
        // const tipo = user.tipoUsuario
        // const id = user._id
        // const userAuth = { id: id, username: username, tipo: tipo }
    
        // const accessToken = jwt.sign(userAuth, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({
            "id": user._id,
            "nombre": user.nombre,
            "correo": user.correo,
            "tipo": user.tipo,
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
    console.log(req.body)
    var arr = {};
    var todoOk = req.body["nombre"] != undefined &&
        req.body["apellido"] != undefined &&
        req.body["correo"] != undefined &&
        req.body["password"] != undefined &&
        req.body["tipo"] != undefined 
        // req.body["tarjetas"] != undefined;


    if (!todoOk) {
        res.status(400).json({    
            "message": "faltan datos"
        }
        );
        return;
    }

    arr = {
        "nombre": req.body["nombre"],
        "apellido": req.body["apellido"],
        "correo": req.body["correo"],
        "password": req.body["password"],
        "tipo": req.body["tipo"],
        "tarjetas": req.body["tarjetas"],
        "validado": true,
        "activo": true
    }

    const collection = mongoConnection.db('SADB').collection("usuario");
    collection.insertOne(arr, function (err, result) {
        if (err) {
            res.status(400).json({
                "error": err.message
            });
            return;
        } else {
            result.ops[0]["pass"] = "confidencial";
            result.ops[0]["id"] = result.insertedId;
            res.status(200).json(
                result.ops);
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
            "message": "faltan datos"
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
//NUEVAS FUNCS
const crearProducto = (req, res) => {
    console.log("AQUI")
    var todoOk = req.body["imagen"] != undefined &&
        req.body["nombre"] != undefined &&
        req.body["precio"] != undefined &&
        req.body["cantidad"] != undefined && 
        req.body["proveedor"] != undefined && 
        req.body["generos"] != undefined;

    if (!todoOk) {
        res.status(400).json({
            "message": "faltan datos"
        });
        return;
    }

    var arr = {
        "imagen": req.body["imagen"],
        "nombre": req.body["nombre"],
        "precio": req.body["precio"],
        "cantidad": req.body["cantidad"],
        "generos": req.body["generos"], 
        "eliminado": false,
        "username": req.body["username"],
        "proveedor": req.body["proveedor"],
        "timepoFinSubasta":req.body["timepoFinSubasta"],
        "usernameComprador": "",
        "precioMaximoOfrecido":0
    }
    console.log(arr)
    const collection = mongoConnection.db('SADB').collection("libro");
    collection.insertOne(arr, function (err, result) {
        if (err) {
            res.status(400).json({
                "error": err.message
            });
            return;
        } else {
            console.log("Producto con id [" + result.insertedId + "] y nombre " + arr["nombre"] + " insertado con exito")
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
const obtenerMisProductos = (req, res) => {
    const collection = mongoConnection.db('SADB').collection("libro");
    collection.find({
        "eliminado": false,
        "username":req["username"]
    }, {
        projection: {
            "imagen": 1,
            "nombre": 1,
            "precio": 1,
            "cantidad": 1,
            "proveedor": 1,
            "generos": 1 
        }
    }).toArray(function (err, docs) {
        res.json(docs);
        return;
    });
}

const editar_producto = (req, res) => {
    var todoOk = req.body["_id"] != undefined &&
        req.body["imagen"] != undefined &&
        req.body["nombre"] != undefined &&
        req.body["precio"] != undefined &&
        req.body["cantidad"] != undefined && 
        req.body["proveedor"] != undefined && 
        req.body["generos"] != undefined;
        

    if (!todoOk) {
        res.status(400).json({
            "message": "faltan datos"
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
            "generos": req.body["generos"],
            "username":  req.body["username"],
            "proveedor": req.body["proveedor"],
            "timepoFinSubasta":  req.body["timepoFinSubasta"],
            "usernameComprador":  req.body["usernameComprador"],
        
        }
    }, {
        upsert: true
    }, function (err, docs) {
        console.log(docs);
        res.json({
            "todoBien": "producto modificado con exito"
        });
        return;
    });
}

const eliminar_producto = (req, res) => {
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
const terminar_puja = (req, res) => {
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
            "message": "faltan datos"
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
        "total":req.body["precio"],
        "productos": req.body["productos"],
        "timepoFinSubasta":  req.body["timepoFinSubasta"],
        "usernameComprador":  req.body["usernameComprador"]
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
                        "todoBien": "producto modificado con exito"
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
    listar_usuarios: listar_usuarios,
    crearUser: crearUser,
    crearAdmin: crearAdmin,
    activarUsuario: activarUsuario,
    eliminarUsuario: eliminarUsuario,
    login: login,
    get_usuario: get_usuario,

    post_crearproducto: crearProducto,
    get_misproductos : obtenerMisProductos,
    put_editarProducto : editar_producto,
    delete_eliminarProducto : eliminar_producto,
    post_terminarPuja: terminar_puja
}