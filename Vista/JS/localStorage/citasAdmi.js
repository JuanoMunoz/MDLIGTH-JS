let listaCitas = JSON.parse(localStorage.getItem('citas')) || [];

const getToast = () => Swal.mixin({ toast: true, position: "top-end", showConfirmButton: false, timer: 2000, timerProgressBar: true, didOpen: (toast) => { toast.onmouseenter = Swal.stopTimer; toast.onmouseleave = Swal.resumeTimer; } });

function validarFormulario() {
    const Toast = getToast();

    let nombrePrenda = document.getElementById("nombrePrenda").value;
    let objetivo = document.getElementById("objetivo").value;
    let fecha = document.getElementById("fecha").value;
    let imagen = document.getElementById("imagen").value;
    let talla = document.getElementById("talla").value;
    let metodoPago = document.getElementById("metodoPago").value;

    if (nombrePrenda = "" || objetivo == "" || fecha == "" || imagen == "" || talla == "" || metodoPago == "") {
        Toast.fire({
            icon: "error",
            title: "¡Asegurate de llenar todos los campos!"
        });
        return false;
    }

    //Imagen
    const ultimosTres = imagen.slice(-4);
    const ultimosCuatro = imagen.slice(-4);
    let extPermitidas = /(.jpg|.JPG|.png|.PNG|.jpeg|.JPEG|.jfif|.JFIF)$/i;

    if (!extPermitidas.exec(ultimosCuatro) || !extPermitidas.exec(ultimosTres)) {
        Toast.fire({
            icon: "error",
            title: "¡La imagen del producto no cumple con las validaciones!\n (Solo JPG y PNG)"
        });
        return false;
    }

    return true;
}

function alerta() {
    setTimeout(function () {
        window.location.href = "citasPanel.html";
    }, 2001);
}

// function crearTablaHTML() {
//     let html = "";

//     listaCitas.forEach(function (item, index) {
//         html += "<tr>";
//         html += "<td>" + item.id_cita + "</td>";
//         html += "<td>" + item.nombrePrenda + "</td>";
//         html += "<td>" + item.objetivo + "</td>";
//         html += "<td>" + item.fecha + "</td>";
//         // html += "<td>" + item.imagen + "</td>";
//         html += "<td>" + item.talla + "</td>";
//         html += "<td>" + item.metodoPago + "</td>";
//         html += '<td><button onclick="deleteData(' + (index) + ')">Eliminar</button></td>';
//         html += '<td><button onclick="editData(' + (index) + ')">Editar</button></td>';
//         html += "</tr>";
//     });

//     document.querySelector('#tablaCitas').innerHTML = html;
// }

// document.onload = crearTablaHTML();

//Evento click - Agregar cita

function agregarCita(evento) {
    evento.preventDefault();

    const Toast = getToast();

    // let id_cita = listaCitas.length != 0 ? listaCitas.findLast((cita) => id_cita = cita.id_cita) : id_cita = 0;
    let id_cita = listaCitas.length > 0 ? listaCitas[listaCitas.length - 1].id_cita : 0;
    if (validarFormulario()) {
        let fechaForm = new Date(document.getElementById("fecha").value);
        let fecha = fechaForm.getTime();
        let fechaActual = new Date();
        let fecha2meses = new Date(fechaActual);
        fecha2meses.setMonth(fecha2meses.getMonth() + 2);
        let limiteFecha = fecha2meses.getTime();

        if (fecha > limiteFecha) {
            Toast.fire({
                icon: "error",
                title: "Cita cancelada. \n¡Solo puedes solicitar citas dentro de un rango de tiempo de 2 meses!"
            });
        } else {
            if (fecha < fechaActual.getTime()) {
                Toast.fire({
                    icon: "error",
                    title: "Cita cancelada. \n¡La fecha y hora que indicaste ya pasaron!"
                });
            } else {
                let citasExist = listarTodasLasCitas();
                let minima = new Date(fecha - 2 * 60 * 60 * 1000);
                let maxima = new Date(fecha + 2 * 60 * 60 * 1000);

                let conflicto = citasExist.some(cita => cita.fecha > minima.getTime() && cita.fecha < maxima.getTime());
                if (conflicto) {
                    Toast.fire({
                        icon: "error",
                        title: "Cita cancelada. \n¡La hora para la que tratas de registrar tu cita se encuentra en el intervalo de tiempo de una cita que ya fue agendada, intenta con otra hora!"
                    });
                } else {
                    let dia_semana = fechaForm.getDay();
                    switch (dia_semana) {
                        case 0:
                        case 6:
                            Toast.fire({
                                icon: "error",
                                title: "Cita cancelada. \n¡Solo se atiende de lunes a viernes!"
                            });
                            break;
                        default:
                            let hora = fechaForm.getHours();
                            if (hora >= 8 && hora <= 17) {
                                let dias = new Date(fechaActual);
                                dias.setDate(dias.getDate() + 3);
                                if (fecha < dias.getTime()) {
                                    Toast.fire({
                                        icon: "error",
                                        title: "Cita cancelada. \n¡Debes pedir tu cita con mínimo 3 días de anticipación!"
                                    });
                                } else {
                                    let nuevaCita = {
                                        id_cita: id_cita + 1,
                                        nombrePrenda: document.getElementById("nombrePrenda").value,
                                        objetivo: document.getElementById("objetivo").value,
                                        fecha: document.getElementById("fecha").value,
                                        imagen: document.getElementById("imagen").value,
                                        talla: document.getElementById("talla").value,
                                        metodoPago: document.getElementById("metodoPago").value,
                                    };
                                    listaCitas.push(nuevaCita);
                                    localStorage.setItem('citas', JSON.stringify(listaCitas));
                                    Toast.fire({
                                        icon: "success",
                                        title: "¡Nueva cita registrada!"
                                    });
                                    setTimeout(function () {
                                        alerta()
                                    }, 2001);
                                }
                            } else {
                                Toast.fire({
                                    icon: "error",
                                    title: "Cita cancelada. \n¡Nuestro horario de atención es de 8 a.m. hasta las 5 p.m!"
                                });
                            }
                    }

                }
            }
        }
        alerta();
        modalAgregar.close();

        function listarTodasLasCitas() {
            return listaCitas;
        }
    }
};

