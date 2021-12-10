/*
 * Sistema Ajax para cargar la apuesta
*/
function cargarApuesta(cant) {
    var data = "cant=" + cant;
    $.ajax({
        url: "../../../FrontEndProyecto/php/cargar_apuesta.php",
        method: 'POST',
        data: data,
        dataType: "json",
    })
        .done(function (response) {
            //console.log(response);
        })
        .fail(function () {
            //console.log("AJAX Fail");
        })
}

/*
 * Sistema Ajax para cargar los puntos de la partida
*/
function cargar_puntos(ganaUsuario, ganaBot) {
    $.ajax({
        url: "../../../FrontEndProyecto/php/cargar_partida.php",
        method: 'POST',
        data: {"idJuego": 2, "ganaUser": ganaUsuario, "ganaBot": ganaBot},
        dataType: "json",
    })
        .done(function (response) {
            //console.log(response);
        })
        .fail(function () {
            //console.log("AJAX Fail");
    })
}