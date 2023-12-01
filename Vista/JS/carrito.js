const productosCarrito = JSON.parse(localStorage.getItem("productosCarrito"));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");

const modal = document.getElementById("modal");
const modalConfirmar = document.getElementById("modal-confirmar");
const modalCancelar = document.getElementById("modal-cancelar");

function cargarProductosCarrito() {
    if (productosCarrito && productosCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `<img class="carrito-producto-imagen" src="${producto.imagen}" alt="">
        
            <div class="carrito-producto-titulo">
                <small>Nombre</small>
                <h3>${producto.nombreProducto}</h3>
            </div>
        
            <div class="carrito-producto-cantidad">
                <small>cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
        
            <div class="carrito-producto-precio">
                <small>talla</small>
                <p>${producto.talla}</p>
            </div>
        
            <div class="carrito-producto-precio">
                <small>precio</small>
                <p>$${producto.precio}</p>
            </div>
        
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" data-id="${producto.idProducto}" data-talla="${producto.talla}">Eliminar</button>`;

            const cantidadProducto = producto.cantidad;
            const botonEliminar = div.querySelector(".carrito-producto-eliminar");

            botonEliminar.addEventListener("click", () => eliminarDelCarrito(producto));
            contenedorCarritoProductos.append(div);
        });

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    actualizarTotal();
}

function mostrarModalEliminar(confirmarEliminar) {
    modal.style.display = "block";

    modalConfirmar.addEventListener("click", () => {
        modal.style.display = "none";
        confirmarEliminar(true);
    });

    modalCancelar.addEventListener("click", () => {
        modal.style.display = "none";
        confirmarEliminar(false);
    });
}

function eliminarDelCarrito(producto) {
    const confirmarEliminar = confirmacion => {
        if (confirmacion) {
            const index = productosCarrito.findIndex(
                p => p.idProducto === producto.idProducto && p.talla === producto.talla
            );

            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                productosCarrito.splice(index, 1);
            }

            localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
            cargarProductosCarrito();
            actualizarTotal();
        }
    };

    if (producto.cantidad === 1) {
        mostrarModalEliminar(confirmarEliminar);
    } else {
        confirmarEliminar(true);
    }
}

function actualizarTotal() {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    const totalElement = document.querySelector("#total");  // Cambiado a #total

    if (totalElement) {
        totalElement.innerText = `$${totalCalculado}`;
    } else {
        console.error("No se encontró el elemento del total.");
    }
}



cargarProductosCarrito();
