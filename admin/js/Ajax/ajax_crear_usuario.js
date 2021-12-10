/*
 * Archivo Ajax crear usuario
 * 1- Funcionamiento igual que al del register
 * 2- La diferencia esta en que desde el Panel Administrador el administrador puede crear un usuario con permisos de admin
*/

$(document).ready(function () {
    $("#register-form").submit(function (event) {
        //Setear el valor del admin segun el estado del switch
        if ($('#admin-reg').is(':checked')) {
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
            url: "../admin/php/crear_usuario.php",
            data: data,
            dataType: "json",
            contentType: false,
            cache: false,
            processData: false,
        })
            .done(function (response) {
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
            $("#email-reg").removeClass("border-light");
            $("#email-reg").addClass("border-danger");
            $("#reg-email-alert").html("Este e-mail ya esta en uso.");
        } else {
            $("#email-reg").removeClass("border-danger");
            $("#email-reg").addClass("border-light");
            $("#reg-email-alert").empty();
        }
    }

    function validateUsernameExistence(vUE) {
        if (vUE == true) {
            $("#username-reg").removeClass("border-light");
            $("#username-reg").addClass("border-danger");
            $("#reg-username-alert").html('Usuario no disponible.');
        } else {
            $("#username-reg").removeClass("border-danger");
            $("#username-reg").addClass("border-light");
            $("#reg-username-alert").empty();
        }
    }

    function validateBirth(vB) {
        if (vB == true) {
            $("#nac-reg").removeClass("border-light");
            $("#nac-reg").addClass("border-danger");
            $("#reg-nac-alert").html("Debe ser mayor de 18 años.");
        } else {
            $("#nac-reg").removeClass("border-danger");
            $("#nac-reg").addClass("border-light");
            $("#reg-nac-alert").empty();
        }
    }
    
    if (
        eI == false &&  vEF == false &&
        vEE == false && vUF == false &&
        vUE == false && vB == false &&
        vP == false
    ) {
        location.reload();
        $("#name-reg, #surname-reg, #username-reg, #email-reg, #tel-reg, #nac-reg, #passwd-reg, #passwd-rep-reg", "#admin-reg").val('');
        $('#passwd-reg-container, #passwd-rep-reg-container').removeClass("border-success").addClass("border-light");
        $("#reg-alert").html(
            '<div class="alert alert-success d-flex align-items-center" role="alert">' + 
                '<i class="bi bi-check-lg fa-lg me-2"></i>' +
                '<div>' +
                'Usario registrado con éxito, Inicie sesión.' +
                '</div>' +
            '</div>'
        );
        validateEmailExistence(vEE);
        validateUsernameExistence(vUE);
        validateBirth(vB);  
    } else {
        $("#reg-alert").html(
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

