<?php
include('../../php/ServidorBD.php');

$conexion = new ServidorBD();

//Se obtienen todos los datos de coins menos el del pack 7 ya es una fila a modo de parche a un problema
//Se setean los datos en el array "listado"
$consulta = "SELECT * from coins where id_pack != 7";
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