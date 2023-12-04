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
            password: document.getElementById('password').value,
            rol: document.getElementById('email').value == "luzvidales@gmail.com" ? "Admin" : "Usuario"
        }
        listaUsuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
        alerta();
        document.getElementById('form').reset();
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

    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let celular = document.getElementById("celular").value;
    let correo = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password_c = document.getElementById("password_c").value;

    if (nombre == "" || apellido == "" || celular == "" || correo == "" || password == "" || password_c == "") {
        event.preventDefault(); // Corrected to event.preventDefault();
        Toast.fire({
            icon: "error",
            title: "¡Asegúrate de llenar todos los campos!"
        });
        return false;
    } else {
        const example_correo = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        let confirmacion_e = example_correo.test(correo);

        if (confirmacion_e == false) {
            event.preventDefault(); // Corrected to event.preventDefault();
            Toast.fire({
                icon: "error",
                title: "¡Correo electrónico no válido!"
            });
            return false;
        } else {
            const example_pass = /^.{4,30}$/;
            let confirmacion_pass = example_pass.test(password);

            if (confirmacion_pass == false) {
                event.preventDefault(); // Corrected to event.preventDefault();
                Toast.fire({
                    icon: "error",
                    title: "¡El límite de caracteres en la contraseña es de 4 a 30, inténtelo de nuevo!"
                });
                return false;
            } else {
                if (password != password_c) {
                    event.preventDefault(); // Corrected to event.preventDefault();
                    Toast.fire({
                        icon: "error",
                        title: "¡Las contraseñas no coinciden, intenta de nuevo!"

                    });
                    return false
                } else {
                    let listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                    let telefonoRegistrado = false;
                    let correoRegistrado = false;

                    for (let i = 0; i < listaUsuarios.length; i++) {
                        if (document.getElementById('celular').value == listaUsuarios[i].celular) {
                            telefonoRegistrado = true;
                            break;
                        } else if (document.getElementById('email').value == listaUsuarios[i].email) {
                            correoRegistrado = true;
                            break;
                        }
                    }

                    if (telefonoRegistrado) {
                        Toast.fire({
                            icon: "error",
                            title: "¡Este número de teléfono ya se encuentra registrado!"
                        });
                        return false;
                    } else if (correoRegistrado) {
                        Toast.fire({
                            icon: "error",
                            title: "¡Este correo electrónico ya se encuentra registrado!"
                        });
                        return false;
                    }
                }

            }
        }
    }
    return true;
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
