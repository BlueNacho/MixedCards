/*
 * Archivo Ajax modificar un usuario de la "tabla-usuarios" en el "index.php"
 * 1- Se modificara el usuario con los valores nuevos que asigne el administrador
 * 2- Funcionamiento similar al ajax de registro
*/

$(document).ready(function () {
    $("#editar-form").submit(function (event) {
        if ($('#admin-mod').is(':checked')) {
            admin= 1;
        }
        else {
            admin= 0;
        }
        data = new FormData(this);
        data.append('admin', admin);
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "../admin/php/modificar_usuario_select.php",
            data: data,
            dataType: "json",
            contentType: false,
            cache: false,
            processData: false,
        })
            .done(function (response) {
                console.log(response);
                eI = response.errorEmpty;
                vEF = response.invalidEmail_Format;
                vEE = response.invalidEmail_Exist;
                vUF = response.invalidUsername_Format;
                vUE = response.invalidUsername_Exist;
                vB = response.invalidBirth;
                vP = response.invalidPasswd;
                eventsRegisterForm(eI, vEF, vEE, vUF, vUE, vB, vP);
            })
            .fail(function () {
                console.log("AJAX Fail");
            })
    })
});

function eventsRegisterForm(eI, vEF, vEE, vUF, vUE, vB, vP) {

    function validateEmailExistence(vEE) {
        if (vEE == true) {
            $("#email-mod").removeClass("border-light");
            $("#email-mod").addClass("border-danger");
            $("#mod-email-alert").html("Este e-mail ya esta en uso.");
        } else {
            $("#email-mod").removeClass("border-danger");
            $("#email-mod").addClass("border-light");
            $("#mod-email-alert").empty();
        }
    }

    function validateUsernameExistence(vUE) {
        if (vUE == true) {
            $("#username-mod").removeClass("border-light");
            $("#username-mod").addClass("border-danger");
            $("#mod-username-alert").html('Usuario no disponible.');
        } else {
            $("#username-mod").removeClass("border-danger");
            $("#username-mod").addClass("border-light");
            $("#mod-username-alert").empty();
        }
    }

    function validateBirth(vB) {
        if (vB == true) {
            $("#nac-mod").removeClass("border-light");
            $("#nac-mod").addClass("border-danger");
            $("#mod-nac-alert").html("Debe ser mayor de 18 años.");
        } else {
            $("#nac-mod").removeClass("border-danger");
            $("#nac-mod").addClass("border-light");
            $("#mod-nac-alert").empty();
        }
    }
    
    if (
        eI == false &&  vEF == false &&
        vEE == false && vUF == false &&
        vUE == false && vB == false &&
        vP == false
    ) {
        location.reload();
        $('#passwd-mod-container, #passwd-rep-mod-container').removeClass("border-success").addClass("border-light");
        $("#mod-alert").html(
            '<div class="alert alert-success d-flex align-items-center" role="alert">' + 
                '<i class="bi bi-check-lg fa-lg me-2"></i>' +
                '<div>' +
                'Cambios aplicados con éxito.' +
                '</div>' +
            '</div>'
        );
        validateEmailExistence(vEE);
        validateUsernameExistence(vUE);
        validateBirth(vB);  
    } else {
        $("#mod-alert").html(
            '<div class="alert alert-danger d-flex align-items-center" role="alert">' + 
                '<i class="bi bi-exclamation-triangle-fill fa-lg me-2"></i>' +
                '<div>' +
                'Error.' +
                '</div>' +
            '</div>'
        );
        validateEmailExistence(vEE);
        validateUsernameExistence(vUE);
        validateBirth(vB);    
    }
}

