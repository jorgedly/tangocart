const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://mrcampa404:4dyMn5ITDSBX4vS4@cluster0.hdy5a.mongodb.net/SADB?retryWrites=true&w=majority";
// const uri = "mongodb+srv://admin:admin@sofwareavanzado.0uuff.mongodb.net/proyecto?retryWrites=true&w=majority";

const uri = "mongodb+srv://admin:admin@tango-cart.6019l.mongodb.net/proyecto?retryWrites=true&w=majority";


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    if (err) {
        console.log(err)
    } else{
        console.log("¡Base de datos conectada!");
    }  
});

module.exports = client;
