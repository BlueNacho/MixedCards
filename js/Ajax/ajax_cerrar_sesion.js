/*
 * Archivo Ajax cerrar sesion. 
 * 1- Presionando el boton de cerrar sesion del sidebar de usuario presente en todas las paginas se cerrara la sesion actual
 * 2- Si se cierra correctamente se redirige a la ventana de "index.html"
*/

$(document).ready(function () {
    $('#btn-cerrar-sesion').click(function () { 
        $.ajax({
            type: "method",
            url: "../FrontEndProyecto/php/cerrar_sesion.php",
            dataType: "json",
        })
        .done(function (response) {
            //Cerro sesion:
            if (response == 'true') {  
                console.log(response);
                window.location = '../FrontEndProyecto/index.html';
            //No cerro:
            } else {
                if (response == 'false') { 
                    console.log(response);
                }
            }
        })
        //Ejecucion fallida:
        .fail(function () {
            console.log("AJAX Fail");
        })
    });
});