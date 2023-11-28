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

let btn = document.getElementById("registrobtn");

btn.addEventListener("click", function validarProducto(e) {
    var nombreProducto = document.getElementById("nombreP").value;
    var descripcionProducto = document.getElementById("descripcionP").value;
    var precioProducto = document.getElementById("precioP").value;
    var categoriaProducto = document.getElementById("categoriaP").value;
    var imagenProducto = document.getElementById("imagenP").value;
    //Imagen
    let archivoRuta = imagenProducto.value;
    let extPermitidas = /(.jpg|.JPG|.png|.PNG|.jpeg|.JPEG|.jfif|.JFIF)$/i;

    //Alerta
    const Toast = swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    //Validaciones
    if (nombreProducto == "" || descripcionProducto == "" || precioProducto == "" || categoriaProducto == 0 || imagenProducto == "") {

        Toast.fire({
            icon: "error",
            title: "¡Asegurate de llenar todos los campos!"
        })

        e.preventDefault();

    }else{
        if (nombreProducto.length <= 5 || nombreProducto.length > 25) {
            Toast.fire({
                icon: "error",
                title: "¡El Nombre del producto no cumple con las validaciones!\n (Min 5 y Max 25 caracteres)"
            });

            e.preventDefault();
        }
        else if(descripcionProducto.length <= 30 || descripcionProducto.length > 200){
            Toast.fire({
                icon: "error",
                title: "¡La Descripción del producto no cumple con las validaciones!\n (Min 30 y Max 200 caracteres)"
            });

            e.preventDefault();
        }
        else if(precioProducto <= 2000){
            Toast.fire({
                icon: "error",
                title: "¡El Precio del producto no cumple con las validaciones!\n (Min 2.000 Pesos)"
            });

            e.preventDefault();

        }
    
    }
});

//Validar imagen
function validararchivo() {
    //Alerta
    const Toast = swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    let archivoInput = document.getElementById("imagenP");
    let archivoRuta = archivoInput.value;
    let extPermitidas = /(.jpg|.JPG|.png|.PNG|.jpeg|.JPEG|.jfif|.JFIF)$/i;
    let prevImagen = document.getElementById("visorarchivo");

    if (!extPermitidas.exec(archivoRuta)) {

        Toast.fire({
            icon: "error",
            title: "¡La imagen del producto no cumple con las validaciones!\n (Solo JPG y PNG)"
        });
        archivoInput.value = "";
        prevImagen.innerHTML = ``;
        return false;

    } else {

        if (archivoInput.files && archivoInput.files[0]) {

            let visor = new FileReader();
            visor.onload = function (e) {
                prevImagen.innerHTML =
                    `<embed src='${e.target.result}' width = "70px" height = "70px">`;
            };
            visor.readAsDataURL(archivoInput.files[0]);

        }

    }
}

