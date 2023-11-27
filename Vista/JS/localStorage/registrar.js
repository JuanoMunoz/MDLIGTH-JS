let btnRegister = document.getElementById('registro');
btnRegister.addEventListener('click', function registro(event) {
    event.preventDefault();

    let listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let id = listaUsuarios[listaUsuarios.length]

    let nuevoUsuario = {
        id: id + 1,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        celular: document.getElementById('celular').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }
    listaUsuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
    document.getElementById('form').reset();
});