/*
 * Archivo Ajax recuperacion de contrasenia
 * 1- Detecta si el mail ingresado corresponde a una cuenta
 * 2- Si es asi envia el mail hacia el archivo encargado de enviar el correo con la contraseña (phpmailer.php)
*/

$(document).ready(function () {
    $('#recovery-form').submit(function (e) {
        e.preventDefault();
        //Compreba el mail
        $.ajax({
            type: "POST",
            url: "../FrontEndProyecto/php/recovery_email_check.php",
            data: new FormData(this),
            dataType: "json",
            contentType: false,
            cache: false,
            processData: false,
        })
            .done(function (response) {
                if (response == true) {
                    $('#recovery-alert').html(
                        '<div class="alert alert-success d-flex align-items-center" role="alert">' +
                        '<i class="bi bi-check-lg fa-lg me-2"></i>' +
                        '<div>' +
                        '¡La contraseña ha sido enviada! Revise su casilla de correo electrónico.' +
                        '</div>' +
                        '</div>'
                    );
                    
                } else {
                    $('#recovery-alert').html(
                        '<div class="alert alert-danger d-flex align-items-center" role="alert">' +
                        '<i class="bi bi-exclamation-triangle-fill fa-lg me-2"></i>' +
                        '<div>' +
                        'El mail ingresado no esta asociado a ninguna cuenta.' +
                        '</div>' +
                        '</div>'
                    );
                }
            })
            .fail(function () {
                console.log("AJAX Fail");
            });
        //Carga el mail dentro de "phpmailer.php"
        $.ajax({
            type: "POST",
            url: "../FrontEndProyecto/phpmailer.php",
            data: new FormData(this),
            dataType: "json",
            contentType: false,
            cache: false,
            processData: false,
        })
            .done(function (response) {
                console.log(response);
            })
            .fail(function () {
                console.log("AJAX Fail");
            })
    });

})


