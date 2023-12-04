let btnAgregar = document.getElementById('btnAddPermiso')
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

    let listaPermisos = JSON.parse(localStorage.getItem('permisos')) || [];
    let id
    listaPermisos.length != 0 ? listaPermisos.findLast((permiso) => id = permiso.id) : id = 0

    let nuevoPermiso = {
        id: id + 1,
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
    }
    listaPermisos.push(nuevoPermiso);
    localStorage.setItem('permisos', JSON.stringify(listaPermisos));
    document.getElementById('form').reset();
    Toast.fire({
        icon: "success",
        title: "¡Permiso registrado!"
    });
    alerta()

});
function editarU(id) {
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
    let listaPermisos = JSON.parse(localStorage.getItem('permisos')) || [];
    if (listaPermisos.length !== 0) {
        let permiso = listaPermisos.find(p => p.id == id);
        if (permiso) {
            permiso.nombre = document.getElementById('nombre_editar').value;
            permiso.descripcion = document.getElementById('descripcion_editar').value;
            localStorage.setItem('permisos', JSON.stringify(listaPermisos));
            Toast.fire({
                icon: "success",
                title: "¡Información de permiso editada!"
            });
            alerta()

        }
    }
}

function eliminar(id_p) {
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
    listaPermisos = JSON.parse(localStorage.getItem('permisos')) ?? []
    listaPermisos = listaPermisos.filter(function (permiso) {
        return permiso.id != id_p;
    });
    localStorage.setItem('permisos', JSON.stringify(listaPermisos))
    Toast.fire({
        icon: "success",
        title: "¡Permiso eliminado!"
    });
    alerta();
}


function alerta() {
    setTimeout(function () {
        window.location.href = "permisos.html";
    }, 2001);
}

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