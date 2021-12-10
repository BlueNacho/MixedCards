/*
 * Archivo Ajax datos de la cartera
 * 1- Actualiza el balance y añade movimientos en la interfaz de "cartera.php"
*/

$(document).ready(function () {
    //Obtiene los fondos totales de la cartera del usuario y lo muestra en la grafica
    $.ajax({
        url: "../FrontEndProyecto/php/datos_cartera.php",
        dataType: "json",
        })
        .done(function (response) {
            console.log(response);
            $('#balance').text(response[0].fondos_totales);
        })
        .fail(function () {
            console.log("AJAX Fail");
        });
    //Obtiene los datos de movimientos y los archiva en una tabla
    $.ajax({
        url: "../FrontEndProyecto/php/datos_movimientos.php",
        dataType: "json",
        })
        .done(function (response) {
            console.log(response);
            for(var i = 0; i < response.length; i++) {
                $('#tabla-movimientos').append(
                '<tr>' +
                    '<td>' + response[i].movimiento_valor + '</td>'+
                    '<td>' + response[i].movimiento_fecha + '</td>'+
                '</tr>'
                  )
                }
        })
        .fail(function () {
            console.log("AJAX Fail");
        });
});