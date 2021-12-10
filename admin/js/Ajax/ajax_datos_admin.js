/*
 * Archivo Ajax traer datos escenciales del admin
 * 1- Se obtiene el username del admin y se coloca en la parte inferior del sidebar 
 * 2- La utilidad es mejorar la navegabilidad
*/

$(document).ready(function () {
    $.ajax({
        type: "method",
        url: "../admin/php/datos_admin.php",
        dataType: "json",
    })
        .done(function (response) {
            //Sidebar 
            $('#username-admin').html(response.username);
        })
        //Ejecucion fallida:
        .fail(function () {
            console.log("AJAX Fail");
        })
});