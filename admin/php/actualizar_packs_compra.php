<?php
//Seteo de Ajax
$id = $_POST['id'];
$cant = $_POST['cant'];
$val = $_POST['val'];

include('../../php/ServidorBD.php');

$conexion = new ServidorBD();

//Se llama a la funcion que actualiza los packs de compra
$result= $conexion->actualizarPack($id, $cant, $val);
if ($result) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}


?>