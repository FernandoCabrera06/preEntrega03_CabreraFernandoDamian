const seccionCirculosCategorias = document.querySelector(
  ".category-circle-section"
);

const CATEGORY_CIRCLES = ["Perros", "Aves", "Gatos", "Reptiles", "Peces"];
const CATEGORY_CARDS = [
  ["Nutrición", "Antiplagas"],
  ["Promociones", "Juguetes"],
];

/* -------------- Renderiza los circulos de categorias  ------------- */
CATEGORY_CIRCLES.forEach((categoryName) => {
  seccionCirculosCategorias.innerHTML += `<div class="category-circle-container">
    <a href="./pages/catalogo.html?category=${categoryName.toLocaleLowerCase()}" title="${categoryName}">
      <img
        class="category-circle"
        src="./assets/images/${categoryName.toLocaleLowerCase()}.jpg"
        alt="${categoryName}"
      />
    </a>
  </div>`;
});

/* -------------- Renderiza los rectangulos de categorias  ------------- */
for (let i = 0; i < CATEGORY_CARDS.length; i++) {
  const containerCardCategorias = document.querySelector(`#container-${i}`);

  CATEGORY_CARDS[i].forEach((categoryName) => {
    containerCardCategorias.innerHTML += `<a href="./pages/catalogo.html?category=${categoryName}">
    <div class="category-card">
      <span class="category-card-text">${categoryName}</span>
    </div>
  </a>`;
  });
}
