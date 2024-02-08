const listaProductosSugeridos = document.querySelector(
  ".card-sugeridos-carrito"
);
const itemsCarrito = document.querySelector("#tabla-items-carrito");
const btnVaciarCarrito = document.querySelector("#btn-vaciar-carrito");
const ENDPOINT_DATA = "../js/data.json";

let subtotal = 0;
let totalDescuentos = 0;
let totalImpuestos = 0;
let total = 0;

const getAllProductsByTagSuggested = async () => {
  try {
    const response = await fetch(ENDPOINT_DATA);
    const json = await response.json();
    renderListProducts(json.products.filter((item) => item.suggested));
  } catch (error) {
    swal(
      "Oops! no pudimos cargar los productos, Intente mas tarde!",
      "",
      "error"
    );
  }
};
/* ------- renderiza las card de productos sugeridos ------- */
const renderListProducts = (list) => {
  if (list.length > 0) {
    listaProductosSugeridos.innerHTML = "";
    list.forEach((product) => {
      listaProductosSugeridos.innerHTML += `<div class="card-sugerida">
            <img src="${product.img}" />
            <p>
              ${product.description}
            </p>
            <h2>$${product.price} ${
        product.discountRate > 0 ? " -" + product.discountRate + "%" : ""
      }</h2>
            <div>
              <a id="${
                product.id
              }" class="btn-agregar-al-carrito" type="button">Agregar al carrito</a>
            </div>
          </div>`;
    });

    /* -------------- Agrege el escuchador de eventos a los botones ------------- */
    const btns = document.querySelectorAll(".btn-agregar-al-carrito");
    btns.forEach((btn) => {
      btn.addEventListener("click", agregarAlCarrito);
    });
  } else {
    listaProductosCatalogo.innerHTML = `<h2>¡No se encontraron productos disponibles!</h2>`;
  }
};

const agregarAlCarrito = async (e) => {
  try {
    const response = await fetch(ENDPOINT_DATA);
    const json = await response.json();

    swalCarrito();
    setTimeout(() => {
      const id = e.target.id;
      const product = json.products.find((item) => item.id == id);
      carrito.agregarAlCarrito(product);
      contadorCarrito.innerText = carrito.contarUnidades();
      carrito.contarUnidades() == 1 && location.reload();
      calcularMontos();
      renderizarItemsCarrito();
    }, 1400);
  } catch (error) {
    swal(
      "Oops! no pudimos agregar este producto, Intente mas tarde",
      "",
      "error"
    );
  }
};

const quitarAlCarrito = async (e) => {
  try {
    const response = await fetch(ENDPOINT_DATA);
    const json = await response.json();

    const id = e.target.id;
    const product = json.products.find((item) => item.id == id);
    carrito.quitarAlCarrito(product);
    contadorCarrito.innerText = carrito.contarUnidades();
    carrito.contarUnidades() == 0 && location.reload();
    calcularMontos();
    renderizarItemsCarrito();
  } catch (error) {
    swal(
      "Oops! no pudimos quitar este producto, Intente mas tarde",
      "",
      "error"
    );
  }
};

getAllProductsByTagSuggested();

btnVaciarCarrito.addEventListener("click", carrito.vaciarCarrito);

/* ------- renderiza los Productos agregados al carrito ------- */
const renderizarItemsCarrito = () => {
  itemsCarrito.innerHTML = "";
  carrito.productosCarrito().forEach(
    (item) =>
      (itemsCarrito.innerHTML += `<div class="card-compra a">
  <div class="card-compra-info">
    <div>
      <img
        src="${item.img}"
        alt="producto de catálogo"
      />
    </div>
    <div>
      <p>
        ${item.description}
      </p>
      <h2>$${item.price} ${
        item.discountRate > 0 ? " -" + item.discountRate + "%" : ""
      }</h2>
    </div>
  </div>
  <div class="card-compra-contador">
    <button id="${item.id}" class="btn-add">+</button><span>${
        item.units
      }</span><button id="${item.id}" class="btn-substract">-</button>
  </div>
  </div>`)
  );

  const btnsAdd = document.querySelectorAll(".btn-add");
  btnsAdd.forEach((btn) => {
    btn.addEventListener("click", agregarAlCarrito);
  });

  const btnsSubstract = document.querySelectorAll(".btn-substract");
  btnsSubstract.forEach((btn) => {
    btn.addEventListener("click", quitarAlCarrito);
  });
};
renderizarItemsCarrito();

/* -------------- Sumatorias Carrito ------------- */

const resumenCarrito = document.querySelector(".cuenta-total");

const puedoComprar = () => {
  total <= 0;
};

const calcularMontos = () => {
  subtotal = carrito.sumatoriaTotalCarrito();
  totalImpuestos = carrito.calcularIVA(subtotal);
  totalDescuentos = carrito.calcularDescuentos();
  total = subtotal + totalImpuestos - totalDescuentos;

  resumenCarrito.innerHTML = `<h1>Resumen del pedido</h1>
<p>Subtotal:...................$${subtotal.toFixed(2)}</p>
<p>Descuentos:...................$${totalDescuentos.toFixed(2)}</p>
<p>Impuestos:..........................$${totalImpuestos.toFixed(2)}</p>
<hr />
<h2>Total: $${total.toFixed(2)}</h2>
<div class="botones-cuenta">
  <button id="btn-compra" onclick="swalCompra()">Comprar ahora</button>
  <button onclick="location.href='./catalogo.html'">Continuar buscando</button>
  
</div>`;
};
calcularMontos();
