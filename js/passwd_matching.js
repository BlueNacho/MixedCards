/*
 * Sistema de confirmacion de contraseña. 
 * Detecta si la contraseña y su confirmacion son iguales o distintas.
*/

$(document).ready(function () {
    //Modulos:
    $('#passwd-reg, #passwd-rep-reg').keyup(function () {
        //Asignacion de variables
        var passwd = $('#passwd-reg');
        var passwd_rep = $('#passwd-rep-reg');
        var btn = $('#btn-submit-reg');
        var container1 = $('#passwd-reg-container');
        var container2 = $('#passwd-rep-reg-container');
        //Llamada a la funcion
        Matching(passwd, passwd_rep, btn, container1, container2);
    });

    $('#passwd-mod, #passwd-rep-mod').keyup(function () {
        //Asignacion de variables
        var passwd = $('#passwd-mod');
        var passwd_rep = $('#passwd-rep-mod');
        var btn = $('#btn-submit-mod');
        var container1 = $('#passwd-mod-container');
        var container2 = $('#passwd-rep-mod-container');
        //Llamada a la funcion
        Matching(passwd, passwd_rep, btn, container1, container2);
    });
    //Funcion principal:
    function Matching(passwd, passwd_rep, btn, container1, container2) {
        //Campos de contraseñas vacios:
        if(passwd.val() == 0 && passwd_rep.val() == 0) {
            if(container1.hasClass('border-danger') || container2.hasClass('border-danger')) {
                container1.removeClass('border-danger');
                container2.prop('disabled', false);
                btn.removeAttr('disabled');
            } else if (container1.hasClass('border-success') || container2.hasClass('border-success')) {
                container1.removeClass('border-success');
                container2.removeClass('border-success');
            }
            container1.addClass('border-light');
            container2.addClass('border-light');
        //Contraseñas coinciden:
        } else if(passwd.val() == passwd_rep.val()) {
            if(container1.hasClass('border-light') || container2.hasClass('border-light')) {
                container1.removeClass('border-light');
                container2.removeClass('border-light');
            } else if (container1.hasClass('border-danger') || container2.hasClass('border-danger')) {
                container1.removeClass('border-danger');
                container2.removeClass('border-danger');
            }
            container1.addClass('border-success');
            container2.addClass('border-success');
            btn.prop('disabled', false);
        //Contraseñas no coinciden
        } else if(passwd.val() != passwd_rep.val()) {
            if(container1.hasClass('border-light') || container2.hasClass('border-light')) {
                container1.removeClass('border-light');
                container2.removeClass('border-light');
            } else if (container1.hasClass('border-success') || container2.hasClass('border-success')) {
                container1.removeClass('border-success');
                container2.removeClass('border-success');
            }
            container1.addClass('border-danger');
            container2.addClass('border-danger');
            btn.prop('disabled', true);
        }
        
    }
});


