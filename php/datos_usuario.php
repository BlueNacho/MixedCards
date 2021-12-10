<?php
session_start(); 

include('ServidorBD.php');

//Si la sesion esta iniciada se obtienen los datos del usuario
if (@$_SESSION['usuario']) {
    $usuario = $_SESSION['usuario']['nombre']; 
    $conexion = new ServidorBD(); 
    $datos = $conexion->verUsuario($usuario);
    //Datos del usuario
    $array_datos = array(
        'id' => $datos['id'],
        'nombre' => $datos['nombre'],
        'apellido' => $datos['apellido'],
        'username' => $datos['username'],
        'paswd' => $datos['paswd'],
        'mail' => $datos['mail'],
        'tel' => $datos['tel'],
        'nac' => $datos['nac']
    );
    echo json_encode($array_datos);
} else {
    echo json_encode('false');
}
?>