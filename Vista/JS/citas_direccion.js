const select_direccion = document.getElementById("select_direccion");
const label_direccion = document.getElementById("label_direccion");
const input_direccion = document.getElementById("input_direccion")

select.addEventListener("change", function () {
if (select_direccion.value === "opcion1") {
    label_direccion.classList.remove("direccion")
    input_direccion.classList.remove("direccion")
} else {
}
});