let mostrador = document.getElementById("mostrador");
let seleccion = document.getElementById("seleccion");
let imgSelecionada = document.getElementById("img");
let modeloSelecionado = document.getElementById("modelo")
let descripSelecionado = document.getElementById("descripcion");
let precioSelecionado = document.getElementById("precio");
let filaMostrador = document.getElementById("filaMostrador");

function cargar(item) {
    quitarBordes();
    mostrador.style.width = "60%";
    seleccion.style.width = "40%";
    seleccion.style.opacity = "1";
    item.style.background = "#e6e6e6";

    imgSelecionada.src = item.getElementsByTagName("img")[0].src;

    modeloSelecionado.innerHTML = item.getElementsByTagName("p")[0].innerHTML;

    descripSelecionado.innerHTML = "Descripción del modelo";

    precioSelecionado.innerHTML = item.getElementsByTagName("span")[0].innerHTML;

    filaMostrador.style.gridTemplateColumns="repeat(2,1fr)";

}

function quitarBordes() {
    var items = document.getElementsByClassName("item");
    for(i=0; i < items.length; i++){
        items[i].style.background="none";
    }
}

function cerrar() {
    mostrador.style.width = "100%";
    seleccion.style.width = "0";
    seleccion.style.opacity = "0";
    filaMostrador.style.gridTemplateColumns="repeat(4,1fr)";
    quitarBordes();
}