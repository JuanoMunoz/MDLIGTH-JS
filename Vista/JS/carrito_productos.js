document.addEventListener("DOMContentLoaded", function () {
    const numerito = document.querySelector("#numerito");
    const carritoContenedor = document.getElementById("carritoContenedor");
    const botonesCategoria = document.querySelectorAll(".boton-categoria");

    let listaProductos = JSON.parse(localStorage.getItem('productos')) || [];
    let productosCarrito = JSON.parse(localStorage.getItem('productosCarrito')) || [];

    function mostrarProductos() {
        let mostrador = document.getElementById("filaMostrador");
        mostrador.innerHTML = "";

        listaProductos.forEach(function (producto) {
            mostrador.innerHTML += `
            <div class="item ${producto.categoria}">
                <div class="contenedor-foto">
                    <img src="${producto.imagen}" alt="">
                    <p class="descripcion">${producto.nombreProducto}</p>
                    <input type="hidden" value="${producto.idProducto}" id="idProducto">
                    <p class="descripcionProducto">${producto.descripcion}</p>
                    <span class="precio">$${producto.precio}</span>
                    <div class="fila">
                        <div class="size">
                            <select name="talla" class="tallaSelect" data-producto-id="${producto.idProducto}">
                                <option value="">Talla</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="2XL">2XL</option>
                            </select>
                        </div>
                        <button class="producto-agregar" data-producto-id="${producto.idProducto}"><i class="fa-solid fa-cart-shopping"></i></button>
                    </div>
                </div>
            </div>
            `;
        });

        actualizarTallas();
    }

    function actualizarTallas() {
        const tallasSelect = document.querySelectorAll(".tallaSelect");

        tallasSelect.forEach(select => {
            select.addEventListener("change", function (e) {
                const idProducto = e.currentTarget.getAttribute("data-producto-id");
                const producto = listaProductos.find(producto => producto.idProducto === parseInt(idProducto));

                if (producto) {
                    producto.talla = e.currentTarget.value;
                } else {
                    console.log("Producto no encontrado");
                }
            });
        });
    }

    function agregarAlCarrito(e) {
        const idProducto = e.currentTarget.getAttribute("data-producto-id");
        const tallaSelect = document.querySelector(`.tallaSelect[data-producto-id="${idProducto}"]`);
        const tallaSeleccionada = tallaSelect.value;

        const productoSeleccionado = listaProductos.find(producto => producto.idProducto === parseInt(idProducto) && producto.talla === tallaSeleccionada);

        if (productoSeleccionado) {
            agregarProductoAlCarrito(productoSeleccionado);
            actualizarNumerito();
            mostrarCarrito();
        } else {
            console.log("Producto no encontrado");
        }
    }

    function agregarProductoAlCarrito(producto) {
        const tallaSelect = document.querySelector(`.tallaSelect[data-producto-id="${producto.idProducto}"]`);
        const tallaSeleccionada = tallaSelect.value;

        const productoEnCarrito = {
            idProducto: producto.idProducto,
            talla: tallaSeleccionada,
            cantidad: 1,
            nombreProducto: producto.nombreProducto,
            descripcion: producto.descripcion,
            precio: producto.precio,
            imagen: producto.imagen,
            categoria: producto.categoria
        };

        const index = productosCarrito.findIndex(item => item.idProducto === productoEnCarrito.idProducto && item.talla === productoEnCarrito.talla);

        if (index !== -1) {
            productosCarrito[index].cantidad++;
        } else {
            productosCarrito.push(productoEnCarrito);
        }

        localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito));
    }

    function actualizarNumerito() {
        let nuevoNumero = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numerito.innerHTML = nuevoNumero;
    }

    function mostrarCarrito() {
        carritoContenedor.innerHTML = "";

        productosCarrito.forEach(function (producto) {
            carritoContenedor.innerHTML += `
            <div class="item-carrito">
                <img src="${producto.imagen}" alt="">
                <div class="info-carrito">
                    <p class="nombre-carrito">${producto.nombreProducto}</p>
                    <p class="talla-carrito">Talla: ${producto.talla}</p>
                    <p class="precio-carrito">$${producto.precio}</p>
                    <p class="cantidad-carrito">Cantidad: ${producto.cantidad}</p>
                </div>
            </div>
            `;
        });
    }

    // Función para filtrar productos por categoría
    // Función para filtrar productos por categoría
function filtrarProductos(categoria) {
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        if (categoria === 'Todos' || item.classList.contains(categoria)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}


    // Llamada a la función de mostrar productos al cargar la página
    mostrarProductos();

    // Agrega el evento de clic a cada botón de categoría
    botonesCategoria.forEach(boton => {
        boton.addEventListener("click", function () {
            const categoria = boton.id;
            filtrarProductos(categoria);
        });
    });

    const botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
});
