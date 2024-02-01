const contadorCarrito = document.querySelector("#contadorCarrito");
const carritoHTML = document.querySelector("#carrito");
const listaCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carrito = new Carrito(listaCarrito);
if (carrito.contarUnidades()) {
  contadorCarrito.innerText = carrito.contarUnidades();
} else {
  contadorCarrito.remove();
  carritoHTML.style.marginTop = 0;
}
