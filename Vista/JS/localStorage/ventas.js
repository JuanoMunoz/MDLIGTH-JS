
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
document.addEventListener("DOMContentLoaded", () => {
    let listaUser = JSON.parse(localStorage.getItem("usuarios")) ?? []
    let usuarioId = sessionStorage.getItem("usuarioId")
    let usuario = listaUser.find(usuario => usuario.id == usuarioId)
    if (typeof usuario != "undefined") {
        if (usuario.rol != "Admin") window.location.href = "noAutorizado.html";
    } else {
        window.location.href = "noAutorizado.html"
    }

})
