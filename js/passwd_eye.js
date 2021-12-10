/*
 * Sistema para visualizar la contraseña. 
 * Clickeando un elemento en el formulario (icono de ojo) se permite visualizar u ocultar un campo de contraseña cualquiera (donde este posicionado el respectivo elemento).
*/

$(document).ready(function () {
    //Modulos:
    $('#btn-log-eye').click(function() {
        //Asignacion de variables
        var passwd = $('#passwd-log');
        var btn = $('#btn-log-eye');
        //Llamada a la funcion
        ShowHidePasswd(passwd, btn);
    });

    $('#btn-reg-eye').click(function() {
        var passwd = $('#passwd-reg');
        var btn = $('#btn-reg-eye');
        ShowHidePasswd(passwd, btn);
    });

    $('#btn-rep-reg-eye').click(function() {
        var passwd = $('#passwd-rep-reg');
        var btn = $('#btn-rep-reg-eye');
        ShowHidePasswd(passwd, btn);
    });

    $('#btn-admin-eye').click(function() {
        var passwd = $('#passwd-admin');
        var btn = $('#btn-admin-eye');
        ShowHidePasswd(passwd, btn);
    });

    $('#btn-mod-eye').click(function() {
        var passwd = $('#passwd-mod');
        var btn = $('#btn-mod-eye');
        ShowHidePasswd(passwd, btn);
    });

    $('#btn-rep-mod-eye').click(function() {
        var passwd = $('#passwd-rep-mod');
        var btn = $('#btn-rep-mod-eye');
        ShowHidePasswd(passwd, btn);
    });

    //Funcion principal:
    function ShowHidePasswd(passwd, btn){
        //Campo de contraseña oculto (tipo contraseña):
        if(passwd.prop('type') == 'password') {
            btn.html('<i class="far fa-eye-slash"></i>');
            passwd.attr('type', 'text');
        }
        //Campo de contraseña visible (tipo texto):
        else {  
            btn.html('<i class="far fa-eye"></i>');
            passwd.attr('type', 'password');
        }
    }
});
