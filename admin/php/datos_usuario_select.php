<?php

//Seteo de Ajax
$id = $_POST['id']; 

include('../../php/ServidorBD.php');
$conexion = new ServidorBD(); 

//Se obtienen todos los datos de usuarios y se setean en el array "listado"
$consulta = "SELECT * FROM usuarios WHERE id_usuario ='$id'";
$result = mysqli_query($conexion->conexion, ($consulta));

$listado = array();
    while($row = mysqli_fetch_assoc($result)){
        array_push($listado, $row);
    }
echo json_encode($listado);

?>