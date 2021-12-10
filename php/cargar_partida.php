<?php

session_start();

include('ServidorBD.php');
//Seteo de datos de Ajax en variables 
$idJuego = $_POST['idJuego'];
$ganaUser = $_POST['ganaUser'];
$ganaBot = $_POST['ganaBot'];

$usuario = $_SESSION['usuario']['nombre']; //Se extrae el nombre del usuario de la sesion
$conexion = new ServidorBD(); 
$datos = $conexion->verUsuario($usuario); //Se genera una consulta con el nombre del usuario para obtener los datos del mismo
 
$array_datos = array(
    'id' => $datos['id'],
    'username' => $datos['username']
);

$id = $array_datos['id'];
$username = $array_datos['username'];
$actual_date = date('Y-m-d H:i:s');

$consult = "SELECT puntos_juego FROM juegos WHERE id_juegos = '$idJuego'";
$resultado = mysqli_query($conexion->conexion, ($consult));
$resultConsulta = array();
while($row = mysqli_fetch_assoc($resultado)){
        $resultConsulta = $row['puntos_juego']; //Se obtiene los puntos del juego seleccionado
}
if ($ganaUser == 'true') { //Si gana el usuario, este gana todos los puntos
    $result = $resultConsulta;
} else { //Si pierde se le resta la mitad
    $result = $resultConsulta / 2;
    $result = -$result;
}

$consulta = "INSERT INTO partida (id_usuario, id_juego, fecha_hora, puntos_partida, personaGana, maquinaGana)
            VALUES ('$id', '$idJuego', '$actual_date', '$result', $ganaUser, $ganaBot)";
$cargar_mov = mysqli_query($conexion->conexion, ($consulta));

if($cargar_mov){ //Si la consulta fue exitosa devuelve true
    echo json_encode('true'); 
}
?>