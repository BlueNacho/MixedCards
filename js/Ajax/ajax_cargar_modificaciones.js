/*
 * Archivo Ajax carga las modificaciones hechas por el usuario. 
 * 1- Se envian los datos del formulario de "editar_perfil.php" mediante Ajax hacia el documento "modificar.php"
 * 2- Segun la respuesta obtenida se aplican cambios visuales en "editar_perfil.php"
*/

$(document).ready(function () {
    $("#editar-form").submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "../FrontEndProyecto/php/modificar.php",
            data: new FormData(this),
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
    //Detectar mail ya existe
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
    //Detectar username ya existe
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
    //Detectar fecha de nacimiento invalida
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
        //No hay errores:
        location.reload();
        $('#passwd-reg-container, #passwd-rep-reg-container').removeClass("border-success").addClass("border-light");
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
        //Hay errores
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

