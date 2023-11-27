let btnAgendarCita = document.getElementById('agendarCitaCliente');
btnAgendarCita.addEventListener('click', function iniciar(evento) {
    evento.preventDefault();

    let listaCitas = JSON.parse(localStorage.getItem('citas')) || [];
    // let id_cita = listaCitas.length != 0 ? listaCitas.findLast((cita) => id_cita = cita.id_cita) : id_cita = 0;
    let id_cita = listaCitas.length > 0 ? listaCitas[listaCitas.length - 1].id_cita : 0;

    //Actualizar cita
    if (document.getElementById('id_cita').value) {
        let citaRegistrada = listaCitas.find(c => c.id_cita === parseInt(document.getElementById('id_cita').value));
        if (citaRegistrada) {
            citaRegistrada.objetivo = document.getElementById("objetivo").value;
            citaRegistrada.fecha = document.getElementById("fecha").value;
            // citaRegistrada.hora = document.getElementById("hora").value;
            citaRegistrada.imagen = document.getElementById("imagen").value;
            citaRegistrada.talla = document.getElementById("talla").value;
        }
        document.getElementById('id_cita').value = "";
    } 
    //Agregar cita
    else {
        let fechaForm = new Date(document.getElementById("fecha").value);
        let fecha = fechaForm.getTime();
        let fechaActual = new Date();
        let fecha2meses = new Date(fechaActual);
        fecha2meses.setMonth(fecha2meses.getMonth() + 2);
        let limiteFecha = fecha2meses.getTime();

        if (fecha > limiteFecha) {
            let icon = "error";
            let titulo = "Cita cancelada";
            let mensaje = "¡Solo puedes solicitar citas dentro de un rango de tiempo de 2 meses!";
            alert(titulo + " " + mensaje);
        } else {
            if (fecha < fechaActual.getTime()) {
                let icon = "error";
                let titulo = "Cita cancelada";
                let mensaje = "¡La fecha y hora que indicaste ya pasaron!";
                alert(titulo + " " + mensaje);
            } else {
                let citasExist = listarTodasLasCitas();
                let minima = new Date(fecha - 2 * 60 * 60 * 1000);
                let maxima = new Date(fecha + 2 * 60 * 60 * 1000);

                let conflicto = citasExist.some(cita => cita.fecha > minima.getTime() && cita.fecha < maxima.getTime());

                if (conflicto) {
                    let icon = "error";
                    let titulo = "Cita cancelada";
                    let mensaje = "¡La hora para la que tratas de registrar tu cita se encuentra en el intervalo de tiempo de una cita que ya fue agendada, intenta con otra hora!";
                    alert(titulo + " " + mensaje);
                } else {
                    let dia_semana = fechaForm.getDay();
                    switch (dia_semana) {
                        case 0:
                        case 6:
                            let icon = "error";
                            let titulo = "Cita cancelada";
                            let mensaje = "¡Solo se atiende de lunes a viernes!";
                            alert(titulo + " " + mensaje);
                            break;
                        default:
                            let hora = fechaForm.getHours();
                            if (hora >= 8 && hora <= 17) {
                                let dias = new Date(fechaActual);
                                dias.setDate(dias.getDate() + 3);

                                if (fecha < dias.getTime()) {
                                    let icono = "error";
                                    let titulos = "Cita cancelada";
                                    let mensajes = "¡Debes pedir tu cita con mínimo 3 días de anticipación!";
                                    alert(titulos + " " + mensajes);
                                } else {
                                    let nuevaCita = {
                                        id_cita: id_cita + 1,
                                        objetivo: document.getElementById("objetivo").value,
                                        fecha: document.getElementById("fecha").value,
                                        imagen: document.getElementById("imagen").value,
                                        talla: document.getElementById("talla").value,
                                    };
                                    listaCitas.push(nuevaCita);
                                    localStorage.setItem('citas', JSON.stringify(listaCitas));
                                    // window.location.href = '../../ADMIN/citasCliente.html';
                                }
                            } else {
                                let icono = "error";
                                let titulos = "Cita cancelada";
                                let mensajes = "¡Nuestro horario de atención es de 8 a.m. hasta las 5 p.m!";
                                alert(titulos + " " + mensajes);
                            }
                    }
                
            }
        }
    }}

    function listarTodasLasCitas() {
        return listaCitas;
    }
});
