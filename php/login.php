<?php
//Seteo de datos de Ajax en variables 
$usuario=$_POST['username-log'];
$contrasenia=$_POST['passwd-log'];
session_start(); 

$_SESSION['usuario'] = array(); //Se define que la sesion "usuario" va a ser un array
include('ServidorBD.php'); // Se llama al archivo ServidorBD 
$conexion = new ServidorBD(); 

$filas = $conexion->verificarUsuarioNormal($usuario, $contrasenia); //La variable filas corresponde al resultado del return de la funcion verificarUsuario (boolean) 

if($filas){ //Si el usuario existe
    $response = 'true';
    $_SESSION['usuario']['nombre'] = $usuario; //Al indice "nombre" del array se le setea el nombre del usuario que inicio sesion
    $_SESSION['usuario']['admin'] = 0; //Al indice "admin" del array se le setea 0 ya que en este archivo solo loguean usuarios comunes
} else {
    $response = 'false';
}
echo json_encode($response);
?> 


