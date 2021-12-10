/*
 * Archivo Ajax sesion
 * 1- Comprueba el valor de la sesion y segun si esta iniciada o no aplica cambios en la capa grafica
*/

$(document).ready(function () {
    $.ajax({
        type: "method",
        url: "../FrontEndProyecto/php/sesion.php",
        dataType: "json",
    })
        .done(function (response) {
            //Redirigir al index
            if(window.location.pathname == '/FrontEndProyecto/'){
                window.location = '/FrontEndProyecto/index.html';
            }
            //Hay sesion:
            if (response.sesion == true) {
                //Si el usuario es administrador se agrega un elemento mas a la lista de links del Sidebar
                //el cual le permite ingresar al Panel Administrador desde alli
                if(response.admin == 1){
                    $("#sidebar-items").append(
                        '<li class="py-2">' +
                            '<a href="admin/index.php" class="nav-link text-white">'+
                                '<i class="fas fa-user-cog me-2"></i>' +
                                'Panel administrador' +
                            '</a>'+
                        '</li>'
                        );
                } 
                //El boton de logueo pasa a ser un boton de usuario
                $('#log-state-icon').html('<i class="bi bi-person fa-2x"></i>');
                $('#log-state-icon').removeAttr('data-bs-target data-bs-toggle');
                $('#log-state-icon').removeAttr('data-bs-target data-bs-toggle');
                $('#log-state-icon').attr('data-bs-toggle', 'offcanvas').attr('data-bs-target', '#offcanvasRight').attr('aria-controls', 'offcanvasRight');
                //No hay sesion:
            } else {
                if (response.sesion == 'false') {
                    console.log(response);
                    $('#log-state-icon').html('<i class="bi bi-box-arrow-in-right fa-2x"></i>');
                    $('#log-state-icon').removeAttr('data-bs-target data-bs-toggle');
                    $('#log-state-icon').attr('data-bs-toggle', 'modal').attr('data-bs-target', '#logModal').removeAttr('aria-controls', 'offcanvasRight');
                }
            }
        })
        //Ejecucion fallida:
        .fail(function () {
            console.log("AJAX Fail");
        })
});
