let btnIniciar = document.getElementById('ingresar');
btnIniciar.addEventListener('click', function iniciar(evento) {
    evento.preventDefault();
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    let encontrado = listaUsuarios.some(function (usuario) {
        return usuario.email === email && usuario.password === pass;
    });

    if (encontrado) {
        //Poner sweetAlert
        setTimeout(function () {
            window.location.href = "bienvenido.html";
        }, 1);
    } else {
        alert("Usuario no encontrado. Verifique sus credenciales e intente de nuevo.");
    }
})

function iniciar() {

}
