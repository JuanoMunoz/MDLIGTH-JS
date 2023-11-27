let btnRegistro = document.getElementById('registro');
btnRegistro.addEventListener("click", function validar(e) {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let celular = document.getElementById("celular").value;
    let correo = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (nombre == "" || apellido == "" || celular == "" || correo == "" || password == "") {
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Asegurate de llenar todos los campos!',
        })
    } else {
        const example_correo = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        let confirmacion_e = example_correo.test(correo);
        if (confirmacion_e == false) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡El Correo no es valido!',
            })
        } else {
            const example_pass = /^.{4,30}$/;
            let confirmacion_pass = example_pass.test(password);
            if (confirmacion_pass == false) {
                e.preventDefault();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡El limite de caracteres de 4 a 30, intenta de nuevo!',
                })
            }
        }
    }
})