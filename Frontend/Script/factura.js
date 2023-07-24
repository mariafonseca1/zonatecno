const apiUrl = "https://localhost:44320/api/factura";

function getAllFacturas() {
    fetch(apiUrl, { mode: 'cors' })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener las facturas.");
            }
        })
        .then(function(data) {
            const facturasList = document.getElementById("facturasList");
            facturasList.innerHTML = ""; // Limpiar la lista antes de agregar los elementos
            data.forEach(function (factura) {
                const listItem = document.createElement("li");
                listItem.textContent = `ID: ${factura.id}, ID del cliente: ${factura.id_cliente}, Fecha: ${factura.fecha}`;
                facturasList.appendChild(listItem);
            });
        })
        .catch(function(error) {
            console.error(error);
        });
}

function getFacturaById() {
    const facturaId = document.getElementById("facturaId").value;
    fetch(`${apiUrl}/${facturaId}`, { mode: 'cors' })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener la factura por ID.");
            }
        })
        .then(function(data) {
            const facturaDetails = document.getElementById("facturaDetails");
            facturaDetails.textContent = `ID: ${data.id}, ID del cliente: ${data.id_cliente}, Fecha: ${data.fecha}`;
        })
        .catch(function(error) {
            console.error(error);
            const facturaDetails = document.getElementById("facturaDetails");
            facturaDetails.textContent = "Factura no encontrada";
        });
}

function createFactura() {
    const idCliente = document.getElementById("idCliente").value;
    const fecha = document.getElementById("fecha").value;
    const newFactura = {
        id_cliente: idCliente,
        fecha: fecha
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFactura),
        mode: 'cors'
    })
    .then(function(response) {
        if (response.ok) {
            console.log("Factura creada exitosamente.");
            // Refrescar la lista de facturas para mostrar la nueva factura agregada
            getAllFacturas();
        } else {
            throw new Error("Error al crear la factura.");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

function updateFactura() {
    const facturaIdToUpdate = document.getElementById("facturaIdToUpdate").value;
    const idClienteToUpdate = document.getElementById("idClienteToUpdate").value;
    const fechaToUpdate = document.getElementById("fechaToUpdate").value;
    const updatedFactura = {
        id_cliente: idClienteToUpdate,
        fecha: fechaToUpdate
    };

    fetch(`${apiUrl}/${facturaIdToUpdate}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFactura),
        mode: 'cors'
    })
    .then(function(response) {
        if (response.ok) {
            console.log("Factura actualizada exitosamente.");
            // Refrescar la lista de facturas para mostrar la factura actualizada
            getAllFacturas();
        } else {
            throw new Error("Error al actualizar la factura.");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

function deleteFactura() {
    const facturaIdToDelete = document.getElementById("facturaIdToDelete").value;

    fetch(`${apiUrl}/${facturaIdToDelete}`, {
        method: 'DELETE',
        mode: 'cors'
    })
    .then(function(response) {
        if (response.ok) {
            console.log("Factura eliminada exitosamente.");
            // Refrescar la lista de facturas para eliminar la factura eliminada
            getAllFacturas();
        } else {
            throw new Error("Error al eliminar la factura.");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

// Cargar la lista de facturas al cargar la página
getAllFacturas();
