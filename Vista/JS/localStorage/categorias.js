btnCategoria = document.getElementById("btnCategoria");

//Agregar Categoria
btnCategoria.addEventListener("click", function agregarCategoria(e) {
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

    e.preventDefault();

    if(validarCategoria(e)){
        let listaCategorias = JSON.parse(localStorage.getItem('categorias')) || [];
        let idCategoria
        listaCategorias.length != 0 ? listaCategorias.findLast((categoria) => idCategoria = categoria.idCategoria) : idCategoria = 0

        
        let nuevaCategoria= {
            idCategoria: idCategoria + 1,
            nombreCategoria: document.getElementById('nombreCategoria').value,
            descripcionCategoria: document.getElementById('descripcionCategoria').value,
        }
        listaCategorias.push(nuevaCategoria);
        localStorage.setItem('categorias', JSON.stringify(listaCategorias));
        document.getElementById('form').reset();

        Toast.fire({
            icon: "success",
            title: "¡Categoría registrada!"
        });
        alertaCategoria()
    }
});

//Editar
function editarCategoria(idCategoria, e) {
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

    if (validarCategoriaEditar(e)) {
        let listaCategorias = JSON.parse(localStorage.getItem('categorias')) || [];
        if(listaCategorias.length !== 0){
            let categoria = listaCategorias.find(categoria => categoria.idCategoria == idCategoria);
            if(categoria){
                categoria.nombreCategoria = document.getElementById('nombreCategoriaEditar').value;
                categoria.descripcionCategoria = document.getElementById('descripcionCategoriaEditar').value;

                localStorage.setItem('categorias', JSON.stringify(listaCategorias));
                Toast.fire({
                    icon: "success",
                    title: "¡Información de la categoria editada!"
                });
                alertaCategoria();

            }

        }

    }

}

//Eliminar
function eliminarCategoria(idCategoria) {
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

    listaCategorias = JSON.parse(localStorage.getItem('categorias')) ?? []
    listaCategorias = listaCategorias.filter(function (categoria) {
        return categoria.idCategoria != idCategoria;
    });
    localStorage.setItem('categorias', JSON.stringify(listaCategorias))
    Toast.fire({
        icon: "success",
        title: "¡Categoria eliminada!"
    });
    alertaCategoria();
}

// Validdciones
function validarCategoria(e) {

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

    nombreCategoria = document.getElementById("nombreCategoria").value;
    descripcionCategoria = document.getElementById("descripcionCategoria").value;

    if (nombreCategoria == "" || descripcionCategoria == "") {

        Toast.fire({
            icon: "error",
            title: "¡Asegurate de llenar todos los campos!"
        });
        e.preventDefault();
        return false;

    }else{
        if (descripcionCategoria.length < 10) {
            Toast.fire({
                icon: "error",
                title: "¡La descripción de la categoría no cumple con las validaciones! (Min 10 Caracteres)"
            });

            e.preventDefault();
            return false;
        }

    }

    return true;
}
function validarCategoriaEditar(e) {

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

    nombreCategoria = document.getElementById("nombreCategoriaEditar").value;
    descripcionCategoria = document.getElementById("descripcionCategoriaEditar").value;

    if (nombreCategoria == "" || descripcionCategoria == "") {

        Toast.fire({
            icon: "error",
            title: "¡Asegurate de llenar todos los campos!"
        });
        e.preventDefault();
        return false;

    }else{
        if (descripcionCategoria.length < 10) {
            Toast.fire({
                icon: "error",
                title: "¡La descripción de la categoría no cumple con las validaciones! (Min 10 Caracteres)"
            });

            e.preventDefault();
            return false;
        }

    }

    return true;
}
function alertaCategoria() {
    setTimeout(function () {
        window.location.href = "categorias.html";
    }, 2001);
}
