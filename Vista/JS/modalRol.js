// Modal agregar
const btnAbrirModalAgregar = document.querySelector("#btn-abrir-modal-agregar");
const btnCerrarModalAgregar = document.querySelector('#btn-cerrar-modal-agregar');
const modalAgregar = document.querySelector("#modal-agregar");

btnAbrirModalAgregar.addEventListener("click", () => {
    modalAgregar.showModal();
});

btnCerrarModalAgregar.addEventListener("click", () => {
    modalAgregar.close();
});



function cerrarModalEditar() {
    document.getElementById('modal-editar').close();
}

// Modal eliminar

function cerrarModalEliminar() {
    document.getElementById("modal-eliminar").close()
}
