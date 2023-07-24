const apiUrl = "https://localhost:44320/api/factura_producto";

function getAllFacturaProducto() {
    fetch(apiUrl, { mode: 'cors' })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener los registros de FACTURA_PRODUCTO.");
            }
        })
        .then(function(data) {
            const facturaProductoList = document.getElementById("facturaProductoList");
            facturaProductoList.innerHTML = ""; // Limpiar la lista antes de agregar los elementos
            data.forEach(function (registro) {
                const listItem = document.createElement("li");
                listItem.textContent = `ID: ${registro.id}, ID de la factura: ${registro.id_factura}, ID del producto: ${registro.id_producto}, Cantidad: ${registro.cantidad}`;
                facturaProductoList.appendChild(listItem);
            });
        })
        .catch(function(error) {
            console.error(error);
        });
}

function getFacturaProductoById() {
    const facturaProductoId = document.getElementById("facturaProductoId").value;
    fetch(`${apiUrl}/${facturaProductoId}`, { mode: 'cors' })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener el registro de FACTURA_PRODUCTO por ID.");
            }
        })
        .then(function(data) {
            const facturaProductoDetails = document.getElementById("facturaProductoDetails");
            facturaProductoDetails.textContent = `ID: ${data.id}, ID de la factura: ${data.id_factura}, ID del producto: ${data.id_producto}, Cantidad: ${data.cantidad}`;
        })
        .catch(function(error) {
            console.error(error);
            const facturaProductoDetails = document.getElementById("facturaProductoDetails");
            facturaProductoDetails.textContent = "Registro de FACTURA_PRODUCTO no encontrado";
        });
}

function createFacturaProducto() {
    const idFactura = document.getElementById("idFactura").value;
    const idProducto = document.getElementById("idProducto").value;
    const cantidad = document.getElementById("cantidad").value;
    const newRegistro = {
        id_factura: idFactura,
        id_producto: idProducto,
        cantidad: cantidad
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRegistro),
        mode: 'cors'
    })
    .then(function(response) {
        if (response.ok) {
            console.log("Registro de FACTURA_PRODUCTO creado exitosamente.");
            // Refrescar la lista de registros para mostrar el nuevo registro agregado
            getAllFacturaProducto();
        } else {
            throw new Error("Error al crear el registro de FACTURA_PRODUCTO.");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

function updateFacturaProducto() {
    const facturaProductoIdToUpdate = document.getElementById("facturaProductoIdToUpdate").value;
    const idFacturaToUpdate = document.getElementById("idFacturaToUpdate").value;
    const idProductoToUpdate = document.getElementById("idProductoToUpdate").value;
    const cantidadToUpdate = document.getElementById("cantidadToUpdate").value;
    const updatedRegistro = {
        id_factura: idFacturaToUpdate,
        id_producto: idProductoToUpdate,
        cantidad: cantidadToUpdate
    };

    fetch(`${apiUrl}/${facturaProductoIdToUpdate}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRegistro),
        mode: 'cors'
    })
    .then(function(response) {
        if (response.ok) {
            console.log("Registro de FACTURA_PRODUCTO actualizado exitosamente.");
            // Refrescar la lista de registros para mostrar los cambios
            getAllFacturaProducto();
        } else {
            throw new Error("Error al actualizar el registro de FACTURA_PRODUCTO.");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

function deleteFacturaProducto() {
    const facturaProductoIdToDelete = document.getElementById("facturaProductoIdToDelete").value;

    fetch(`${apiUrl}/${facturaProductoIdToDelete}`, {
        method: 'DELETE',
        mode: 'cors'
    })
    .then(function(response) {
        if (response.ok) {
            console.log("Registro de FACTURA_PRODUCTO eliminado exitosamente.");
            // Refrescar la lista de registros para mostrar el cambio
            getAllFacturaProducto();
        } else {
            throw new Error("Error al eliminar el registro de FACTURA_PRODUCTO.");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

// Cargar la lista de registros de FACTURA_PRODUCTO al cargar la página
getAllFacturaProducto();
