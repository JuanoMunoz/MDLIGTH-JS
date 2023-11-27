
const date = new Date();
const fechaActual = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
const fechaVenta = document.getElementById("fechaVenta");
fechaVenta.value = fechaActual;

const valorDomicilio = 1
const valorPrendas = 2
const valorTotal = valorDomicilio + valorPrendas;

