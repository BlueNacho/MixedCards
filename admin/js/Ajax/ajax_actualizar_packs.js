/*
 * Archivo Ajax actualizar datos de packs de compra
 * 1- Se actualizan los datos del pack de compra seleccionado a los nuevos valores que setee el administador
*/

$(document).ready(function () {
    //Cuando el formulario "editar-pack-form" del modal editar pack este en submit se enviaran los nuevos valores
    $('#editar-pack-form').submit(function (e) { 
        e.preventDefault();
        var id = $('#id-pack-edit').val();
        var cant = $('#cant-edit').val();
        var val = $('#val-edit').val();
        $.ajax({
            type: "POST",
            url: "../admin/php/actualizar_packs_compra.php",
            data: {"id":id, "cant":cant, "val":val},
            dataType: "json",
        })
            .done(function (response) {
                console.log(response);
                location.reload();
            })
            .fail(function () {
                console.log("AJAX Fail");
                console.log(id, cant, val);
            })
    });
});