/** Variables para el toast */
let myalert = document.querySelector('.toast');
let bsalert = new bootstrap.Toast(myalert);

/**
 * Muestra el modal
 * @param {string} seleccionModal 
 */
function abrir(seleccionModal) {
    seleccionModal.style.display = "block";
}
/**
 * Cierra el modal
 * @param {string} seleccionModal 
 */
function cerrar(seleccionModal) {
    seleccionModal.style.display = "none";
}

/**
 * Muestra el toast
 */
function mostrar() {
    bsalert.show();
}

/**
 * Cierra el toast
 */
function noMostrar() {
    bsalert.hide()
}

/**
 * Toma acciones luego de que se precione una tecla en el input de la apuesta
 */
$('#apuesta').keyup(function () {
    var valor = Number(document.getElementById('apuesta').value);
    var min = Number(document.getElementById('apuesta').min);
    var max = Number(document.getElementById('apuesta').max);
    document.getElementById('apuesta').value;
    if (valor >= min && valor <= max) { //Si el valor del input esta entre el minimo y el maximo le agrega onclick al boton para comenzar a jugar
        document.getElementById('botoness').onclick = function (event) {
            cerrar(document.getElementById('modal3'));
            apuestas(Number(document.getElementById('apuesta').value));
        };
    } else { //Si el valor del input no esta entre el minimo y el maximo le quita el onclick
        document.getElementById('botoness').onclick = function (event) {  };
    }
});