<?php
include('ServidorBD.php');

$conexion = new ServidorBD();

//Se obtienen los datos de los packs de compra
//Se excluye la id 7 ya que este pack es un diseño intecional a modo de parchear un problema y no tiene un uso como pack de compra (sus valores son 0)
$consulta = "SELECT * from coins where id_pack != 7"; 
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