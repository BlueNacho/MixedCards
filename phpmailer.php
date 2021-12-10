<?php
include('php/ServidorBD.php');

//Seteo de datos de Ajax en variables 
$email = $_POST['email-recovery'];

$conexion = new ServidorBD(); 
//Se obtiene la fila en usuarios donde correo sea igual al email seteado
$consulta = "SELECT*FROM usuarios where correo='$email'";
$result = mysqli_query($conexion->conexion, ($consulta));

//Cada columna del usuario se setea en un indice del array "listado"
$listado = array();
while ($row = mysqli_fetch_assoc($result)) {
    array_push($listado, $row);
}

$username = $listado[0]['username'];
$contrasenia = $listado[0]['contraseña'];
date_default_timezone_set('America/Buenos_Aires');
$day = date('d/m/y H:i:s');

//Metodo para enviar mail:
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = 0;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = 'cobaltsys.soporte@gmail.com';                     //SMTP username
    $mail->Password   = 'cobalto32123';                               //SMTP password
    $mail->SMTPSecure = 'tls';            //Enable implicit TLS encryption
    $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('cobaltsys.soporte@gmail.com', 'Cobalt Systems');
    $mail->addAddress($email);     //Add a recipient

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Mixed Cards | Recuperacion de clave';
    $mail->Body    = '<div style="color:black;"><b>Fecha: </b>' . $day . '<br>'. '<b>Usuario: </b>' . $username . '<br>' . '<b>Clave: </b>' . $contrasenia . '</div><br>' . 
    '<div style="color:#3f6d63;"><b>Por motivos de seguridad, 
    exortamos que luego de iniciar sesion cambie inmediatamente su clave en Editar Pefil. Saludos Cordiales, el equipo de Mixed Cards.</b></div>'; //Mensaje que contiene el mail

    $mail->send(); 
    echo json_encode('Enviado'); //Se envio el mail
} catch (Exception $e) {
    echo json_encode('No enviado'); //No se envio
}

?>
