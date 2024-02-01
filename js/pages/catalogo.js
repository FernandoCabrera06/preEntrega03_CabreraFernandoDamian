const listaProductosCatalogo = document.querySelector("#catalogo-container");
const catalogoVacio = document.querySelector("#catalogo-vacio");
const params = new URLSearchParams(location.search);
const brand = params.get("brand");
const category = params.get("category");

/* ------- recibe los datos y renderiza ------- */
const renderListProducts = (list) => {
  if (list.length > 0) {
    listaProductosCatalogo.innerHTML = "";
    list.forEach((product) => {
      listaProductosCatalogo.innerHTML += `<div class="card-catalogo">
            <img src="${product.img}" title="${product.brand}" />
            <p>
              ${product.description}
            </p>
            <h2>$${product.price} ${
        product.discountRate > 0 ? " -" + product.discountRate + "%" : ""
      }</h2>
            <div>
              <a id="${
                product.id
              }" class="btn-agregar-al-carrito" onclick="swalCarrito()" type="button">Agregar al carrito</a>
            </div>
          </div>`;
    });

    /* -------------- Agrege el escuchador de eventos a los botones ------------- */
    const btns = document.querySelectorAll(".btn-agregar-al-carrito");
    btns.forEach((btn) => {
      btn.addEventListener("click", agregarAlCarrito);
    });
  } else {
    catalogoVacio.innerHTML = `<div class="sin-productos"><h2>¡😞No se encontraron productos disponibles!</h2></div>`;
  }
};

const agregarAlCarrito = (e) => {
  const id = e.target.id;
  const product = products.find((item) => item.id == id);

  carrito.agregarAlCarrito(product);
  contadorCarrito.innerText = carrito.contarUnidades();
  carrito.contarUnidades() == 1 && location.reload();
};

if (brand) {
  const productos = products.filter((item) =>
    item.brand.toLocaleLowerCase().includes(brand.toLocaleLowerCase())
  );
  renderListProducts(productos);
}

if (category) {
  const productos = products.filter(
    (item) => item.category.toLocaleLowerCase() === category.toLocaleLowerCase()
  );
  renderListProducts(productos);
}

if (!brand && !category) renderListProducts(products);
