let btnAgregar = document.getElementById('btnAddUser')
btnAgregar.addEventListener('click', function agregar(event) {
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
        document.getElementById('form').reset();
        Toast.fire({
            icon: "success",
            title: "¡Usuario registrado!"
        });
        alerta()
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

    if (nombre == "" || apellido == "" || celular == "" || correo == "" || password == "") {
        Toast.fire({
            icon: "error",
            title: "¡Asegurate de llenar todos los campos!"
        });
        return false;
    } else {
        const example_correo = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        let confirmacion_e = example_correo.test(correo);

        if (confirmacion_e == false) {
            Toast.fire({
                icon: "error",
                title: "¡Correo no válido!"
            });
            return false;
        } else {
            const example_pass = /^.{4,30}$/;
            let confirmacion_pass = example_pass.test(password);

            if (confirmacion_pass == false) {
                Toast.fire({
                    icon: "error",
                    title: "¡El limite de caracteres de la contraseña es de 4 a 30 caracteres!"
                });
                return false;
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
                        title: "¡El número de teléfono ya se encuentra registrado!"
                    });

                    return false;
                } else if (correoRegistrado) {
                    Toast.fire({
                        icon: "error",
                        title: "¡El correo electrónico ya se encuentra registrado!"
                    });
                    return false;
                }
            }
        }
    }
    return true;
}

function alerta() {
    setTimeout(function () {
        window.location.href = "usuario.html";
    }, 2001);
}


function eliminar(id_u) {
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
    listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) ?? []
    listaUsuarios = listaUsuarios.filter(function (usuario) {
        return usuario.id != id_u;
    });
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios))
    Toast.fire({
        icon: "success",
        title: "¡Usuario eliminado!"
    });
    alerta();
}