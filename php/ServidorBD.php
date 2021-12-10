<?php 
class ServidorBD {
    private $servidor;        // En Xampp es "localhost"
    private $usuario;         // En Xampp es "root"
    private $password;        // En Xampp es ""
    private $nombreBD;        // El nombre del archivo sql en phpmyadmin
    public $conexion;        // Para las operaciones con MySQL
    
    function __construct() {
        $this->servidor = "localhost";
        $this->usuario = "root";
        $this->password = "";
        $this->nombreBD = "proyectobd";
        $this->conexion = $this->nuevaConexion($this->servidor, $this->usuario, $this->password, $this->nombreBD);
    }

/********************************************************************************/
    // Ingresa al usuario registrado registrado dentro de la base de datos
    public function insertarDatos($name, $ape, $user, $passwd, $mail, $tel, $nac, $today) {
        $consulta = "INSERT INTO USUARIOS (nombre, apellido, username, contraseña, correo, telefono, nacimiento, fecha_creacion, administrador) 
        VALUES ('$name', '$ape', '$user', '$passwd', '$mail', '$tel', '$nac', '$today', false)";
        $result= mysqli_query($this->conexion, ($consulta));
        /*if ($result != true) {
              echo "error";
        }*/
        return $result;
    }
/********************************************************************************/
    // Crea un usuario y lo registra desde el Panel Administrador
    public function crearUsuarioFromAdmin($name, $ape, $user, $passwd, $mail, $tel, $nac, $admin) {
        $consulta = "INSERT INTO USUARIOS (nombre, apellido, username, contraseña, correo, telefono, nacimiento, administrador) 
        VALUES ('$name', '$ape', '$user', '$passwd', '$mail', '$tel', '$nac', '$admin')";
        $result= mysqli_query($this->conexion, ($consulta));
        /*if ($result != true) {
              echo "error";
        }*/
        return $result;
    }
/********************************************************************************/
    // Elimina el usuario seleccionado desde el Panel Administrador
    public function eliminarUsuario($username, $id) {
        $consulta = "DELETE FROM USUARIOS 
        WHERE username= BINARY '$username'";
        $consulta2= "DELETE FROM cartera WHERE usuario_cartera = '$username'";
        $consulta3= "DELETE FROM movimiento WHERE id_usuario= '$id'";
        $result= mysqli_query($this->conexion, ($consulta));
        $result= mysqli_query($this->conexion, ($consulta2));
        $result= mysqli_query($this->conexion, ($consulta3));
        /*if ($result != true) {
              echo "error";
        }*/
        return $result;
    }
/********************************************************************************/
    // Crea una cartera cuando se crea un usuario
    public function crearCartera($user) {
        $consulta = "INSERT INTO cartera (usuario_cartera, fondos_totales)
        VALUES ('$user', 0)";
        $result= mysqli_query($this->conexion, ($consulta));
        return $result;
    }
/********************************************************************************/
    // Actualiza el dueño de la cartera
    public function updateCarteraOwner($user, $id) {
        $consulta = "UPDATE cartera
                    SET usuario_cartera = '$user'
                    WHERE usuario_cartera = (SELECT username FROM usuarios where id_usuario = '$id')";
        $result= mysqli_query($this->conexion, ($consulta));
        return $result;
    }
/********************************************************************************/ 
    // Verifica que el usuario existe en la base de datos para logearlo
    public function verificarUsuarioNormal($user, $passwd) {
        $consulta="SELECT*FROM usuarios where username= BINARY '$user' and contraseña= BINARY '$passwd' and administrador= 0";
        $result= mysqli_query($this->conexion, ($consulta));
		$existe = mysqli_num_rows($result);
        if ($result != true) {
              echo "error";
        }
        return $existe;
    }  
    
/********************************************************************************/ 
    // Verifica que el usuario es admin para logearlo con los permisos de admin
    public function verificarAdmin($user, $passwd) {
        $consulta="SELECT*FROM usuarios where username= BINARY '$user' and contraseña= BINARY '$passwd' and administrador= 1";
        $result= mysqli_query($this->conexion, ($consulta));
		$existe = mysqli_num_rows($result);
        if ($result != true) {
              echo "error";
        }
        return $existe;
    }  
    
/********************************************************************************/ 
    // Obtiene todos los datos de un determinado usuario y los almacena en un array asociativo
    public function verUsuario($user) {
        $consulta="SELECT*FROM usuarios where username='$user'";
        $result= mysqli_query($this->conexion, ($consulta));
		if ($result != true) {
            echo "error";
		}
		$num = mysqli_num_rows($result);
		if($num > 0){
    		$listado = [];
    		while($fila = mysqli_fetch_array($result)){
      		    $listado['id'] = $fila['id_usuario'];
                $listado['nombre'] = $fila['nombre'];
                $listado['apellido'] = $fila['apellido'];
                $listado['username'] = $fila['username'];
                $listado['paswd'] = $fila['contraseña'];
                $listado['mail'] = $fila['correo'];
                $listado['tel'] = $fila['telefono'];
                $listado['nac'] = $fila['nacimiento'];
    		}
		}
		return $listado;
    } 

/********************************************************************************/      
    //Actualiza los datos del usuario
    public function cambiarDatos($name, $ape, $user, $passwd, $mail, $tel, $nac) {
        session_start();
        $user_actual = $_SESSION['usuario']['nombre'];
        $nacHTML = strtotime($nac);
        $nacPHP = date('Y-m-d', $nacHTML);
        $cambios = "UPDATE usuarios
                    SET username = '$user', correo = '$mail',  nombre = '$name', apellido = '$ape', contraseña = '$passwd', telefono = '$tel', nacimiento = '$nacPHP'
                    WHERE username = '$user_actual'";
        $actualizacion = mysqli_query($this->conexion, ($cambios));
        $_SESSION['usuario']['nombre'] = $user;
        return $actualizacion;
    }

/********************************************************************************/      
    //Actualiza los datos del usuario seleccionado desde Panel Administrador           
    public function cambiarDatosFromAdmin($name, $ape, $user, $passwd, $mail, $tel, $nac, $id, $admin) {
        $nacHTML = strtotime($nac);
        $nacPHP = date('Y-m-d', $nacHTML);
        $cambios = "UPDATE usuarios
                    SET username = '$user', correo = '$mail',  nombre = '$name', apellido = '$ape', contraseña = '$passwd', telefono = '$tel', nacimiento = '$nacPHP',
                    administrador = '$admin'
                    WHERE id_usuario = '$id'";
        $actualizacion = mysqli_query($this->conexion, ($cambios));
        $_SESSION['usuario']['nombre'] = $user;
        return $actualizacion;
    }

/********************************************************************************/      
    //Actualiza el pack de compras seleccionado en Panel Administrador                  
    public function actualizarPack($id, $cant, $val) {
        $cambios = "UPDATE coins
                    SET cantidad = '$cant', costo = '$val'
                    WHERE id_pack = '$id'";
        $actualizacion = mysqli_query($this->conexion, ($cambios));
        return $actualizacion;
    }

/********************************************************************************/      
    //Actualiza los valores del juego seleccionado en Panel Administrador                    
    public function actualizarJuego($id, $nom, $pts) {
        $cambios = "UPDATE juegos
                    SET nombre = '$nom', puntos_juego = '$pts'
                    WHERE id_juegos = '$id'";
        $actualizacion = mysqli_query($this->conexion, ($cambios));
        return $actualizacion;
    }

/********************************************************************************/      
    //Crea una fila con los datos de un nuevo juego (Panel Administrador)                
    public function crearJuego($nom, $pts) {
        $cambios = "INSERT INTO juegos (nombre, puntos_juego)
                    VALUES('$nom','$pts')";
        $actualizacion = mysqli_query($this->conexion, ($cambios));
        return $actualizacion;
    }

/********************************************************************************/      
    //Elimina el juego seleccionado en Panel Administrador                   
    public function eliminarJuego($id) {
        $consulta= "DELETE FROM juegos WHERE id_juegos = '$id'";
        $result= mysqli_query($this->conexion, ($consulta));
        return $result;
    }

/********************************************************************************/    
    // Realiza la conexion con la base de datos
    private function nuevaConexion($servidor,$nombreBD,$usuario,$password) {
        $con = mysqli_connect($servidor,$nombreBD,$usuario,$password);
        if ($con->connect_error) {
            die("Connection failed: " . $con->connect_error);
        }
        return $con;
    }    

}
?>


