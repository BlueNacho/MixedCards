/*
 * Archivo Ajax estadisticas
 * 1- Obtiene las estadisticas y las vuelca en la tabla dentro de "mis_estadisticas.php"
*/

$(document).ready(function () {
    $.ajax({
        type: "method",
        url: "../FrontEndProyecto/php/datos_usuario.php",
        dataType: "json",
    })
    .done(function (response) {
        var id = response.id;
        var username = response.username;

        $.ajax({
            type: "POST",
            url: "../FrontEndProyecto/php/estadisticas.php",
            data: {"id": id, "username": username},
            dataType: "json",
        })
        .done(function (response) {
            //Se desglosan los valores del array "response" y se colocan en los textos de los selectores
            $('#puntosTotales').text(response.puntosTotales[0].suma);
            $('#ganadaBJ').text(response.ganadaBJ[0].cantidad);
            $('#perdidaBJ').text(response.perdidaBJ[0].cantidad);
            $('#ganadaTruco').text(response.ganadaTruco[0].cantidad);
            $('#perdidaTruco').text(response.perdidaTruco[0].cantidad);
            $('#totalCoins').text(response.totalCoins[0].total);
        })
        //Ejecucion fallida:
        .fail(function () {
            console.log("AJAX Fail");
        })
    })
    
    //Ejecucion fallida:
    .fail(function () {
        console.log("AJAX Fail");
    })
});