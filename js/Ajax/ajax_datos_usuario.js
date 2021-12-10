/*
 * Archivo Ajax datos usuario
 * 1- Obtiene los datos del usuario
 * 2- Los carga en distintos lugares de la pagina
*/

$(document).ready(function () {
    $.ajax({
        type: "method",
        url: "../FrontEndProyecto/php/datos_usuario.php",
        dataType: "json",
    })
        .done(function (response) {
            //Sidebar username
            $('#username-sb').text(response.username);
            //Formulario (editar_perfil.php)
            $('#id-reg').val(response.id);
            $('#name-reg').val(response.nombre);
            $('#surname-reg').val(response.apellido);
            $('#username-reg').val(response.username);
            $('#email-reg').val(response.mail);
            $('#tel-reg').val(response.tel);
            $('#nac-reg').val(response.nac);
            $('#passwd-reg').val(response.paswd);
            $('#username-card-show').text(response.username);
            $('#email-card-show').text(response.mail);
        })
        //Ejecucion fallida:
        .fail(function () {
            console.log("AJAX Fail");
        })
});