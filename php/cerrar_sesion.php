<?php
//Si hay una sesion iniciada se destruye
session_start();
if (@$_SESSION['usuario']) {
    echo json_encode('true');
    session_destroy();
} else {
    echo json_encode('false');
}
?>