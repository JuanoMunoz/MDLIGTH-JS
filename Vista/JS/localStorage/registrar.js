let btnRegister = document.getElementById('registro');
btnRegister.addEventListener('click', function registro(event) {
    event.preventDefault();
    if (validacion()) {
        let listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let id
        listaUsuarios.length != 0 ? listaUsuarios.findLast((usuario) => id = usuario.id) : id = 0

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
        alerta();
        document.getElementById('form').reset();
    }
});
function validacion() {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let celular = document.getElementById("celular").value;
    let correo = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (nombre == "" || apellido == "" || celular == "" || correo == "" || password == "") {
        event.preventDefault();
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
            title: "¡Asegurate de llenar todos los campos!"
        });
        return false
    } else {
        const example_correo = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        let confirmacion_e = example_correo.test(correo);
        if (confirmacion_e == false) {
            event.preventDefault();
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
                title: "¡Correo electrónico no válido!"
            });
            return false
        } else {
            const example_pass = /^.{4,30}$/;
            let confirmacion_pass = example_pass.test(password);
            if (confirmacion_pass == false) {
                event.preventDefault();
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
                    title: "¡El límite de caracteres es de 4 a 30, intente de nuevo!"
                });
                return false
            }
        }
    }
    return true
}
function alerta() {
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
        window.location.href = "InicioSesion.html";
    }, 2001);
}
