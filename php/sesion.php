<?php
session_start();
$response = array(
    "admin" => 0,
    "sesion" => false,
);

//Si existe una sesion se setea el indice "admin" del array response con el indice "admin" de la sesion actual, este puede ser 0 o 1
if (@$_SESSION['usuario']) {
    $response["admin"] = $_SESSION['usuario']['admin'];
    $response["sesion"] = true;
} else {
    $response["sesion"] = false;
}
echo json_encode($response);

?>