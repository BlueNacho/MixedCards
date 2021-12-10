/*
 * Archivo Ajax crear nuevo juego
 * 1- Se creara un nuevo juego con los valores asignados por el administrador
*/

$(document).ready(function () {
    //Cuando el formulario "crear-juego-form" del modal crear juego este en submit se enviaran los valores para crear el juego
    $('#crear-juego-form').submit(function (e) { 
        e.preventDefault();
        var nom = $('#nom-crear').val();
        var pts = $('#pts-crear').val();
        $.ajax({
            type: "POST",
            url: "../admin/php/crear_juego.php",
            data: {"nom":nom, "pts":pts},
            dataType: "json",
        })
            .done(function (response) {
                console.log(response);
                location.reload();
            })
            .fail(function () {
                console.log("AJAX Fail");
            })
    });
});