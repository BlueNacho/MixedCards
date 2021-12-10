<?php
session_start();
//Seteo de Ajax
$admin_actual = $_SESSION['usuario']['nombre'];

include('../../php/ServidorBD.php');

$conexion = new ServidorBD();

//Se obtienen todos los usuarios menos el administrador actual para que este no pueda autoeliminarse y causar errores
$consulta = "SELECT * from usuarios where username != '$admin_actual'";
        $sentencia= mysqli_query($conexion->conexion, ($consulta));
		if ($sentencia != true) {
            echo "error";
		}
        $listado = array();
        while($row = mysqli_fetch_assoc($sentencia)){
            array_push($listado, $row);
        }
        
        echo json_encode($listado);
?>