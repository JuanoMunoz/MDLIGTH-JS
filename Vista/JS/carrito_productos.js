const contenedorProductos = document.querySelector("#filaMostrador");
const descripcion = document.querySelector("#descripcion");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
// const tituloPrincipal = document.querySelector(".boton-categoria") 1.20 - 23
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

const productosArray = [
    {
        id: "1001",
        titulo: "Vestido Otoño",
        imagen: "./MEDIA/IMG/Productos/vestido_otoño.jpg",
        categoria: {
            nombre: "Vestidos",
            id: "vestidos"
        },
        precio: 120000,
        descripcion: "descripción del modelo 01"
    },
    {
        id: "1002",
        titulo: "Chaqueta de cuero",
        imagen: "./MEDIA/IMG/Productos/chaqueta_cuero.jpg",
        categoria: {
            nombre: "Chaquetas",
            id: "chaquetas"
        },
        precio: 60000,
        descripcion: "descripción del modelo 02"
    }
];

function productosCargados(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        // div.classList.add("item");
        div.innerHTML = `
        <div class="item" onclick="cargar(this)">
        <div class="contenedor-foto">
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <p class="descripcion">${producto.titulo}</p>
            <span class="precio">${producto.precio}</span>
        </div>
        </div>`;

        div.addEventListener("click", function() {
            mostrarDescripcion(producto);
        });

        contenedorProductos.append(div);
        
    })

    actualizarBotonesAgregar();
}

function mostrarDescripcion(producto){
    descripcion.innerHTML = `<img src="${producto.imagen}" alt="${producto.titulo}" id="img">
    <h2 id="modelo">${producto.titulo}</h2>
    <p id="descripcion">${producto.descripcion}</p>

    <span class="precio" id="precio">${producto.precio}</span>
    <div class="fila">
        <div class="size">
            <label for="">Talla</label>
            <select name="" id="">
                <option value="">S</option>
                <option value="">M</option>
                <option value="">L</option>
                <option value="">XL</option>
            </select>
        </div>
        <div class="quantity">
            <label for="">Cantidad</label>
            <input type="number" id="" value="1" min="1" max="100" step="1">
        </div>
        <button class="producto-agregar" id="${producto.id}">Agregar al Carrito</button>
    </div>`;
}

productosCargados(productosArray);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active-botton"));
        e.currentTarget.classList.add("active-botton");

        if (e.currentTarget.id != "todos"){
            const productosBoton = productosArray.filter(producto => producto.categoria.id === e.currentTarget.id);
            productosCargados(productosBoton);
        } else {
            productosCargados(productosArray)
        }
    })
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-Agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

const productosEnCarrito = [];

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productosArray.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}




