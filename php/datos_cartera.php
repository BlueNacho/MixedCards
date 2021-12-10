<?php
session_start();
include('ServidorBD.php');
$usuario = $_SESSION['usuario']['nombre']; //Se extrae el nombre del usuario de la sesion
$conexion = new ServidorBD(); 

//Se setean los datos del usuario en variables
$datos = $conexion->verUsuario($usuario);

$array_datos = array(
    'id' => $datos['id'],
    'username' => $datos['username']
);

$id = $array_datos['id'];
$username = $array_datos['username'];

//Se obtienen los fondos totales de la cartera del usuario
$consulta = "SELECT fondos_totales FROM cartera WHERE usuario_cartera = '$username'";
$resultado = mysqli_query($conexion->conexion, ($consulta));
    $fondos_totales = array();
    while($row = mysqli_fetch_assoc($resultado)){
        array_push($fondos_totales, $row);
    }
echo json_encode($fondos_totales);
?>