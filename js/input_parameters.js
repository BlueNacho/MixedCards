/*
 * Sistema de verificacion de campos. 
 * Para distintos inputs verifica si los parametros que se piden en los Popover son respetados.
*/

$(document).ready(function () {
    //Modulo: campo usuario (modal register de index.html)
    $("#username-reg").keyup(function () {
        //Se repite 2 veces para que la actualizacion de la informacion de los Popovers sea en tiempo real.
        for (var i = 0; i < 2; i++) {
            //Asignacion de variables
            $("#username-reg").popover("show");
            var input = $('#username-reg');
            var param1 = $('#username-param1');
            var param2 = $('#username-param2');
            //Llamada a la funcion
            usernameParameters(input, param1, param2);
        }
    });

    $("#username-mod").keyup(function () {
        //Se repite 2 veces para que la actualizacion de la informacion de los Popovers sea en tiempo real.
        for (var i = 0; i < 2; i++) {
            //Asignacion de variables
            $("#username-mod").popover("show");
            var input = $('#username-mod');
            var param1 = $('#username-mod-param1');
            var param2 = $('#username-mod-param2');
            //Llamada a la funcion
            usernameParameters(input, param1, param2);
        }
    });

    function usernameParameters(input, param1, param2) {
        //Variable para rango de mayusculas
        var upperCase = new RegExp('[A-Z]');
        //Campo contiene mayusculas
        if ((input.val()).match(upperCase)) {
            param1.removeClass('text-danger');
            param1.addClass('text-success');
            param1.html('<p><i class="fas fa-check"></i> Al menos una mayuscula</p>');
        } else {
            param1.removeClass('text-success');
            param1.addClass('text-danger');
            param1.html('<p><i class="fas fa-times"></i> Al menos una mayuscula</p>');
        }
        //Campo es mayor a 5 caracteres
        if (input.val().length > 5) {
            param2.removeClass('text-danger');
            param2.addClass('text-success');
            param2.html('<p><i class="fas fa-check"></i> Más de 5 caracteres</p>');
        } else {
            param2.removeClass('text-success');
            param2.addClass('text-danger');
            param2.html('<p><i class="fas fa-times"></i> Más de 5 caracteres</p>');
        }

    }

    //Modulo: campo contraseña (modal register de index.html)
    $("#passwd-mod").keyup(function () {
        for (var i = 0; i < 2; i++) {
            $("#passwd-mod").popover("show");
            var input = $('#passwd-mod');
            var param1 = $('#passwd-mod-param1');
            var param2 = $('#passwd-mod-param2');
            var param3 = $('#passwd-mod-param3');
            passwdParameters(input, param1, param2, param3);
        }
    });

    $("#passwd-reg").keyup(function () {
        for (var i = 0; i < 2; i++) {
            $("#passwd-reg").popover("show");
            var input = $('#passwd-reg');
            var param1 = $('#passwd-param1');
            var param2 = $('#passwd-param2');
            var param3 = $('#passwd-param3');
            passwdParameters(input, param1, param2, param3);
        }
    });

    function passwdParameters(input, param1, param2, param3) {
        var upperCase = new RegExp('[A-Z]');
        //Variable para rango de números
        var numbers = new RegExp('[0-9]');
        //Campo contiene mayusculas
        if ((input.val()).match(upperCase)) {
            param1.removeClass('text-danger');
            param1.addClass('text-success');
            param1.html('<p><i class="fas fa-check"></i> Al menos una mayuscula</p>');
        } else {
            param1.removeClass('text-success');
            param1.addClass('text-danger');
            param1.html('<p><i class="fas fa-times"></i> Al menos una mayuscula</p>');
        }
        //Campo contiene números
        if ((input.val()).match(numbers)) {
            param2.removeClass('text-danger');
            param2.addClass('text-success');
            param2.html('<p><i class="fas fa-check"></i> Al menos un número</p>');
        } else {
            param2.removeClass('text-success');
            param2.addClass('text-danger');
            param2.html('<p><i class="fas fa-times"></i> Al menos un número</p>');
        }
        //Campo es mayor a 8 caracteres
        if (input.val().length > 8) {
            param3.removeClass('text-danger');
            param3.addClass('text-success');
            param3.html('<p><i class="fas fa-check"></i> Más de 8 caracteres</p>');
        } else {
            param3.removeClass('text-success');
            param3.addClass('text-danger');
            param3.html('<p><i class="fas fa-times"></i> Más de 8 caracteres</p>');
        }
    }
});


