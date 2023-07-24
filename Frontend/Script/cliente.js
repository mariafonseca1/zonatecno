const apiUrl = "https://localhost:44320/api/cliente";

function getAllClientes() {
    fetch(apiUrl, { mode: 'cors' })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener los clientes.");
            }
        })
        .then(function(data) {
            const clientesList = document.getElementById("clientesList");
            clientesList.innerHTML = ""; // Limpiar la lista antes de agregar los elementos
            data.forEach(function (cliente) {
                const listItem = document.createElement("li");
                listItem.textContent = `ID: ${cliente.id}, Retira: ${cliente.retira}, Dirección: ${cliente.direccion}`;
                clientesList.appendChild(listItem);
            });
        })
        .catch(function(error) {
            console.error(error);
        });
}

function getClienteById() {
    const clientId = document.getElementById("clientId").value;
    fetch(`${apiUrl}/${clientId}`, { mode: 'cors' })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener el cliente por ID.");
            }
        })
        .then(function(data) {
            const clienteDetails = document.getElementById("clienteDetails");
            clienteDetails.textContent = `ID: ${data.id}, Retira: ${data.retira}, Dirección: ${data.direccion}`;
        })
        .catch(function(error) {
            console.error(error);
            const clienteDetails = document.getElementById("clienteDetails");
            clienteDetails.textContent = "Cliente no encontrado";
        });
}

function createCliente() {
    const retira = document.getElementById("retira").value;
    const direccion = document.getElementById("direccion").value;
    const newCliente = {
        retira: retira,
        direccion: direccion
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCliente),
        mode: 'cors'
    })
    .then(function(response) {
        if (response.ok) {
            console.log("Cliente creado exitosamente.");
            // Refrescar la lista de clientes para mostrar el nuevo cliente agregado
            getAllClientes();
        } else {
            throw new Error("Error al crear el cliente.");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

function updateCliente() {
    const clientIdToUpdate = document.getElementById("clientIdToUpdate").value;
    const retiraToUpdate = document.getElementById("retiraToUpdate").value;
    const direccionToUpdate = document.getElementById("direccionToUpdate").value;
    const updatedCliente = {
        retira: retiraToUpdate,
        direccion: direccionToUpdate
    };

    fetch(`${apiUrl}/${clientIdToUpdate}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedCliente),
        mode: 'cors'
    })
    .then(function(response) {
        if (response.ok) {
            console.log("Cliente actualizado exitosamente.");
            // Refrescar la lista de clientes para mostrar el cliente actualizado
            getAllClientes();
        } else {
            throw new Error("Error al actualizar el cliente.");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

function deleteCliente() {
    const clientIdToDelete = document.getElementById("clientIdToDelete").value;

    fetch(`${apiUrl}/${clientIdToDelete}`, {
        method: 'DELETE',
        mode: 'cors'
    })
    .then(function(response) {
        if (response.ok) {
            console.log("Cliente eliminado exitosamente.");
            // Refrescar la lista de clientes para eliminar el cliente eliminado
            getAllClientes();
        } else {
            throw new Error("Error al eliminar el cliente.");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

// Cargar la lista de clientes al cargar la página
getAllClientes();
