const apiUrl = "https://localhost:44320/api/usuario";

function getAllUsuarios() {
    fetch(apiUrl, { mode: 'cors' })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener los usuarios.");
            }
        })
        .then(function(data) {
            const usuariosList = document.getElementById("usuariosList");
            usuariosList.innerHTML = ""; // Limpiar la lista antes de agregar los elementos
            data.forEach(function (usuario) {
                const listItem = document.createElement("li");
                listItem.textContent = `ID: ${usuario.id}, Nombre: ${usuario.nombre}, Cédula: ${usuario.cedula}, Clave: ${usuario.clave}`;
                usuariosList.appendChild(listItem);
            });
        })
        .catch(function(error) {
            console.error(error);
        });
}

function getUsuarioById() {
    const userId = document.getElementById("userId").value;
    fetch(`${apiUrl}/${userId}`, { mode: 'cors' })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener el usuario por ID.");
            }
        })
        .then(function(data) {
            const usuarioDetails = document.getElementById("usuarioDetails");
            usuarioDetails.textContent = `ID: ${data.id}, Nombre: ${data.nombre}, Cédula: ${data.cedula}, Clave: ${data.clave}`;
        })
        .catch(function(error) {
            console.error(error);
            const usuarioDetails = document.getElementById("usuarioDetails");
            usuarioDetails.textContent = "Usuario no encontrado";
        });
}

function createUsuario() {
    const nombre = document.getElementById("nombre").value;
    const cedula = document.getElementById("cedula").value;
    const clave = document.getElementById("clave").value;
    const newUsuario = {
        nombre: nombre,
        cedula: cedula,
        clave: clave
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUsuario),
        mode: 'cors'
    })
    .then(function(response) {
        if (response.ok) {
            console.log("Usuario creado exitosamente.");
            // Refrescar la lista de usuarios para mostrar el nuevo usuario agregado
            getAllUsuarios();
        } else {
            throw new Error("Error al crear el usuario.");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

function updateUsuario() {
    const userIdToUpdate = document.getElementById("userIdToUpdate").value;
    const nombreToUpdate = document.getElementById("nombreToUpdate").value;
    const cedulaToUpdate = document.getElementById("cedulaToUpdate").value;
    const claveToUpdate = document.getElementById("claveToUpdate").value;
    const updatedUsuario = {
        nombre: nombreToUpdate,
        cedula: cedulaToUpdate,
        clave: claveToUpdate
    };

    fetch(`${apiUrl}/${userIdToUpdate}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUsuario),
        mode: 'cors'
    })
    .then(function(response) {
        if (response.ok) {
            console.log("Usuario actualizado exitosamente.");
            // Refrescar la lista de usuarios para mostrar los cambios
            getAllUsuarios();
        } else {
            throw new Error("Error al actualizar el usuario.");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

function deleteUsuario() {
    const userIdToDelete = document.getElementById("userIdToDelete").value;

    fetch(`${apiUrl}/${userIdToDelete}`, {
        method: 'DELETE',
        mode: 'cors'
    })
    .then(function(response) {
        if (response.ok) {
            console.log("Usuario eliminado exitosamente.");
            // Refrescar la lista de usuarios para mostrar el cambio
            getAllUsuarios();
        } else {
            throw new Error("Error al eliminar el usuario.");
        }
    })
    .catch(function(error) {
        console.error(error);
    });
}

// Cargar la lista de usuarios al cargar la página
getAllUsuarios();
