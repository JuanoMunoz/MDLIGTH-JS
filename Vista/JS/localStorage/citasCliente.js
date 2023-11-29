let listaCitas = JSON.parse(localStorage.getItem('citas')) || [];

function validarFormulario() {
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
    let nombrePrenda = document.getElementById("nombrePrenda").value;
    let objetivo = document.getElementById("objetivo").value;
    let fecha = document.getElementById("fecha").value;
    // let imagen = document.getElementById("imagen").value;
    let talla = document.getElementById("talla").value;
    let metodoPago = document.getElementById("metodoPago").value;

    if (nombrePrenda = "" || objetivo == "" || fecha == "" || talla == "" || metodoPago == "") {
        Toast.fire({
            icon: "error",
            title: "¡Asegurate de llenar todos los campos!"
        });
        return false;
    } else {
        return true;
    }
}

function crearTablaHTML() {
    let html = "";

    listaCitas.forEach(function (item, index) {
        html += "<tr>";
        html += "<td>" + item.id_cita + "</td>";
        html += "<td>" + item.nombrePrenda + "</td>";
        html += "<td>" + item.objetivo + "</td>";
        html += "<td>" + item.fecha + "</td>";
        // html += "<td>" + item.imagen + "</td>";
        html += "<td>" + item.talla + "</td>";
        html += "<td>" + item.metodoPago + "</td>";
        html += '<td><button onclick="deleteData(' + (index) + ')">Eliminar</button></td>';
        html += '<td><button onclick="editData(' + (index) + ')">Editar</button></td>';
        html += "</tr>";
    });

    document.querySelector('#tablaCitas').innerHTML = html;
}

document.onload = crearTablaHTML();

//Evento click - Agregar cita
function agregarCita() {
    let btnAgendarCita = document.getElementById('agendarCitaCliente');
    btnAgendarCita.addEventListener('click', function iniciar(evento) {
        evento.preventDefault();
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
                // let icon = "error";
                // let titulo = "Cita cancelada";
                // let mensaje = "¡Solo puedes solicitar citas dentro de un rango de tiempo de 2 meses!";
                // alert(titulo + " " + mensaje);
            } else {
                if (fecha < fechaActual.getTime()) {
                    Toast.fire({
                        icon: "error",
                        title: "Cita cancelada. \n¡La fecha y hora que indicaste ya pasaron!"
                    });
                    // let icon = "error";
                    // let titulo = "Cita cancelada";
                    // let mensaje = "¡La fecha y hora que indicaste ya pasaron!";
                    // alert(titulo + " " + mensaje);
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
                        // let icon = "error";
                        // let titulo = "Cita cancelada";
                        // let mensaje = "¡La hora para la que tratas de registrar tu cita se encuentra en el intervalo de tiempo de una cita que ya fue agendada, intenta con otra hora!";
                        // alert(titulo + " " + mensaje);
                    } else {
                        let dia_semana = fechaForm.getDay();
                        switch (dia_semana) {
                            case 0:
                            case 6:
                                Toast.fire({
                                    icon: "error",
                                    title: "Cita cancelada. \n¡Solo se atiende de lunes a viernes!"
                                });
                                // let icon = "error";
                                // let titulo = "Cita cancelada";
                                // let mensaje = "¡Solo se atiende de lunes a viernes!";
                                // alert(titulo + " " + mensaje);
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
                                        // let icono = "error";
                                        // let titulos = "Cita cancelada";
                                        // let mensajes = "¡Debes pedir tu cita con mínimo 3 días de anticipación!";
                                        // alert(titulos + " " + mensajes);
                                    } else {
                                        let nuevaCita = {
                                            id_cita: id_cita + 1,
                                            nombrePrenda: document.getElementById("nombrePrenda").value,
                                            objetivo: document.getElementById("objetivo").value,
                                            fecha: document.getElementById("fecha").value,
                                            // imagen: document.getElementById("imagen").value,
                                            talla: document.getElementById("talla").value,
                                            metodoPago: document.getElementById("metodoPago").value,
                                        };
                                        listaCitas.push(nuevaCita);
                                        localStorage.setItem('citas', JSON.stringify(listaCitas));
                                        Toast.fire({
                                            icon: "success",
                                            title: "¡Nueva cita registrada!"
                                        });
                                        window.location.href = "../../CLIENT/citasCliente.html";
                                        // window.location.href = '../../ADMIN/citasCliente.html';
                                    }
                                } else {
                                    Toast.fire({
                                        icon: "error",
                                        title: "Cita cancelada. \n¡Nuestro horario de atención es de 8 a.m. hasta las 5 p.m!"
                                    });
                                    // let icono = "error";
                                    // let titulos = "Cita cancelada";
                                    // let mensajes = "¡Nuestro horario de atención es de 8 a.m. hasta las 5 p.m!";
                                    // alert(titulos + " " + mensajes);
                                }
                        }

                    }
                }
            }

            function listarTodasLasCitas() {
                return listaCitas;
            }
        }
    })
};

function deleteData(index) {
    listaCitas.splice(index, 1);
    localStorage.setItem('citas', JSON.stringify(listaCitas));
    crearTablaHTML();
}

function editData(index) {
    document.getElementById('agendarCitaCliente').style.display = 'none';
    document.getElementById('editarCitaCliente').style.display = 'block';

    document.getElementById("nombrePrenda").value = listaCitas[index].nombrePrenda;
    document.getElementById("objetivo").value = listaCitas[index].objetivo;
    document.getElementById("fecha").value = listaCitas[index].fecha;
    // document.getElementById("imagen").value = listaCitas[index].imagen;
    document.getElementById("talla").value = listaCitas[index].talla;
    document.getElementById("metodoPago").value = listaCitas[index].metodoPago;

    document.querySelector('#editarCitaCliente').onclick = function () {
        if (validarFormulario() == true) {
            listaCitas[index].nombrePrenda = document.getElementById("nombrePrenda").value;
            listaCitas[index].objetivo = document.getElementById("objetivo").value;
            listaCitas[index].fecha = document.getElementById("fecha").value;
            // listaCitas[index].imagen = document.getElementById("imagen").value;
            listaCitas[index].talla = document.getElementById("talla").value;
            listaCitas[index].metodoPago = document.getElementById("metodoPago").value;

            localStorage.setItem('citas', JSON.stringify(listaCitas));
            crearTablaHTML();

            document.getElementById("nombrePrenda").value = "";
            document.getElementById("objetivo").value = "";
            document.getElementById("fecha").value = "";
            // document.getElementById("imagen").value = "";
            document.getElementById("talla").value = "";
            document.getElementById("metodoPago").value = "";

            document.getElementById('agendarCitaCliente').style.display = 'block';
            document.getElementById('editarCitaCliente').style.display = 'none';

        }
    };
}
