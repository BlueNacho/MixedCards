<?php
//Seteo de Ajax
$usuario=$_POST['username'];
$contrasenia=$_POST['passwd'];
session_start(); 

include('../../php/ServidorBD.php'); 
$conexion = new ServidorBD(); 

//Se llama a la funcion que verifica el admin
$filas = $conexion->verificarAdmin($usuario, $contrasenia); 

//Si la llamada es exitosa:
if($filas){ 
    $response = 'true'; 
    $_SESSION['usuario']['nombre'] = $usuario; //Se define el indice "nombre" con el valor del usuario
    $_SESSION['usuario']['admin'] = 1; //Se define el indice "admin" como 1 ya que este archivo autentica un login de administradores

} else {
    $response = 'false'; 
}
echo json_encode($response);
?> 
