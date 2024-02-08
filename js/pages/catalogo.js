const listaProductosCatalogo = document.querySelector("#catalogo-container");
const catalogoVacio = document.querySelector("#catalogo-vacio");
const params = new URLSearchParams(location.search);
const brand = params.get("brand");
const category = params.get("category");
const ENDPOINT_DATA = "../js/data.json";
const spinner = document.querySelector("#spinner");

const mostrarSpinner = () => {
  spinner.classList.add("lds-facebook");
};
const ocultarSpinner = () => {
  spinner.classList.remove("lds-facebook");
};

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
    catalogoVacio.innerHTML = `<div class="sin-productos"><h2>¡😞No se encontraron productos disponibles!</h2></div>`;
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
    }, 1400);
  } catch (error) {
    swal(
      "Oops! no pudimos agregar este producto, Intente mas tarde",
      "",
      "error"
    );
  }
};

const getAllProductsByTag = async (brand, category) => {
  mostrarSpinner();
  try {
    const response = await fetch(ENDPOINT_DATA);
    const json = await response.json();
    setTimeout(() => {
      ocultarSpinner();
      !!brand // renderiza por marca de la pagina marcas
        ? renderListProducts(
            json.products.filter((item) =>
              item.brand.toLocaleLowerCase().includes(brand.toLocaleLowerCase())
            )
          )
        : !!category // renderiza por categoria de la pagina inicio
        ? renderListProducts(
            json.products.filter((item) =>
              item.category
                .toLocaleLowerCase()
                .includes(category.toLocaleLowerCase())
            )
          )
        : renderListProducts(json.products); // renderiza todos del catalogo
    }, 1100);
  } catch (error) {
    swal(
      "Oops! no pudimos cargar los productos, Intente mas tarde!",
      "",
      "error"
    );
  }
};

getAllProductsByTag(brand, category);
