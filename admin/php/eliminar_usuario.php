<?php
//Seteo de Ajax
$username = $_POST['username'];
$id = $_POST['id'];

include('../../php/ServidorBD.php');
$conexion = new ServidorBD();

//Se llama a la funcion que elimina al usuario
$eliminar_usuario = $conexion->eliminarUsuario($username, $id);
if($eliminar_usuario){
    echo json_encode(true);
} else {
    echo json_encode(false);
}
?>