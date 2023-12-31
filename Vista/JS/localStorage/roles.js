// OBTENER NOMBRE DEL FORMULARIO Y VALIDAR CADENA VACÍO, MÍNIMO Y MÁXIMO DE CARÁCTERES.
let form = document.getElementById("form");

form.addEventListener('submit', e => {
    e.preventDefault()
    let formNombre = document.getElementById("nombre").value;
    const permisosSeleccionados = Array.from(document.querySelectorAll('input[name="permisos"]:checked'))
        .map(checkbox => checkbox.value);
    formNombre == "" ? alertaPersonalizada("error", "Nombre vacío")
        : formNombre.length < 4 || formNombre.length > 20
            ? alertaPersonalizada("error", "Mínimo 4 y máximo 20 carácteres")
            : permisosSeleccionados.length <= 0 ? alertaPersonalizada("error", "Debes seleccionar mínimo un (1) permiso") : addRol(formNombre, permisosSeleccionados);
})

//Función añadir rol, valida el ls y devuelve como json el array de roles lleno de objetos rol (o no), además, Con el nombre podemos agregar un nuevo rol
function addRol(nombre, permisos) {
    let listaRoles = JSON.parse(localStorage.getItem("Roles")) ?? [];
    let id;
    (listaRoles.length != 0) ? id = listaRoles.length + 1 : id = 1;
    let nuevoRol = {
        id: id,
        nombre: nombre,
        permisos: permisos
    }
    listaRoles.push(nuevoRol);
    localStorage.setItem("Roles", JSON.stringify(listaRoles));
    alertaPersonalizada("success", "Rol agregado correctamente", true, "1000")
}

//Función borrar rol{
function borrarRol() {
    modalEliminar.showModal();
    let modal = document.getElementById('confirmDelete');
    let listaRoles = JSON.parse(localStorage.getItem('Roles')) || [];
    listaRoles.forEach(rol => {
        if (rol.id == id) {
            modal.innerHTML += `
                                <h3>¿Estás seguro que deseas eliminar este rol?</h3><br>
                                <button onclick="deleteData(${rol.id})">Eliminar cita</button>
                                `
        }
    });
}


//Sweet alert pesonalizado
function alertaPersonalizada(icon, text, redirect = false, timer = 2000) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    })
    Toast.fire({
        icon: icon,
        title: text,
    });
    if (redirect) {
        setTimeout(function () {
            window.location.href = "roles.html";
        }, timer);
    }
}
function editarR(id) {

    let listaRol = JSON.parse(localStorage.getItem('Roles')) || [];
    if (listaRol.length !== 0) {
        let rol = listaRol.find(r => r.id == id);
        if (rol) {
            let nombreForm = document.getElementById('nombre_editar').value
            nombreForm.length == 0 ? alertaPersonalizada("error", "Nombre vacío") : nombreForm.length < 4 || nombreForm.length > 20
                ? alertaPersonalizada("error", "Mínimo 4 y máximo 20 carácteres")
                : edit(rol, nombreForm)
            function edit(rol, nombreForm) {
                rol.nombre = nombreForm
                localStorage.setItem('Roles', JSON.stringify(listaRol));
                alertaPersonalizada("success", "¡Rol editado con éxito!", true, 1000)
            }


        }
    }
}

function eliminar(id) {

    listaRoles = JSON.parse(localStorage.getItem('Roles')) ?? []
    listaRoles = listaRoles.filter(function (Roles) {
        return Roles.id != id;
    });
    localStorage.setItem('Roles', JSON.stringify(listaRoles))
    alertaPersonalizada("success", "Rol eliminado!", true, 1000)
}

//MOSTRAR INFORMACIÓN EN LA TABLA ROLES

document.addEventListener("DOMContentLoaded", () => {
    let listaRoles = JSON.parse(localStorage.getItem("Roles")) ?? []
    let rolTable = document.getElementById("rolTable");
    listaRoles.forEach(rol => {
        rolTable.innerHTML += `
         <tr>
                <td>${rol.id}</td>
                <td>${rol.nombre}</td>
                <td class="btn-abrir-modal-editar" onclick="abrirModalPermisos(${rol.id})"><img class="table_img" src="../../MEDIA/IMG/doc.png" alt=""></td>
                <td class="btn-abrir-modal-editar" onclick="abrirModalEditar(${rol.id})"><img class="table_img" src="../../MEDIA/IMG/editar.png" alt=""></td>
                <td class="btn-abrir-modal-eliminar" onclick="ModalEliminar(${rol.id})"><img class="table_img" src="../../MEDIA/IMG/basura.png" alt=""></td>
        </tr>
                                    
            `
    });
})

document.addEventListener("DOMContentLoaded", () => {
    let listaUser = JSON.parse(localStorage.getItem("usuarios")) ?? []
    let usuarioId = sessionStorage.getItem("usuarioId")
    let usuario = listaUser.find(usuario => usuario.id == usuarioId)
    if (typeof usuario != "undefined") {
        if (usuario.rol != "Admin") window.location.href = "noAutorizado.html";
    } else {
        window.location.href = "noAutorizado.html"
    }
})

