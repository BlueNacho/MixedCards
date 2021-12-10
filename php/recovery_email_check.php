<?php
//Seteo de datos de Ajax en variables 
$email = $_POST['email-recovery'];

include('ServidorBD.php');

$conexion = new ServidorBD();

//Selecciona la fila en usuarios en la que el email ingresado sea igual a la columna correo en la base de datos
$consulta = "SELECT*FROM usuarios where correo= '$email'";
$result = mysqli_query($conexion->conexion, ($consulta));

$existe = mysqli_num_rows($result);
if ($existe) {
    echo json_encode(true);
} else {
    echo json_encode(false);
}

?>