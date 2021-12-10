/*
 * Sistema Ajax para obtener monedas. 
 * 1- Se obtiene el valor de la cartera"
*/
function obtenerMonedas() {
    $.ajax({
        type: "POST",
        url: "../../../FrontEndProyecto/php/datos_cartera.php",
        dataType: "json",
        contentType: false,
        cache: false,
        processData: false,
    })
        //Ejecucion satisfactoria:
        .done(function (response) {
            document.getElementById('apuesta').max = response[0].fondos_totales;
            document.getElementById('leters').innerHTML = '<b>Mínimo:</b> 100 Coins <b>Máximo:</b> ' + response[0].fondos_totales + ' Coins';
        })
        //Ejecucion fallida:
        .fail(function () {
            //console.log("AJAX Fail");
        })
}