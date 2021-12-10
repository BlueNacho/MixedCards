/*
 * Archivo Ajax para mostrar los juegos en "tabla-juegos" en "nuevo_juego.php"
 * 1- Se muestran los juegos de la base de datos en la tabla y se definen botones para accionar 
*/

$(document).ready(function () {
    $.ajax({
        url: "../admin/php/datos_juegos.php",
        dataType: "json",
        contentType: false,
        cache: false,
        processData: false,
    })
        .done(function (response) {
            var btn_borrar;
            for(var i = 0; i < response.length; i++) {
            //Esto permite que los primeros dos juegos no puedan ser eliminados (blackjack y turco)
            if(i > 1) {
                btn_borrar = '<button data-bs-toggle="modal" data-bs-target="#borrar-juego-modal" title="Borrar juego" class="btn btn-danger rounded-3 me-1 py-1 px-1" id="eliminar-juego-btn"><i class="far fa-trash-alt fa-lg"></i></button>';
            } else {
                btn_borrar = '';
            }
            //Se muestran los juegos en la tabla
            $('#tabla-juegos').append(
            '<tr>' +
                '<td id="id">' + response[i].id_juegos + '</td>'+
                '<td id="nom">' + response[i].nombre + '</td>'+
                '<td id="puntos">' + response[i].puntos_juego + '</td>'+
                '<td class="text-center">' +
                    '<button data-bs-toggle="modal" data-bs-target="#editar-juego-modal" title="Editar juego" class="btn btn-dark rounded-3 me-1 py-1 px-1" id="editar-juego-btn"><i class="bi bi-pencil-square fa-lg"></i></button>' +
                     btn_borrar+
                '</td>' +
            '</tr>'
              )
            }
            
            //Se definen los botones de acciones
            $('td[class="text-center"]').find('button').click(function () {
                //Modal modificar
                var id = $(this).parents('tr').find('td[id="id"]').text();
                var nombre = $(this).parents('tr').find('td[id="nom"]').text();
                var puntos = $(this).parents('tr').find('td[id="puntos"]').text();
                $('#id-juego-show').text(id);
                $('#id-juego-edit').val(id);
                $('#nom-edit').val(nombre);
                $('#pts-edit').val(puntos);
                //Modal eliminar
                $('#id-eliminar-modal').text(id);
                $('#nom-eliminar-modal').text(nombre);
                $('#pts-eliminar-modal').html(puntos);
            });

            //Se elimina el juego
            $('#alerta-eliminar').submit(function () {
                var id = $('#id-eliminar-modal').text();
                $.ajax({
                    type: "POST",
                    url: "../admin/php/eliminar_juego.php",
                    data: { "id": id },
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

