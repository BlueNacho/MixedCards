/*
 * Archivo Ajax cargar datos del producto 
 * 1- Completa los datos del producto seleccionado segun el boton en el modal checkout de "cartera.php".
 * 2- Envia los datos de la compra a "cargar_compra.php"
*/

$(document).ready(function () {
    //Trae los datos del pack segun el numero en el array y la id del boton
    $.ajax({
        url: "../FrontEndProyecto/php/packs_compra.php",
        dataType: "json",
        })
        .done(function (response) {
            //Botones de compra
            $('#btn-comprar0').click(function () {
                var id = response[0].id_pack;
                var cant = response[0].cantidad;
                var val = response[0].costo;
                listaCheckout(cant, val, id);
            });
            $('#btn-comprar1').click(function () {
                var id = response[1].id_pack;
                var cant = response[1].cantidad;
                var val = response[1].costo;
                listaCheckout(cant, val, id);
            });
            $('#btn-comprar2').click(function () {
                var id = response[2].id_pack;
                var cant = response[2].cantidad;
                var val = response[2].costo;
                listaCheckout(cant, val, id);
            });
            $('#btn-comprar3').click(function () {
                var id = response[3].id_pack;
                var cant = response[3].cantidad;
                var val = response[3].costo;
                listaCheckout(cant, val, id);
            });
            $('#btn-comprar4').click(function () {
                var id = response[4].id_pack;
                var cant = response[4].cantidad;
                var val = response[4].costo;
                listaCheckout(cant, val, id);
            });
            $('#btn-comprar5').click(function () {
                var id = response[5].id_pack;
                var cant = response[5].cantidad;
                var val = response[5].costo;
                listaCheckout(cant, val, id);
            });
        })
        .fail(function () {
            console.log("AJAX Fail");
        })

    //Completa la lista de "Tu compra"
    function listaCheckout(cant, val, id) {
        $('#id').text(id);
        $('#cant').text(cant);
        $('#val').text(val);
        $('#total').text(val);
    }
    //Recoge los datos en la lista "Tu compra" y los envvia
    $('#checkoutForm').submit(function () { 
        var id = $('#id').text();
        var cant = $('#cant').text();
        $.ajax({
            url: "../FrontEndProyecto/php/cargar_compra.php",
            method: 'POST',
            data: {'cant': cant, 'id': id},
            dataType: "json",
            })
            .done(function (response) {
            })
            .fail(function () {
                console.log("AJAX Fail");
            })
    });
})






    


