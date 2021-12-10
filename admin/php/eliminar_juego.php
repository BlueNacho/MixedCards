<?php
//Seteo de Ajax
$id = $_POST['id'];

include('../../php/ServidorBD.php');
$conexion = new ServidorBD();

//Se llama a la funcion que elimina el juego
$eliminar_usuario = $conexion->eliminarJuego($id);
if($eliminar_usuario){
    echo json_encode(true);
} else {
    echo json_encode(false);
}
?>