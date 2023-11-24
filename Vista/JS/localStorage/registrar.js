let btnRegister = document.getElementById('registro');
btnRegister.addEventListener('click', function registro(event) {
    event.preventDefault();

    let listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let id = listaUsuarios.length > 0 ? listaUsuarios[listaUsuarios.length - 1].id : 0;

    if (document.getElementById('id').value) {
        let usuario = listaUsuarios.find(u => u.id === parseInt(document.getElementById('id').value));
        if (usuario) {
            usuario.nombre = document.getElementById('nombre').value;
            usuario.apellido = document.getElementById('apellido').value;
            usuario.celular = document.getElementById('celular').value;
            usuario.email = document.getElementById('email').value;
            usuario.password = document.getElementById('password').value;
        }
        document.getElementById('id').value = "";
    } else {
        let nuevoUsuario = {
            id: id + 1,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            celular: document.getElementById('celular').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }
        listaUsuarios.push(nuevoUsuario);
    }

    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
    alert("Funcionó");
    console.log(localStorage.getItem('usuarios'));
    document.getElementById('form').reset();
});
