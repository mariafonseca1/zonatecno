// Función para realizar el inicio de sesión
function login() {
    var url = "https://localhost:44320/api/usuario";
    var nombre = document.getElementById("nombre").value;
    var clave = document.getElementById("clave").value;

    // Realizar una solicitud a la API para obtener los datos del usuario
    fetch(url, { mode: 'cors' })
        .then(function(result) {
            if (result.ok) {
                return result.json();
            }
        })
        .then(function(data) {
            var userFound = data.find(function(user) {
                return user.nombre === nombre && user.clave === clave;
            });

            if (userFound) {
                // Si el usuario y contraseña coinciden, redirigir a la página principal (home.html)
                window.location.href = "home.html";
            } else {
                alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
            }
        });
}

// Función para manejar el evento del botón de inicio de sesión
function handleLoginButtonClick() {
    login();
}

// Asignar el evento click al botón de inicio de sesión
var loginButton = document.getElementById("login-button");
if (loginButton) {
    loginButton.addEventListener("click", handleLoginButtonClick);
}
