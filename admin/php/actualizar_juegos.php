<?php
//Seteo de Ajax
$id = $_POST['id'];
$nom = $_POST['nom'];
$pts = $_POST['pts'];

include('../../php/ServidorBD.php');

$conexion = new ServidorBD();

//Se llama a la funcion que actualiza los valores del juego
$result= $conexion->actualizarJuego($id, $nom, $pts);
if ($result) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}


?>