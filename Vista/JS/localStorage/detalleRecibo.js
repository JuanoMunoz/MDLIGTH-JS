let listaDetalle = JSON.parse(localStorage.getItem('detalleRecibo')) || [];

const toast = () => Swal.mixin({ toast: true, position: "top-end", showConfirmButton: false, timer: 2000, timerProgressBar: true, didOpen: (toast) => { toast.onmouseenter = Swal.stopTimer; toast.onmouseleave = Swal.resumeTimer; } });

function validarFormularioDetalles(id) {
    const Toast = getToast();

    let medidas = document.getElementById("medidas"+id).value;
    let domicilio = document.getElementById("domicilio"+id).value;

    if (medidas == "" || domicilio == "") {
        Toast.fire({
            icon: "error",
            title: "¡Asegurate de llenar todos los campos!"
        });
        return false;
    }

    return true;
}

function alerta() {
    setTimeout(function () {
        window.location.href = "citasAdmi.html";
    }, 2001);
}

function agregarDetalle(idCita) {
    const Toast = toast();
    let id_detalleRecibo = listaDetalle.length > 0 ? listaDetalle[listaDetalle.length - 1].id_detalleRecibo : 0;

    if (validarFormularioDetalles(idCita)) {

        const id_detalleRecibo = idCita;
        const medidas = document.getElementById("medidas"+idCita).value;
        const domicilio = document.getElementById("domicilio"+idCita).value;
        const direccion = document.getElementById("direccion"+idCita).value;

        if (domicilio == 1 && direccion == "") {
            Toast.fire({
                icon: "error",
                title: "¡Asegurate de diligenciar tu dirección para realizar el domicilio!"
            });
            return;
        }

        listaDetalle.push({ id_detalleRecibo, medidas, domicilio, direccion });
        localStorage.setItem('detalleRecibo', JSON.stringify(listaDetalle));
        Toast.fire({
            icon: "success",
            title: "¡Nuevo detalle de recibo registrado!"
        });
    }
    alerta();
};

function detalleExistente(id){
    
    if (listaDetalle != null && listaDetalle.length){
        const find = listaDetalle.find(dt => dt.id_detalleRecibo == id);
        return find;
    }
    
}

function editarDetalle(id) {
    const Toast = toast();

    if (listaDetalle == null) return;

    const index = listaDetalle.findIndex(dt => dt.id_detalleRecibo == id);

    const actualizacion = {
        //Copia del objeto lista detalle
        ...listaDetalle[index],
        medidas: document.getElementById("medidas"+id).value,
        domicilio: document.getElementById("domicilio"+id).value,
        direccion: document.getElementById("direccion"+id).value
    }

    listaDetalle[index] = actualizacion;

    localStorage.setItem('detalleRecibo', JSON.stringify(listaDetalle));

    Toast.fire({
        icon: "success",
        title: "¡Detalle de recibo editado con éxito!"
    });
    alerta();
}
