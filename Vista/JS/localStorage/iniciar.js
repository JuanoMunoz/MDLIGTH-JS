let btnIniciar = document.getElementById('ingresar');
btnIniciar.addEventListener('click', function iniciar(evento) {
    evento.preventDefault();
    if (validacion()) {
        let email = document.getElementById("email").value;  // Corrected ID
        let pass = document.getElementById("password").value;
        let listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        let encontrado = listaUsuarios.some(function (usuario) {
            return usuario.email === email && usuario.password === pass;
        });

        if (encontrado) {
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
            Toast.fire({
                icon: "success",
                title: "Usuario registrado \n¡Por favor iniciar sesión!"
            });
            setTimeout(function () {
                window.location.href = "Bienvenido.html";
            }, 2001);
        } else {
            alert("Usuario no encontrado. Verifique sus credenciales e intente de nuevo.");
        }
    }
});

function validacion() {
    const correo = document.getElementById("email").value;  // Corrected ID
    const password = document.getElementById("password").value;

    if (correo == "" || password == "") {
        event.preventDefault();  // Corrected to event.preventDefault();
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
        Toast.fire({
            icon: "error",
            title: "Usuario no encontrado \n¡Por favor verifica tus credenciales!"
        });
        return false;
    } else {
        return true;
    }
}
