<?php
//Definicion de Variables
$name = $_POST['name-reg'];
$surname = $_POST['surname-reg'];
$username = $_POST['username-reg'];
$email = $_POST['email-reg'];
$tel = $_POST['tel-reg'];
$nac = strtotime($_POST["nac-reg"]);
$passwd = $_POST['passwd-reg'];
$passwd_rep = $_POST['passwd-rep-reg'];
//Conversion a Date PHP
$nac_php = date('Y-m-d', $nac);
//Fecha actual
date_default_timezone_set('America/Buenos_Aires');
$today = date('Y-m-d');

//Definicion de Respuesta (array asociativo, con el fin de poder recibir mas de una respuesta simultaneamente)
$response = array(
    'errorEmpty' => false,
    'invalidEmail_Format' => false,
    'invalidEmail_Exist' => false,
    'invalidUsername_Format' => false,
    'invalidUsername_Exist' => false,
    'invalidBirth' => false,
    'invalidPasswd' => false,
); 

include('ServidorBD.php');

//Verifica si hay inputs vacias en el formulario
function emptyInputs($name, $surname, $username, $email, $nac, $passwd, $passwd_rep)
{
    $errorEmpty = false;
    if (
        empty($name) || empty($surname) ||
        empty($username) || empty($email) ||
        empty($nac) || empty($passwd) ||
        empty($passwd_rep)
    ) {
        $errorEmpty = true;
        global $response;
        $response['errorEmpty'] = true;  
    }
    return $errorEmpty;
}

//Valida el formato de mail ingresado 
function validateEmailFormat($email)
{
    $invalidEmail = false;
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $invalidEmail = true;
        global $response;
        $response['invalidEmail_Format'] = true;
    }
    return $invalidEmail;
}

//Verifica si el mail ingresado existe o no en la BD
function validateEmailExistence($email)
{
    $invalidEmail = false;
    $conexion = new ServidorBD();
    $consulta = "SELECT*FROM usuarios where correo= '$email'";
    $sentencia = mysqli_query($conexion->conexion, ($consulta));
    $existe = mysqli_num_rows($sentencia);
    if ($existe) {
        $invalidEmail = true;
        global $response;
        $response['invalidEmail_Exist'] = true;  
    }
    return $invalidEmail;
}

//Valida el formato de username ingresado
function validateUsernameFormat($username)
{
    $invalidUsername = false;
    if (strlen($username) <= 5 || !preg_match("/[A-Z]/", $username)) {
        $invalidUsername = true;
        global $response;
        $response['invalidUsername_Format'] = true;
    }
    return $invalidUsername;
}

//Verifica si el username ingresado existe o no en la BD
function validateUsernameExistence($username)
{
    $invalidUsername = false;
    $conexion = new ServidorBD();
    $consulta = "SELECT*FROM usuarios where username= BINARY '$username'";
    $sentencia = mysqli_query($conexion->conexion, ($consulta));
    $existe = mysqli_num_rows($sentencia);
    if ($existe) {
        $invalidUsername = true;
        global $response;
        $response['invalidUsername_Exist'] = true;
    }
    
    return $invalidUsername;
}

//Verifica si la fecha ingresada corresponde a la de un mayor de edad
function validateBirth($nac_php)
{
    $invalidBirth = false;
    $fecha_nac = new DateTime($nac_php);
    $hoy = new DateTime();
    $edad = $hoy->diff($fecha_nac);
    $edad_years = $edad->format('%y');
    if ($edad_years < 18) {
        $invalidBirth = true;
        global $response;
        $response['invalidBirth'] = true;
    }
    return $invalidBirth;
}

//Valida el formato de la contrasenia
function validatePassword($passwd, $passwd_rep)
{
    $invalidPasswd = false;
    if (
        strlen($passwd) <= 8 || strlen($passwd) > 25 ||
        !preg_match('/[A-Z]/', $passwd) || !preg_match('/[0-9]/', $passwd) ||
        $passwd != $passwd_rep
    ) {
        $invalidPasswd = true;
        global $response;
        $response['invalidPasswd'] = true;
    }
    return $invalidPasswd;
}

//Se le asigna una variable a cada llamada para hacer que se llamen todos los metodos y no se cancelen por orden de ejecucion
$emptyInputs = emptyInputs($name, $surname, $username, $email, $nac, $passwd, $passwd_rep);
$validateEmailFormat = validateEmailFormat($email);
$validateEmailExistence = validateEmailExistence($email);
$validateUsernameFormat = validateUsernameFormat($username);
$validateUsernameExistence = validateUsernameExistence($username);
$validateBirth = validateBirth($nac_php);
$validatePassword = validatePassword($passwd, $passwd_rep);

/*Si alguno de los errores ocurre se devuelve la respuesta, la misma informara de los errores ocurridos.
* Si no existen errores se registra el usuario y se devuelve la respuesta, la cual indicara que no hay errores.
*/
if ($emptyInputs == true || $validateEmailFormat == true || $validateEmailExistence == true ||
    $validateUsernameFormat == true || $validateUsernameExistence == true || $validateBirth == true ||
    $validatePassword == true) 
{
    echo json_encode($response);
} else {
    echo json_encode($response);
    $conexion = new ServidorBD();
    $registrar_usuario = $conexion->insertarDatos($name, $surname, $username, $passwd, $email, $tel, $nac_php, $today);
    $crear_cartera = $conexion->crearCartera($username);
}
