<?php
session_start();

include('ServidorBD.php');
$usuario = $_SESSION['usuario']['nombre']; //Se extrae el nombre del usuario de la sesion
$conexion = new ServidorBD(); 
$datos = $conexion->verUsuario($usuario);

//Se setean los datos del usuario en variables
$array_datos = array(
    'id' => $datos['id'],
    'username' => $datos['username']
);

$id = $array_datos['id'];
$username = $array_datos['username'];

//Se obtienen datos del movimiento del usuario
$consulta = "SELECT movimiento_valor, movimiento_fecha FROM movimiento WHERE id_usuario = '$id'";
$resultado = mysqli_query($conexion->conexion, ($consulta));
    $movimientos = array();
    while($row = mysqli_fetch_assoc($resultado)){
        array_push($movimientos, $row);
    }
echo json_encode($movimientos);
?>