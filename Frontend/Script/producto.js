const apiUrl = "https://localhost:44320/api/producto";

function getAllProductos() {
    fetch(apiUrl, { mode: 'cors' })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener los productos.");
            }
        })
        .then(function(data) {
            const productosList = document.getElementById("productosList");
            productosList.innerHTML = ""; // Limpiar la lista antes de agregar los elementos
            data.forEach(function (producto) {
                const listItem = document.createElement("li");
                listItem.textContent = `ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: ${producto.precio}, Descripción: ${producto.descripcion}`;
                productosList.appendChild(listItem);
            });
        })
        .catch(function(error) {
            console.error(error);
        });
}

function getProductoById() {
    const productId = document.getElementById("productId").value;
    fetch(`${apiUrl}/${productId}`, { mode: 'cors' })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener el producto por ID.");
            }
        })
        .then(function(data) {
            const productoDetails = document.getElementById("productoDetails");
            productoDetails.textContent = `ID: ${data.id}, Nombre: ${data.nombre}, Precio: ${data.precio}, Descripción: ${data.descripcion}`;
        })
        .catch(function(error) {
            console.error(error);
            const productoDetails = document.getElementById("productoDetails");
            productoDetails.textContent = "Producto no encontrado";
        });
}

function createProducto() {
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const descripcion = document.getElementById("descripcion").value;
    const newProducto = {
        nombre: nombre,
        precio: precio,
        descripcion: descripcion
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProducto),
        mode: 'cors'
    })
    .then(function(response) {
        if (response.ok) {
            console.log("Producto creado exitosamente.");
            // Refrescar la lista de productos para mostrar el nuevo producto agregado
            getAllProductos();
        } else {
            throw new Error("Error al crear el producto.");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

function updateProducto() {
    const productIdToUpdate = document.getElementById("productIdToUpdate").value;
    const nombreToUpdate = document.getElementById("nombreToUpdate").value;
    const precioToUpdate = document.getElementById("precioToUpdate").value;
    const descripcionToUpdate = document.getElementById("descripcionToUpdate").value;
    const updatedProducto = {
        nombre: nombreToUpdate,
        precio: precioToUpdate,
        descripcion: descripcionToUpdate
    };

    fetch(`${apiUrl}/${productIdToUpdate}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProducto),
        mode: 'cors'
    })
    .then(function(response) {
        if (response.ok) {
            console.log("Producto actualizado exitosamente.");
            // Refrescar la lista de productos para mostrar el producto actualizado
            getAllProductos();
        } else {
            throw new Error("Error al actualizar el producto.");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

function deleteProducto() {
    const productIdToDelete = document.getElementById("productIdToDelete").value;

    fetch(`${apiUrl}/${productIdToDelete}`, {
        method: 'DELETE',
        mode: 'cors'
    })
    .then(function(response) {
        if (response.ok) {
            console.log("Producto eliminado exitosamente.");
            // Refrescar la lista de productos para eliminar el producto eliminado
            getAllProductos();
        } else {
            throw new Error("Error al eliminar el producto.");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

// Cargar la lista de productos al cargar la página
getAllProductos();
