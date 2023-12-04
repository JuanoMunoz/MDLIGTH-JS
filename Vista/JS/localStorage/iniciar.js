
let btnIniciar = document.getElementById('ingresar');
btnIniciar.addEventListener('click', function iniciar(evento) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    evento.preventDefault();
    if (validacion()) {
        let email = document.getElementById("email").value;
        let pass = document.getElementById("password").value;
        let listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        let encontradoUsuario = listaUsuarios.find(function (usuario) {
            return usuario.email === email && usuario.password === pass;
        });

        if (encontradoUsuario) {
            // Guardar el ID en sessionStorage
            sessionStorage.setItem('usuarioId', encontradoUsuario.id);

            Toast.fire({
                icon: "success",
                title: "Usuario encontrado \n¡Redirigiendo!"
            });
            setTimeout(function () {
                window.location.href = "Bienvenido.html";
            }, 2001);
        } else {
            Toast.fire({
                icon: "error",
                title: "¡Usuario no encontrado \nVerifica tus credenciales y intenta de nuevo!"
            });
        }
    }

});

function validacion() {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    const correo = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (correo == "" || password == "") {
        event.preventDefault();
        Toast.fire({
            icon: "error",
            title: "¡Asegurate de llenar todos los campos!"
        });
        return false;
    } else {
        return true;
    }
}
