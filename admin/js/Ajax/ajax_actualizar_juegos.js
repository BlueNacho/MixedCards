/*
 * Archivo Ajax actualizar los datos de los juegos 
 * 1- Se actualizaran los datos del juego seleccionado en la base de datos segun los valores nuevos que setee el administrador
*/

$(document).ready(function () {
    //Cuando el formulario "editar-juego-form" del modal editar juego este en submit se enviaran los nuevos valores
    $('#editar-juego-form').submit(function (e) { 
        e.preventDefault();
        var id = $('#id-juego-edit').val();
        var nom = $('#nom-edit').val();
        var pts = $('#pts-edit').val();
        $.ajax({
            type: "POST",
            url: "../admin/php/actualizar_juegos.php",
            data: {"id":id, "nom":nom, "pts":pts},
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