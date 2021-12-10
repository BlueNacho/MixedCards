<?php
//Seteo de Ajax
$nom = $_POST['nom'];
$pts = $_POST['pts'];

include('../../php/ServidorBD.php');

$conexion = new ServidorBD();

//Se llama a la funcion que crea el juego
$result= $conexion->crearJuego($nom, $pts);
if ($result) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}

?>
