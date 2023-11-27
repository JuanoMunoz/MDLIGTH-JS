
//VALIDACIÓN FORM

const boton = document.getElementById("ingresar");

boton.addEventListener("click", validar);

function validar(e) {
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    //CORREO
    if (correo == "" || password == "") {
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Asegurate de llenar todos los campos!',
        })
    }
}

