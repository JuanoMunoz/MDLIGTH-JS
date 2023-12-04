
document.addEventListener("DOMContentLoaded", () => {
    const date = new Date();

    let listaCarrito = JSON.parse(localStorage.getItem("productosCarrito")) ?? ["hols"]
    let main = document.getElementById("main-content")

    main.innerHTML += `${date.toLocaleDateString()} + ${actualizarTotal(listaCarrito)}`
})

function actualizarTotal(productosCarrito) {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    console.log(totalCalculado)
    return totalCalculado
}