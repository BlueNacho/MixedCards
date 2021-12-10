<?php
session_start();

include('ServidorBD.php');
//Seteo de datos de Ajax en variables 
$id_pack = $_POST['id'];
$cant = $_POST['cant'];
$usuario = $_SESSION['usuario']['nombre']; //Se obtiene el nombre del usuario de la sesion
$conexion = new ServidorBD(); 

//Se setean los datos del usuario en variables 
$datos = $conexion->verUsuario($usuario); 
$array_datos = array(
    'id' => $datos['id'],
    'username' => $datos['username']
);

$id = $array_datos['id'];
$username = $array_datos['username'];
$actual_date = date('Y-m-d');

//Se carga un movimiento de compra para el usuario
$consulta = "INSERT INTO movimiento (id_usuario, id_pack, usuario_cartera, movimiento_fecha, movimiento_valor)
            VALUES ('$id', '$id_pack', '$username', '$actual_date', '$cant')";
$cargar_mov = mysqli_query($conexion->conexion, ($consulta));

//Si la consulta se ejecuta de forma correcta se actualizan los fondos totales
if($cargar_mov){
    $consulta2 = "UPDATE cartera SET fondos_totales = (SELECT SUM(movimiento_valor) FROM movimiento WHERE id_usuario = '$id')
            WHERE usuario_cartera = '$username'";
    $actualizar_fondos = mysqli_query($conexion->conexion, ($consulta2)); 
    echo json_encode('true');   
} 
?>