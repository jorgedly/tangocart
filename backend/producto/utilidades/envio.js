const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tangocartsa@gmail.com',
        pass: '48tX_zY_8]CjM5d8'
    }
});

const enviar = (resultado) => {
    const mailOptions = {
        from: 'tangocartsa@gmail.com',
        to: resultado['correo'],
        subject: `Stock del producto ${resultado['nombre']}`,
        text: `Este correo es para informarle que su producto ${resultado['nombre']} ha quedado sin existencias.`
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

const verificar = async () => {
    try {
        const consulta = 'SELECT p.nombre, u.correo FROM Producto p, Usuario u WHERE p.proveedor = u.usuario AND p.stock = 0';
        const resultados = await consultar(consulta);
        if (resultados instanceof Array && resultados.length > 0) {
            const resultado = resultados[0];
            for (let i = 0; i < resultados.length; i++) {
                await enviar(resultado);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = verificar;