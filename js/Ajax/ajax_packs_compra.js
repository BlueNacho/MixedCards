/*
 * Archivo Ajax packs de compra
 * 1- Obtiene los valores del pack de compra y los acumula en un array
 * 2- Completa los valores del modal de Paquetes de compra con los valores de la base de datos
*/

$(document).ready(function () {
    $.ajax({
        url: "../FrontEndProyecto/php/packs_compra.php",
        dataType: "json",
    })
        .done(function (response) {
            //Cada vez que el for recorre una posicion se agregan los datos a un pack de compras
            for(var i = 0; i < response.length; i++) {
                $('#cant-'+ i).html(response[i].cantidad);
                $('#val-'+ i).html(response[i].costo);
            }
        })
        .fail(function () {
            console.log("AJAX Fail");
        })
})

