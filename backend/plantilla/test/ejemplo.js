/* more example 

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;


chai.use(chaiHttp);
const url = 'localhost:200';

describe('Prueba Unitarias: ', () => {
    it('Obtener pagina principal', (done) => {
        chai.request(url)
            .get('/')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});




describe('Pruebas correctas a servicio 2: ', () => {
    it('Obtener todos los productos', (done) => {
        chai.request(url)
            .get('/obtenerTodos')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Obtener productos ofertados', (done) => {
        chai.request(url)
            .get('/obtenerOferta')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Insertar un producto', (done) => {
        chai.request(url)
            .post('/insertar')
            .send({ nombre: "Hamburguesa", categoria: "Comida", descripcion: "hamburguesa con queso", precio: 10.00,
                     imagen: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.hogar.mapfre.es%2Fmedia%2F2018%2F09%2Fhamburguesa-sencilla.jpg&imgrefurl=https%3A%2F%2Fwww.hogar.mapfre.es%2Fcocina%2Frecetas%2Fcarnes%2Fhamburguesa-sencilla%2F&tbnid=fSa-b9YO8FPkFM&vet=12ahUKEwiMh9L21pnsAhUOTlMKHVXFC1UQMygFegUIARDvAQ..i&docid=uDWBipZkf93RBM&w=1104&h=704&q=hamburguesas&ved=2ahUKEwiMh9L21pnsAhUOTlMKHVXFC1UQMygFegUIARDvAQ" ,
                     ofertado: 0, PrecioOferta: 8.00 })
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

});

describe('Pruebas incorrectas a servicio 2: ', () => {
    it('Obtener producto inexistente', (done) => {
        chai.request(url)
            .get('/urlinventada')
            .end(function (err, res) {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('Borrar producto inexistente (-1)', (done) => {
        chai.request(url)
            .get('/delete?id=-1')
            .end(function (err, res) {
                expect(res).to.have.status(404);
                done();
            });
    });

});






*/ 