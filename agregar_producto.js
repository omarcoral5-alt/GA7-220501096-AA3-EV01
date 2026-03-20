const select = document.getElementById('select1');
const btnAgregar = document.getElementById('btnAgregar');
const btnCancelar = document.getElementById('btnCancelar');

// Cargar categorias al abrir la página
async function cargarCategorias(){
    try {
        const respuesta = await fetch("http://127.0.0.1:3000/categorias");
        const data = await respuesta.json();

        if(data.success){
            data.categorias.forEach(function(c){
                const option = document.createElement('option');
                option.value = c.id_categoria;
                option.textContent = c.nombre;
                select.appendChild(option);
            });
        }
    } catch(error) {
        console.error("Error:", error);
    }
}

// Agregar producto
btnAgregar.addEventListener('click', async function(){
    const nombre = document.getElementById('nombre').value.trim();
    const precio = document.getElementById('precio').value.trim();
    const imagen = document.getElementById('imagen').files[0];
    const id_categoria = select.value;

    if(!nombre || !precio || !imagen || !id_categoria){
        alert("Por favor complete todos los campos");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("precio", precio);
        formData.append("imagen", imagen);
        formData.append("id_categoria", id_categoria);

        const respuesta = await fetch("http://127.0.0.1:3000/agregar-producto", {
            method: "POST",
            body: formData
        });

        const data = await respuesta.json();

        if(data.success){
            alert("Producto agregado correctamente");
            document.getElementById('nombre').value = '';
            document.getElementById('precio').value = '';
            document.getElementById('imagen').value = '';
        } else {
            alert("Error: " + data.error);
        }

    } catch(error) {
        console.error("Error:", error);
        alert("Error al conectar con el servidor");
    }
});

// Cancelar
btnCancelar.addEventListener('click', function(){
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('imagen').value = '';
});

cargarCategorias();