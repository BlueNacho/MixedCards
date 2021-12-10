/*
 * Archivo Ajax para validar el Login o Inicio de Sesión. 
 * 1- Se envian los datos del formulario de Login de "index.html" mediante Ajax hacia el documento "login.php"
 * 2- Segun la respuesta obtenida se aplican cambios visuales en "index.html"
*/

$(document).ready(function () {
    $("#login-form").submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "../FrontEndProyecto/php/login.php",
            data: new FormData(this),
            dataType: "json",
            contentType: false,
            cache: false,
            processData: false,
        })
            //Ejecucion satisfactoria:
            .done(function (response) {
                //Error en el login:
                if (response == 'false') {  
                    console.log(response);
                    $('#log-alert').html(
                        '<div class="alert alert-danger d-flex align-items-center" role="alert">' + 
                            '<i class="bi bi-exclamation-triangle-fill fa-lg me-2"></i>' +
                            '<div>' +
                            'Usario y/o contraseña incorrectos.' +
                            '</div>' +
                        '</div>'
                        );
                //Login correcto:
                } else {
                    if (response == 'true') {
                        console.log(response);
                        $('#log-alert').html('');
                        window.location = '../FrontEndProyecto/index.html'
                    }
                }
            })
            //Ejecucion fallida:
            .fail(function () {
                console.log("AJAX Fail");
            })
    })
});