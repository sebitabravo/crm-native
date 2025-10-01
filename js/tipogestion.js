// Variables
var g_id_tipo_gestion = '';

// Funcion Agregar
function agregarTipoGestion() {
	// Variable para obtener nombre del tipo de gestion desde interfaz
	var nombre_tipo_gestion = document.getElementById(
		'txt_nombre_tipo_gestion'
	).value;
	// Agregar api tipo de gestion
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	// Variable para formatear zona horaria
	var fechaHoraActual = obtenerFechaHora();
	// Continuamos agregando la api
	const raw = JSON.stringify({
		nombre_tipo_gestion: nombre_tipo_gestion,
		fecha_registro: fechaHoraActual
	});
	// Metodo post para agregar tipo de gestion
	const requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};
	fetch('https://crm-react.sbravo.app/api/tipo_gestion', requestOptions)
		.then((response) => {
			if (response.status == 200) {
				location.href = 'listar.html';
			}
			if (response.status == 400) {
				mostrarAlerta('No se pudo agregar el tipo de gestión');
			}
		})
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
}

// Funcion Listar
function listarTipoGestion() {
	// Metodo get para listar tipo de gestion
	const requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};
	fetch(
		'https://crm-react.sbravo.app/api/tipo_gestion?_size=200',
		requestOptions
	)
		.then((response) => response.json())
		.then((json) => {
			json.forEach(completarFila);
			$('#tbl_tipo_gestion').DataTable();
		})
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
}

// Funcion Completar fila
function completarFila(element, index, arr) {
	// Creamos formato para la tabla
	arr[index] = document.querySelector(
		'#tbl_tipo_gestion tbody'
	).innerHTML += `<tr>
    <td>${element.id_tipo_gestion}</td>
    <td>${element.nombre_tipo_gestion}</td>
    <td>${element.fecha_registro}</td>
    <td>
    <a href='actualizar.html?id=${element.id_tipo_gestion}' class='btn btn-warning btn-sm'>Actualizar</a>
    <a href='eliminar.html?id=${element.id_tipo_gestion}' class='btn btn-danger btn-sm'>Eliminar</a>
    </td>
    </tr>`;
}

// Funcion para el ID de actualizar el tipo de gestion
function obtenerIdActualizacion() {
	const queryString = window.location.search;
	const parametros = new URLSearchParams(queryString);
	const p_id_tipo_gestion = parametros.get('id');
	g_id_tipo_gestion = p_id_tipo_gestion;
	// Llamamos a la funcion para obtener datos de actualizacion
	obtenerDatosActualizacion(p_id_tipo_gestion);
}

// Funcion para eliminar el ID de tipo de gestion
function obtenerIdEliminacion() {
	const queryString = window.location.search;
	const parametros = new URLSearchParams(queryString);
	const p_id_tipo_gestion = parametros.get('id');
	g_id_tipo_gestion = p_id_tipo_gestion;
	// Llamamos a la funcion para eliminar datos
	obtenerDatosEliminacion(p_id_tipo_gestion);
}

// Funcion para obtener datos de Elimiacion
function obtenerDatosEliminacion(id_tipo_gestion) {
	const requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};
	fetch(
		'https://crm-react.sbravo.app/api/tipo_gestion/' + id_tipo_gestion,
		requestOptions
	)
		.then((response) => response.json())
		.then((json) => json.forEach(completarEtiquetaEliminar))
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
}

// Funcion para obtener datos de actualizacion
function obtenerDatosActualizacion(id_tipo_gestion) {
	const requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};
	fetch(
		'https://crm-react.sbravo.app/api/tipo_gestion/' + id_tipo_gestion,
		requestOptions
	)
		.then((response) => response.json())
		.then((json) => json.forEach(completarFormularioActualizar))
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
}

// Funcion para etiqueta de eliminacion
function completarEtiquetaEliminar(element) {
	var nombreTipoGestion = element.nombre_tipo_gestion;
	document.getElementById('lbl_eliminar').innerHTML =
		'¿Desea eliminar este tipo de gestión? <b>' + nombreTipoGestion + '</b>';
}

// Funcion para completar formulario de actualizacion
function completarFormularioActualizar(element) {
	var nombreTipoGestion = element.nombre_tipo_gestion;
	document.getElementById('txt_nombre_tipo_gestion').value = nombreTipoGestion;
}

// Funcion Actualizar
function actualizarTipoGestion() {
	// Variable para obtener nombre del tipo de gestion desde interfaz
	var nombre_tipo_gestion = document.getElementById(
		'txt_nombre_tipo_gestion'
	).value;
	// Agregar api tipo de gestion
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	const raw = JSON.stringify({
		nombre_tipo_gestion: nombre_tipo_gestion
	});
	// Metodo patch para actualizar tipo de gestion
	const requestOptions = {
		method: 'PATCH',
		headers: myHeaders,
		body: raw,
		redirect: 'follow'
	};
	fetch(
		'https://crm-react.sbravo.app/api/tipo_gestion/' + g_id_tipo_gestion,
		requestOptions
	)
		.then((response) => {
			if (response.status == 200) {
				location.href = 'listar.html';
			}
			if (response.status == 400) {
				mostrarAlerta('No se pudo actualizar el tipo de gestión');
			}
		})
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
}

// Funcion Eliminar
function eliminarTipoGestion() {
	// Agregar api tipo de gestion
	const myHeaders = new Headers();
	myHeaders.append('Content-Type', 'application/json');
	// Metodo delete para eliminar tipo de gestion
	const requestOptions = {
		method: 'DELETE',
		headers: myHeaders,
		redirect: 'follow'
	};
	fetch(
		'https://crm-react.sbravo.app/api/tipo_gestion/' + g_id_tipo_gestion,
		requestOptions
	)
		.then((response) => {
			if (response.status == 200) {
				location.href = 'listar.html';
			}
			if (response.status == 400) {
				mostrarAlerta('No se puede eliminar el tipo de gestión');
			}
		})
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
}

// Funcion para formatear la fecha y hora (la que necesita el backend)
function obtenerFechaHora() {
	var fechaHoraActual = new Date();
	var fechaFormateada = fechaHoraActual
		.toLocaleDateString('es-ES', {
			hour12: false,
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		})
		.replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/, '$3-$2-$1 $4:$5:$6');
	return fechaFormateada;
}

// Funcion para mostrar alerta en caso de error
function mostrarAlerta(mensaje) {
	const alertContainer = document.getElementById('alert-container');
	alertContainer.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">${mensaje}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
}
