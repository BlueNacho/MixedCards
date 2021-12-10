<?php
include('../../php/ServidorBD.php');

$conexion = new ServidorBD();

//Se obtienen todos los datos de la tabla juegos y se setean en el array "listado"
$consulta = "SELECT * from juegos";
$sentencia= mysqli_query($conexion->conexion, ($consulta));
if ($sentencia != true) {
    echo "error";
}
$listado = array();
while($row = mysqli_fetch_assoc($sentencia)){
    array_push($listado, $row);
}

echo json_encode($listado);
?>