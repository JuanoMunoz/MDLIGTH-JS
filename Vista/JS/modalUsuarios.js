//Modal agregar

const btnAbrirModalAgregar = document.querySelector("#btn-abrir-modal-agregar");
const btnCerrarModalAgregar = document.querySelector('#btn-cerrar-modal-agregar');
const modalAgregar = document.querySelector("#modal-agregar");


btnAbrirModalAgregar.addEventListener("click", ()=>{
    modalAgregar.showModal();
})

btnCerrarModalAgregar.addEventListener("click", ()=>{
    modalAgregar.close();
})

//Modal editar

const btnAbrirModalEditar = document.querySelector("#btn-abrir-modal-editar");
const btnCerrarModalEditar = document.querySelector('#btn-cerrar-modal-editar');
const modalEditar = document.querySelector("#modal-editar");

btnAbrirModalEditar.addEventListener("click", ()=>{
    modalEditar.showModal();
})

btnCerrarModalEditar.addEventListener("click", ()=>{
    modalEditar.close();
})

//Modal eliminar

const btnAbrirModalEliminar = document.querySelector("#btn-abrir-modal-eliminar");
const btnCerrarModalEliminar = document.querySelector('#btn-cerrar-modal-eliminar');
const modalEliminar = document.querySelector("#modal-eliminar");

btnAbrirModalEliminar.addEventListener("click", ()=>{
    modalEliminar.showModal();
})

btnCerrarModalEliminar.addEventListener("click", ()=>{
    modalEliminar.close();
})