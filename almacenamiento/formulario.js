
        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

        function actualizarListaClientes() {
            const clientesUl = document.getElementById("clientesUl");
            clientesUl.innerHTML = "";
            clientes.forEach((cliente, index) => {
                const li = document.createElement("li");
                li.innerHTML = `${index + 1}.<br>Cédula: ${cliente.cedula}<br>Dirección: 
                ${cliente.direccion}<br>Apellidos: ${cliente.apellidos}<br>Nombres: 
                ${cliente.nombres}<br>Teléfono: ${cliente.telefono}<br>Correo: ${cliente.correo}`;
                clientesUl.appendChild(li);
            });
        }

        document.getElementById("clientes").addEventListener("submit", function(event) {
            event.preventDefault();

            const cedula = document.getElementById('cedula').value;
            const apellido = document.getElementById('apellido').value;
            const nombre = document.getElementById('nombre').value;
            const sexo = document.querySelector('input[name="sexo"]:checked').value;
            const direccion = document.getElementById('direccion').value;
            const celular = document.getElementById('celular').value;
            const correo = document.getElementById('correo').value;

            // Validar nombre y apellido sin números
            const nombreValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
            const apellidoValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido);

            // Validate cédula (10 digits)
            if (!/^\d{10}$/.test(cedula)) {
                alert('Por favor, ingrese un número de cédula válido (10 dígitos).');
                return;
            }

            // Validate names (only letters and at least 2 characters)
            if (!nombreValido) {
                alert("El nombre solo puede contener letras.");
                return;
            }

            if (!apellidoValido) {
                alert("El apellido solo puede contener letras.");
                return;
            }

            
            // Validate Sexo
            if (!sexo) {
                alert('Por favor, seleccione un sexo.');
                return;
            }

          

            // Validate Dirección (only letters and spaces)
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(direccion)) {
                alert('Por favor, ingrese una dirección válida (solo letras y espacios).');
                return;
            }

            // Validate Celular (10 digits)
            if (!/^\d{10}$/.test(celular)) {
                alert('Por favor, ingrese un número de celular válido (10 dígitos).');
                return;
            }

            // Validate Correo Electrónico
            if (!validateEmail(correo)) {
                alert('Por favor, ingrese un correo electrónico válido.');
                return;
            }

            const nuevoCliente = {
                cedula: cedula,
                direccion: direccion,
                apellidos: apellido,
                nombres: nombre,
                telefono: celular,
                correo: correo,
              
            };
// Verificar si la cédula ya está registrada
const clientesGuardados = JSON.parse(localStorage.getItem('clientes')) || [];

const cedulaExiste = clientesGuardados.some(cliente => cliente.cedula === cedula);

if (cedulaExiste) {
    alert('Ya existe un cliente con esta cédula.');
    return;
}
             // Guardar datos en localStorage
    clientesGuardados.push(clientes);
    localStorage.setItem('clientes', JSON.stringify(clientesGuardados));

    console.log('Datos del cliente guardados en localStorage:');
    console.log(clientes);

    document.getElementById('clientes').reset();
});

        function validateEmail(email) {
            const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            return re.test(email);
        }

        window.onload = function() {
            const clientesGuardados = JSON.parse(localStorage.getItem('clientes')) || [];
            
            if (clientesGuardados.length > 0) {
                const ultimoCliente = clientesGuardados[clientesGuardados.length - 1];
                document.getElementById('nombre').value = ultimoCliente.nombre;
                document.getElementById('apellido').value = ultimoCliente.apellido;
                document.getElementById('cedula').value = ultimoCliente.cedula;
                document.getElementById('correo').value = ultimoCliente.correo;
                document.getElementById('direccion').value = ultimoCliente.direccion;
                document.getElementById('celular').value = ultimoCliente.celular;
            }
        };
   