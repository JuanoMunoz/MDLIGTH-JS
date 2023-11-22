//VALIDAR FORM

const boton = document.getElementById("registro");

boton.addEventListener("click", validar);

function validar(e){
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const celular = document.getElementById("celular").value;
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    //NOMBRE
    if(nombre == ""){
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo Nombre no puede ir vacio!',
        })
    }

    //APELLIDO
    if(apellido == ""){
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo Apellido no puede ir vacio!',
        })
    }

    //CELULAR
    if(celular == ""){
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo Celular no puede ir vacio!',
        })
    }

    //CORREO
    const expcorreo = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    let emailOK = expcorreo.test(correo);

    if (correo == "") {
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo Correo no puede ir vacio!',
        })
    }else if(emailOK == false){
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El Correo no es valido!',
        })
    }

    //CONTRASEÑA
    const exppass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    let passOK = exppass.test(password);

    if(password == ""){
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El campo Contraseña no puede ir vacio!',
        })
    }else if(passOK == false){
        e.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La Contraseña no es valida! ',
            footer: 'Minimo 8 caracteres - Maximo 18  -  1 Letra Mayúscula y Minuscula  -  No espacios en Blanco  -  1 Caracter Especial '
        })
    }



}