let btnRegistro = document.getElementById('registro');
btnRegistro.addEventListener('click', function registro() {
    event.preventDefault();
    listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) ?? [];
    let id;
    listaUsuarios.length != 0 ? listaUsuarios.findLast((encontrado) => id = encontrado.id) : id = 0;
    if (document.getElementById('id').value) {
        listaUsuarios.forEach(usuario => {
            if (document.getElementById('id').value == usuario.id) {
                usuario.nombre = document.getElementById('nombre').value,
                    usuario.apellido = document.getElementById('apellido').value,
                    usuario.celular = document.getElementById('celular').value,
                    usuario.email = document.getElementById('email').value,
                    usuario.password = document.getElementById('password').value
            }
        });
        document.getElementById('id').value = "";
    } else {
        let usuario = {
            id: id + 1,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            celular: document.getElementById('celular').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }
        listaUsuarios.push(usuario);
    }
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
    document.getElementById('form').reset();
})
