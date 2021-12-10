/*
 * Archivo Ajax loguear admin
 * 1- Verificara que el usuario que intenta loguear es administrador
*/

 $(document).ready(function () {
    //Cuando el "login-form" en admin este en submit se verificaran los datos
    $("#login-form").submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "../admin/php/login_admin.php",
            data: new FormData(this),
            dataType: "json",
            contentType: false,
            cache: false,
            processData: false,
        })
            .done(function (response) {
                console.log(response);
                if (response == 'true') {
                    window.location = "../admin/index.php";
                }
            })
            .fail(function () {
                console.log("AJAX Fail");
            })
    })
});