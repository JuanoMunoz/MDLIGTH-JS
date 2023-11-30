
let listaRoles = JSON.parse(localStorage.getItem("roles")) ?? [];
let id;
let nombre = "Admin";
(listaRoles.length != 0) ? id = listaRoles.length : id = 0;
let nuevoRol = {
    id: id,
    nombre: nombre,
}
listaRoles.push(nuevoRol);
localStorage.setItem("Roles", JSON.stringify(listaRoles));

console.log(listaRoles)


//Próximo paso, hacer un addeventListeneer que capture datos y haga psuh a listaRoles