//Agregar Producto
let btnAgregar = document.getElementById('registrobtn');
btnAgregar.addEventListener('click', function añadirProducto(e) {

    //Alerta
    const Toast = swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    e.preventDefault();

    if (validarProducto(e)) {
        //Capturar ruta de la imagen
        let inputImg = document.getElementById('fotoP').value;
        let listaProductos = JSON.parse(localStorage.getItem('productos')) || [];
        let idProducto
        listaProductos.length != 0 ? listaProductos.findLast((producto) => idProducto = producto.idProducto) : idProducto = 0

        let nuevoProducto = {
            idProducto: idProducto + 1,
            nombreProducto: document.getElementById('nombreP').value,
            descripcion: document.getElementById('descripcionP').value,
            precio: document.getElementById('precioP').value,
            categoria: document.getElementById('categoriaP').value,
            imagen: inputImg
        }
        listaProductos.push(nuevoProducto);
        localStorage.setItem('productos', JSON.stringify(listaProductos));
        Toast.fire({
            icon: "success",
            title: "¡Producto registrado!"
        })
        document.getElementById('formP').reset();
    }

});

//Editar
function editarProducto(idProducto, e) {
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

    if (validarProductoEditar(e)) {
        let listaProductos = JSON.parse(localStorage.getItem('productos')) || [];
        if(listaProductos.length !== 0){
            let producto = listaProductos.find(producto => producto.idProducto == idProducto);
            if(producto){
                producto.nombreProducto = document.getElementById('productoEditar').value;
                producto.descripcion = document.getElementById('descripcionEditar').value;
                producto.precio = document.getElementById('precioEditar').value;
                producto.imagen = document.getElementById('fotoEditar').value;

                localStorage.setItem('productos', JSON.stringify(listaProductos));
                Toast.fire({
                    icon: "success",
                    title: "¡Información del producto editada!"
                });
                alertaProducto();

            }

        }

    }
}

//Eliminar
function eliminarProducto(idProducto) {
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
    
    listaProductos = JSON.parse(localStorage.getItem('productos')) ?? []
    listaProductos = listaProductos.filter(function (producto) {
        return producto.idProducto != idProducto;
    });
    localStorage.setItem('productos', JSON.stringify(listaProductos))
    Toast.fire({
        icon: "success",
        title: "¡Producto eliminado!"
    });
    alertaProducto();

}

//Validaciones
function validarProducto(e) {
    var nombreProducto = document.getElementById("nombreP").value;
    var descripcionProducto = document.getElementById("descripcionP").value;
    var precioProducto = document.getElementById("precioP").value;
    var categoriaProducto = document.getElementById("categoriaP").value;
    var imagenProducto = document.getElementById("fotoP").value;

    //Alerta
    const Toast = swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    //Validaciones
    if (nombreProducto == "" || descripcionProducto == "" || precioProducto == "" || categoriaProducto == 0 || imagenProducto == "") {

        Toast.fire({
            icon: "error",
            title: "¡Asegurate de llenar todos los campos!"
        })

        e.preventDefault();
        return false;

    }else{
        if (nombreProducto.length <= 5 || nombreProducto.length > 25) {
            Toast.fire({
                icon: "error",
                title: "¡El Nombre del producto no cumple con las validaciones!\n (Min 5 y Max 25 caracteres)"
            });

            e.preventDefault();
            return false;
        }
        else if(descripcionProducto.length <= 30 || descripcionProducto.length > 200){
            Toast.fire({
                icon: "error",
                title: "¡La Descripción del producto no cumple con las validaciones!\n (Min 30 y Max 200 caracteres)"
            });

            e.preventDefault();
            return false;

        }
        else if(precioProducto <= 2000){
            Toast.fire({
                icon: "error",
                title: "¡El Precio del producto no cumple con las validaciones!\n (Min 2.000 Pesos)"
            });

            e.preventDefault();
            return false;
        }

        //Imagen
        const ultimosTres = imagenProducto.slice(-4);
        const ultimosCuatro = imagenProducto.slice(-4);
        let extPermitidas = /(.jpg|.JPG|.png|.PNG|.jpeg|.JPEG|.jfif|.JFIF)$/i;

        if (!extPermitidas.exec(ultimosCuatro) || !extPermitidas.exec(ultimosTres)) {
            Toast.fire({
                icon: "error",
                title: "¡La imagen del producto no cumple con las validaciones!\n (Solo JPG y PNG)"
            });
            return false;
        }
    }

    return true;
}
function validarProductoEditar(e) {
    var nombreProducto = document.getElementById("productoEditar").value;
    var descripcionProducto = document.getElementById("descripcionEditar").value;
    var precioProducto = document.getElementById("precioEditar").value;
    var imagenProducto = document.getElementById("fotoEditar").value;

    //Alerta
    const Toast = swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    //Validaciones
    if (nombreProducto == "" || descripcionProducto == "" || precioProducto == "" || imagenProducto == "") {

        Toast.fire({
            icon: "error",
            title: "¡Asegurate de llenar todos los campos!"
        })

        e.preventDefault();
        return false;

    }else{
        if (nombreProducto.length <= 5 || nombreProducto.length > 25) {
            Toast.fire({
                icon: "error",
                title: "¡El Nombre del producto no cumple con las validaciones!\n (Min 5 y Max 25 caracteres)"
            });

            e.preventDefault();
            return false;
        }
        else if(descripcionProducto.length <= 30 || descripcionProducto.length > 200){
            Toast.fire({
                icon: "error",
                title: "¡La Descripción del producto no cumple con las validaciones!\n (Min 30 y Max 200 caracteres)"
            });

            e.preventDefault();
            return false;

        }
        else if(precioProducto <= 2000){
            Toast.fire({
                icon: "error",
                title: "¡El Precio del producto no cumple con las validaciones!\n (Min 2.000 Pesos)"
            });

            e.preventDefault();
            return false;
        }

        //Imagen
        const ultimosTres = imagenProducto.slice(-4);
        const ultimosCuatro = imagenProducto.slice(-4);
        let extPermitidas = /(.jpg|.JPG|.png|.PNG|.jpeg|.JPEG|.jfif|.JFIF)$/i;

        if (!extPermitidas.exec(ultimosCuatro) || !extPermitidas.exec(ultimosTres)) {
            Toast.fire({
                icon: "error",
                title: "¡La imagen del producto no cumple con las validaciones!\n (Solo JPG y PNG)"
            });
            return false;
        }
    }

    return true;
}
function alertaProducto() {
    setTimeout(function () {
        window.location.href = "productos.html";
    }, 2001);
}