function deleteData(id) {
    // const index = listaCitas.findIndex(cita => cita.id_cita == id);
    // listaCitas.splice(index, 1);

    const Toast = getToast();

    const nuevoStorage = listaCitas.filter(cita => cita.id_cita != id);
    listaCitas = [...nuevoStorage];
    localStorage.setItem('citas', JSON.stringify(listaCitas));
    
    Toast.fire({
        icon: "success",
        title: "¡Cita eliminada!"
    });
    setTimeout(function () {
        alerta();
        modalEliminar.close();
    }, 2001);
    
}

function editData(id) {

    const Toast = getToast();

    // let id_cita = listaCitas.length != 0 ? listaCitas.findLast((cita) => id_cita = cita.id_cita) : id_cita = 0;
    let id_cita = listaCitas.length > 0 ? listaCitas[listaCitas.length - 1].id_cita : 0;

        let fechaForm = new Date(document.getElementById("fechaEdit").value);
        let fecha = fechaForm.getTime();
        let fechaActual = new Date();
        let fecha2meses = new Date(fechaActual);
        fecha2meses.setMonth(fecha2meses.getMonth() + 2);
        let limiteFecha = fecha2meses.getTime();

        if (fecha > limiteFecha) {
            Toast.fire({
                icon: "error",
                title: "Cita cancelada. \n¡Solo puedes solicitar citas dentro de un rango de tiempo de 2 meses!"
            })
        } else {
            if (fecha < fechaActual.getTime()) {
                Toast.fire({
                    icon: "error",
                    title: "Cita cancelada. \n¡La fecha y hora que indicaste ya pasaron!"
                });
            } else {
                let citasExist = listarTodasLasCitas();
                let minima = new Date(fecha - 2 * 60 * 60 * 1000);
                let maxima = new Date(fecha + 2 * 60 * 60 * 1000);

                let conflicto = citasExist.some(cita => cita.fecha > minima.getTime() && cita.fecha < maxima.getTime());
                if (conflicto) {
                    Toast.fire({
                        icon: "error",
                        title: "Cita cancelada. \n¡La hora para la que tratas de registrar tu cita se encuentra en el intervalo de tiempo de una cita que ya fue agendada, intenta con otra hora!"
                    });
                } else {
                    let dia_semana = fechaForm.getDay();
                    switch (dia_semana) {
                        case 0:
                        case 6:
                            Toast.fire({
                                icon: "error",
                                title: "Cita cancelada. \n¡Solo se atiende de lunes a viernes!"
                            });
                            break;
                        default:
                            let hora = fechaForm.getHours();
                            if (hora >= 8 && hora <= 17) {
                                let dias = new Date(fechaActual);
                                dias.setDate(dias.getDate() + 3);
                                if (fecha < dias.getTime()) {
                                    Toast.fire({
                                        icon: "error",
                                        title: "Cita cancelada. \n¡Debes pedir tu cita con mínimo 3 días de anticipación!"
                                    });
                                } else {
                                    const actualizacion = {
                                        id_cita: id,
                                        nombrePrenda: document.getElementById('nombrePrendaEdit').value,
                                        objetivo: document.getElementById('objetivoEdit').value,
                                        fecha: document.getElementById('fechaEdit').value,
                                        imagen: document.getElementById('imagenEdit').value,
                                        talla: document.getElementById('tallaEdit').value,
                                        metodoPago: document.getElementById('metodoPagoEdit').value
                                    }

                                    const index = listaCitas.findIndex(ct => ct.id_cita == id);
                                    listaCitas[index] = actualizacion;
                                    localStorage.setItem('citas', JSON.stringify(listaCitas));
                                    Toast.fire({
                                        icon: "success",
                                        title: "¡Se han modificado los datos!"
                                    });
                                    setTimeout(function () {
                                        alerta()
                                    }, 2001);
                                }
                            } else {
                                Toast.fire({
                                    icon: "error",
                                    title: "Cita cancelada. \n¡Nuestro horario de atención es de 8 a.m. hasta las 5 p.m!"
                                });                                
                            }
                    }

                }
            }
        }
        modalEditar.close();
        alerta();

        function listarTodasLasCitas() {
            return listaCitas;
        }
    


}

