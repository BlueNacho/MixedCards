<?php
session_start(); /* inicia una sesion */

include('../../php/ServidorBD.php');

//Verifica si hay sesion
if (@$_SESSION['usuario']) {
    $usuario = $_SESSION['usuario']['nombre']; //la variable se define con el valor del usuario actual
    $conexion = new ServidorBD(); 
    $datos = $conexion->verUsuario($usuario); //Se traen los datos del usuario actual 
    //Convertir formato PHP a JavaScript
    $nacPHP = $datos['nac'];
    $nacJS = date("d-m-Y", strtotime($nacPHP));

    $array_datos = array(
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