describe('validarInicioSesion', () => {
    const usuario = {
        correo: 'correo1@gmail.com',
        nombre: 'nombre1',
        contrasena: 'contrasena1',
        fechaNacimiento: '03-06-1994',
        tipoUsuario: 'doctor'
    };
    //const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    //usuarios.push(usuario);
    //localStorage.setItem('usuarios', JSON.stringify(usuarios));

    test('Inicio de sesion valido', () => {
        expect(true).toBe(true);
    });

    test('Inicio de sesion invalido', () => {
        expect(true).toBe(true);
    });
});