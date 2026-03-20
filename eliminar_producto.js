// Referencia al contenedor de la lista de productos
const listaProductos = document.getElementById('productos');

// Obtiene y muestra todos los productos desde la API
async function cargarProductos() {
    try {
        const respuesta = await fetch("http://127.0.0.1:3000/productos");
        const data = await respuesta.json();

        if (data.success) {
            data.producto.forEach(function(producto) {

                // Crear los elementos HTML para cada producto
                const elementoLista = document.createElement('li');
                const titulo = document.createElement('h2');
                const elementoPrecio = document.createElement('p');
                const imagen = document.createElement('img');
                const contenedorEliminar = document.createElement('div');
                const iconoEliminar = document.createElement('i');

                // Asignar valores del producto a los elementos
                iconoEliminar.classList.add("fa-solid", "fa-trash-can");
                titulo.textContent = producto.nombre;
                elementoPrecio.textContent = producto.precio;
                imagen.src = producto.imagen;
                contenedorEliminar.classList.add("delete_2");

                // Evento para eliminar el producto al hacer clic
                contenedorEliminar.addEventListener('click', async function() {
                    try {
                        const respuesta = await fetch(`http://127.0.0.1:3000/delete-producto/${producto.id_producto}`, {
                            method: "DELETE"
                        });
                        const data = await respuesta.json();
                        if (data.success) {
                            elementoLista.remove();
                            alert("Producto eliminado");
                        }
                    } catch (error) {
                        console.error("Error:", error);
                    }
                });

                // Agregar elementos al DOM
                contenedorEliminar.appendChild(iconoEliminar);
                elementoLista.appendChild(titulo);
                elementoLista.appendChild(elementoPrecio);
                elementoLista.appendChild(imagen);
                elementoLista.appendChild(contenedorEliminar);
                listaProductos.appendChild(elementoLista);
            });
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

// Cargar productos al iniciar la página
cargarProductos();