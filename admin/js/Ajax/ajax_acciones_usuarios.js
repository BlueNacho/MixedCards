/*
 * Archivo Ajax para generar acciones sobre los usuarios
 * 1- Se cargan los datos de todos los usuarios de la base de datos en una lista
 * 2- Se añaden botones para modificar y eliminar cada uno de los usuarios en la lista
*/

$(document).ready(function () {
    $.ajax({
        url: "../admin/php/datos_all_usuarios.php",
        dataType: "json",
        contentType: false,
        cache: false,
        processData: false,
    })
        .done(function (response) {
            for (var i = 0; i < response.length; i++) {
                if (i >= 6) {
                    //Boton Mostrar mas|Mostrar menos tablas
                    var filas_restantes = response.length - 6;
                    var tr = '<tr class="collapse" id="tabla-collapse">';
                    $('#vermas-cont').html('<a href="" id="vermas" data-bs-toggle="collapse" data-bs-target="#tabla-collapse">Ver ' + filas_restantes + ' filas más...</a>');
                    $('tr').on('show.bs.collapse', function () {
                        $('#vermas').text('Mostrar menos...');
                    });
                    $('tr').on('hidden.bs.collapse', function () {
                        $('#vermas').text('Ver ' + filas_restantes + ' filas más...');
                    });
                } else {
                    tr = '<tr>';
                }

                //Si el usuario es administrador se mostrara en Admin Status (columna de la lista de index.php) el valor de true, de lo contrario se mostrara false
                if (response[i].administrador == 1) {
                    var admin_tag = '<span class="badge bg-success">true</span>';
                } else {
                    admin_tag = '<span class="badge bg-danger">false</span>';
                }

                //Se cargan todos los usuarios en la lista
                $('#tabla-usuarios').append(
                    tr +
                    '<td id="id">' + response[i].id_usuario + '</td>' +
                    '<td id="username">' + response[i].username + '</td>' +
                    '<td>' + response[i].nombre + '</td>' +
                    '<td>' + response[i].apellido + '</td>' +
                    '<td>' + response[i].correo + '</td>' +
                    '<td>' + response[i].telefono + '</td>' +
                    '<td>' + response[i].nacimiento + '</td>' +
                    '<td>' + admin_tag + '</td>' +
                    '<td class="text-center">' +
                    '<button data-bs-toggle="modal" data-bs-target="#editar-perfil-modal" title="Editar perfil" class="btn btn-dark rounded-3 me-1 py-1 px-1" id="editar-usuario-btn"><i class="bi bi-pencil-square fa-lg"></i></button>' +
                    '<button data-bs-toggle="modal" data-bs-target="#borrar-perfil-modal" title="Borrar perfil" class="btn btn-danger rounded-3 me-1 py-1 px-1" id="eliminar-usuario-btn"><i class="far fa-trash-alt fa-lg"></i></button>' +
                    '</td>' +
                    '</tr>'
                )

            }

            //Cuando se presione el alguno de los botones se cargaran en los Modal de modificar perfil y borrar perfil los datos necesarios
            $('td[class="text-center"]').click(function () {
                var id = $(this).parents('tr').find('td[id="id"]').text();
                $.ajax({
                    type: "POST",
                    url: "../admin/php/datos_usuario_select.php",
                    data: { 'id': id },
                    dataType: "json",
                })
                    .done(function (response) {
                        if (response[0].administrador == 1) {
                            var admin_tag = '<span class="badge bg-success">true</span>';
                        } else {
                            admin_tag = '<span class="badge bg-danger">false</span>';
                        }
                        //Modal modificar
                        $('#id-mod').val(response[0].id_usuario);
                        $('#name-mod').val(response[0].nombre);
                        $('#surname-mod').val(response[0].apellido);
                        $('#username-mod').val(response[0].username);
                        $('#email-mod').val(response[0].correo);
                        $('#tel-mod').val(response[0].telefono);
                        $('#nac-mod').val(response[0].nacimiento);
                        $('#passwd-mod').val(response[0].contraseña);
                        $('#username-card-show').text(response[0].username);
                        $('#email-card-show').text(response[0].correo);
                        //Modal eliminar
                        $('#id-eliminar-modal').text(response[0].id_usuario);
                        $('#user-eliminar-modal').text(response[0].username);
                        $('#status-eliminar-modal').html(admin_tag);
                    })
                    .fail(function () {
                        console.log("AJAX Fail");
                    })
            })

            //Cuando el formulario este en submit se enviaran los datos 
            //del usuario seleccionado que estan en el la tabla del modal eliminar perfil
            $('#alerta-eliminar').submit(function () {
                var id = $('#id-eliminar-modal').text();
                var username = $('#user-eliminar-modal').text();
                $.ajax({
                    type: "POST",
                    url: "../admin/php/eliminar_usuario.php",
                    data: { "id": id, "username": username },
                    dataType: "json",
                })
                    .done(function (response) {
                        console.log(response);
                    })
                    .fail(function () {
                        console.log("AJAX Fail");
                    })
            });

        })
        .fail(function () {
            console.log("AJAX Fail");
        })
})

