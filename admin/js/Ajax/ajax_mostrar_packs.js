/*
 * Archivo Ajax para mostrar los juegos en "tabla-packs" en "modificar_packs.php"
 * 1- Se muestran los packs de la base de datos en la tabla y se definen botones para accionar 
*/

$(document).ready(function () {
    $.ajax({
        url: "../admin/php/datos_packs_compra.php",
        dataType: "json",
        contentType: false,
        cache: false,
        processData: false,
    })
        .done(function (response) {
            //Se muestran los packs en la tabla
            for(var i = 0; i < response.length; i++) {
            $('#tabla-packs').append(
            '<tr>' +
                '<td id="id">' + response[i].id_pack + '</td>'+
                '<td id="cant">' + response[i].cantidad + '</td>'+
                '<td id="val">' + response[i].costo + '</td>'+
                '<td class="text-center">' +
                    '<button data-bs-toggle="modal" data-bs-target="#editar-pack-modal" title="Editar pack" class="btn btn-dark rounded-3 me-1 py-1 px-1" id="editar-pack-btn"><i class="bi bi-pencil-square fa-lg"></i></button>' +
                    '</td>' +
            '</tr>'
              )
            }
            
            //Se definen los botones de accion
            $('td[class="text-center"]').find('button').click(function () {
                var id = $(this).parents('tr').find('td[id="id"]').text();
                var cant = $(this).parents('tr').find('td[id="cant"]').text();
                var val = $(this).parents('tr').find('td[id="val"]').text();
                $('#id-pack-show').text(id);
                $('#id-pack-edit').val(id);
                $('#cant-edit').val(cant);
                $('#val-edit').val(val);
            });
        })
        .fail(function () {
            console.log("AJAX Fail");
        })
})

