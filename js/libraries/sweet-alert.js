const swalCarrito = () => {
  swal("Agregado al carrito!", "", "success");
  setTimeout(() => {
    swal.close();
  }, 2000);
};

const swalEmail = () => {
  swal("Consulta enviada! Gracias", "", "success");
};

const swalCompra = () => {
  swal("Compra realizada!", "", "info");
};
