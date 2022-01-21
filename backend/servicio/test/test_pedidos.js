let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'localhost:5000/pedido';

describe('Prueba unitarias en endpoint\'s de Pedidos', () => {

    it('Obtener todos los libros', (done) => {
        chai.request(url)
            .get('/libros')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Agregar un nuevo libro', (done) => {
        chai.request(url)
            .post('/pedido')
            .send({
                nombre: "Hamburguesa",
                categoria: "Comida",
                descripcion: "hamburguesa con queso",
                precio: 10.00,
                imagen: "google.es",
                ofertado: 0,
                PrecioOferta: 8.00
            })
            .end(function (err, res) {
                expect(res).to.have.status(400);
                done();
            });
    });

    it('url inexistente', (done) => {
        chai.request(url)
            .put('/libro')
            .send({
                _id: "60c6e8504a69a00015780561",
                imagen: "https://depor.com/resizer/fk1pqyjToL71hHjds5CXMtXwreo=/620x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/UUUOUL35BVHDZLRYPXVEPP2GMA.jpg",
                nombre: "El producto mas deahuevo del mundo :)",
                autor: "Que te pele",
                editorial: "Que te pele x2",
                anio: 2021,
                paginas: 100,
                precio: 500,
                cantidad: 1000,
                generos: [{ _id: "60c558ca2a4d232b10ba0bcc", nombre: "generoA", descripcion: "descripcion de A" }, { _id: "60c558d82a4d232b10ba0bcd", nombre: "generoB", descripcion: "descripcion de B" }, { _id: "60c55b962a4d232b10ba0bcf", nombre: "genero1", descripcion: "descrip 1" }],
                eliminado: false
            })
            .end(function (err, res) {
                expect(res).to.have.status(404);
                done();
            });
    });

});