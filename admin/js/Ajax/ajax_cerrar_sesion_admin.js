/*
 * Archivo Ajax cerrar sesion desde Panel Administrador
 * 1- Cuando se cierre sesion desde el Panel Administrador se redigidira al "index.html"
*/

$(document).ready(function () {
    //Cuando el boton se clickee se cerrara la sesion y se redigidira al "index.html"
    $('#btn-cerrar-sesion').click(function () { 
        $.ajax({
            type: "method",
            url: "../../../FrontEndProyecto/php/cerrar_sesion.php",
            dataType: "json",
        })
        .done(function (response) {
            //Cerro sesion:
            if (response == 'true') {  
                console.log(response);
                window.location = '../../../FrontEndProyecto/index.html';
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