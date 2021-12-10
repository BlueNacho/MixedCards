<?php
//Seteo de datos de Ajax en variables
$id = $_POST['id'];
$username = $_POST['username'];

//Se crea lun array que va a contener distinas respuestas a consultas
$response = array(
    'puntosTotales' => false,
    'ganadaBJ' => false,
    'perdidaBJ' => false,
    'ganadaTruco' => false,
    'perdidaTruco' => false,
    'totalCoins' => false,
); 

include('ServidorBD.php');
$conexion = new ServidorBD();   

//Sumar los puntos en las partidas del usuario para otorgar un total
$consulta = "SELECT SUM(puntos_partida) As suma FROM partida WHERE id_usuario = '$id'";
$resultado = mysqli_query($conexion->conexion, ($consulta));
    $puntosTotales = array();
    while($row = mysqli_fetch_assoc($resultado)){
        array_push($puntosTotales, $row);
    }
//Setear respuesta al respectivo valor en el array
$response['puntosTotales'] = $puntosTotales; 

//Se cuentan las partidas de Blackjack en las que el usuario gana
$consulta = "SELECT COUNT(puntos_partida) As cantidad FROM partida WHERE id_usuario = '$id' and personaGana = 1 and id_juego = 1";
$resultado = mysqli_query($conexion->conexion, ($consulta));
    $ganadaBJ = array();
    while($row = mysqli_fetch_assoc($resultado)){
        array_push($ganadaBJ, $row);
    }
//Setear respuesta al respectivo valor en el array
$response['ganadaBJ'] = $ganadaBJ; 

//Se cuentan las partidas de Blackjack en las que el usuario pierde
$consulta = "SELECT COUNT(puntos_partida) As cantidad FROM partida WHERE id_usuario = '$id' and maquinaGana = 1 and id_juego = 1";
$resultado = mysqli_query($conexion->conexion, ($consulta));
    $perdidaBJ = array();
    while($row = mysqli_fetch_assoc($resultado)){
        array_push($perdidaBJ, $row);
    }
//Setear respuesta al respectivo valor en el array
$response['perdidaBJ'] = $perdidaBJ; 

//Se cuentan las partidas de Truco en las que el usuario gana
$consulta = "SELECT COUNT(puntos_partida) As cantidad FROM partida WHERE id_usuario = '$id' and personaGana = 1 and id_juego = 2";
$resultado = mysqli_query($conexion->conexion, ($consulta));
    $ganadaTruco = array();
    while($row = mysqli_fetch_assoc($resultado)){
        array_push($ganadaTruco, $row);
    }
//Setear respuesta al respectivo valor en el array
$response['ganadaTruco'] = $ganadaTruco; 

//Se cuentan las partidas de Truco en las que el usuario pierde
$consulta = "SELECT COUNT(puntos_partida) As cantidad FROM partida WHERE id_usuario = '$id' and maquinaGana = 1 and id_juego = 2";
$resultado = mysqli_query($conexion->conexion, ($consulta));
    $perdidaTruco = array();
    while($row = mysqli_fetch_assoc($resultado)){
        array_push($perdidaTruco, $row);
    }
//Setear respuesta al respectivo valor en el array
$response['perdidaTruco'] = $perdidaTruco; 

//Se suma todas las veces que el usuario cargo coins para otorgar un total
$consulta = "SELECT SUM(movimiento_valor) As total FROM movimiento WHERE id_usuario = '$id' and id_pack != 7";
$resultado = mysqli_query($conexion->conexion, ($consulta));
    $totalCoins = array();
    while($row = mysqli_fetch_assoc($resultado)){
        array_push($totalCoins, $row);
    }
//Setear respuesta al respectivo valor en el array
$response['totalCoins'] = $totalCoins; 

echo json_encode($response);

?>