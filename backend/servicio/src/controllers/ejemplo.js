const mongoConnection = require('../connection/connection');

const get_prueba = (req, res) => {
    const collection = mongoConnection.db('SADB').collection("productos");
    collection.find({}).toArray(function (err, docs) {
        res.json(docs); 
    });
}

const post_prueba = (req, res) => {
    const collection = mongoConnection.db('SADB').collection("productos");
    collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }], function (err, result) {
        if (err) {
            res.json({ "error": "ya sabes que paso" })
        } else {
            res.json({ "todo bien": "todo correcto" });
        }
    });
}

module.exports = {
    get_prueba: get_prueba,
    post_prueba: post_prueba
}
