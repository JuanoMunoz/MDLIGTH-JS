let listaDetalle = JSON.parse(localStorage.getItem('detalleRecibo')) || [];

const toast = () => Swal.mixin({ toast: true, position: "top-end", showConfirmButton: false, timer: 2000, timerProgressBar: true, didOpen: (toast) => { toast.onmouseenter = Swal.stopTimer; toast.onmouseleave = Swal.resumeTimer; } });

function validarFormularioDetalles() {
    const Toast = getToast();

    let medidas = document.getElementById("medidas").value;
    let domicilio = document.getElementById("domicilio").value;

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

function agregarDetalle(){

    console.log('Entre');
    const Toast = toast();
    let id_detalleRecibo = listaDetalle.length > 0 ? listaDetalle[listaDetalle.length - 1].id_detalleRecibo : 0;

    if (validarFormularioDetalles()) {

        let domicilio = document.getElementById("domicilio").value;       

        if (domicilio == "Si") {
            let direccion = document.getElementById("direccion").value;
            if (direccion == "") {
                Toast.fire({
                    icon: "error",
                    title: "¡Asegurate de diligenciar tu dirección para realizar el domicilio!"
                });
            } else {
                let nuevoDetalle = {
                    id_detalleRecibo: id_detalleRecibo + 1,
                    medidas: document.getElementById("medidas").value,
                    domicilio: document.getElementById("domicilio").value,
                    direccion: document.getElementById("direccion").value
                };
                listaDetalle.push(nuevoDetalle);
                localStorage.setItem('detalleRecibo', JSON.stringify(listaDetalle));
                Toast.fire({
                    icon: "success",
                    title: "¡Nuevo detalle de recibo registrado!"
                });
                llenarCampos(nuevoDetalle);
            }
        } else {
            let nuevoDetalle = {
                id_detalleRecibo: id_detalleRecibo + 1,
                medidas: document.getElementById("medidas").value,
                domicilio: document.getElementById("domicilio").value,
                direccion: document.getElementById("direccion").value || ""
            };
            listaDetalle.push(nuevoDetalle);
            localStorage.setItem('detalleRecibo', JSON.stringify(listaDetalle));
            Toast.fire({
                icon: "success",
                title: "¡Nuevo detalle de recibo registrado!"
            });
            llenarCampos(nuevoDetalle);
        }
        alerta();
    }
};

function llenarCampos(detalle) {
    document.getElementById("medidas").value = detalle.medidas;
    document.getElementById("domicilio").value = detalle.domicilio;
    document.getElementById("direccion").value = detalle.direccion || "";
  
    localStorage.setItem('detalleRecibo', JSON.stringify(listaDetalle));
  }


function editarDetalle(id) {
    const Toast = toast();

    const actualizacion = {
        id_detalleRecibo: id,
        medidas: document.getElementById("medidas").value,
        domicilio: document.getElementById("domicilio").value,
        direccion: document.getElementById("direccion").value || ""
    }

    const index = listaDetalle.findIndex(d => d.id_detalleRecibo == id);
    listaDetalle[index] = actualizacion;

    localStorage.setItem('detalleRecibo', JSON.stringify(listaDetalle));

    Toast.fire({
        icon: "success",
        title: "¡Detalle de recibo editado con éxito!"
    });
}
