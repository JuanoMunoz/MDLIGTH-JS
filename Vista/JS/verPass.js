//VER CONTRASEÑA
const visible = document.getElementById("visible");

visible.addEventListener("click", toggleVisible);

function toggleVisible() {
    const contraseña = document.getElementById("password");
    const icono = document.getElementById("icono");

    icono.classList.toggle("fa-eye-slash");

    if (contraseña.type === "password") {
        contraseña.type = "text";
    }
    else{
        contraseña.type = "password";
    }
};