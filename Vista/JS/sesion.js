
//VALIDACIÓN FORM

const boton = document.getElementById("ingresar");

boton.addEventListener("click", validar);

function validar(e){
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    //CORREO
    if(correo == ""){
        e.preventDefault();

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo Correo no puede ir vacio!',
        })
    }
    //CONTRASEÑA
    if(password == ""){
        e.preventDefault();

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo Contraseña no puede ir vacio!',
        })
    }
}

