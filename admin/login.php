<?php
session_start();

if (isset($_SESSION['usuario']['admin'])) {
    header('location: ../index.html');
    exit;
} 
?>

<!doctype html>
<html lang="en">

<head>
  <title>Login Admin | Mixed Cards</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS v5.0.2 -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

  <link rel="stylesheet" href="css/style_login.css">

  <!-- Favicon -->
  <link rel="shortcut icon" href="../img/mixed cards logo.png">
</head>

<body>
  <!-- Admin Log -->
  <div class="container centred">
    <div class="row align-items-center g-lg-5 py-5">
      <div class="col-md-10 mx-auto col-lg-5">
        <form class="p-5 border border-0 rounded rounded-5 text-light shadow blur-bg-white" id="login-form"
          action="php/login_admin.php" method="POST" enctype="multipart/form-data">
          <div class="d-flex align-content-center justify-content-center mb-3">
            <h1 class="display-5">ADMIN</h1>
          </div>
          <div class="form-floating mb-3 text-light">
            <input type="text" class="form-control border border-2 border-light rounded rounded-3 shadow"
              id="floatingInput" placeholder="Usuario" name="username" required>
            <label for="floatingInput">Usuario</label>
          </div>
          <div class="input-group border border-2 border-light rounded rounded-3 shadow">
            <div class="form-floating flex-grow-1 text-light">
              <input type="password" class="form-control border border-0 user-select-none" id="passwd-admin"
                placeholder="Contraseña" name="passwd" required>
              <label for="floatingPassword">Contraseña</label>
            </div>
            <button class="input-group-text border border-0 bg-transparent text-light me-1" id="btn-admin-eye"
              type="button"><i class="far fa-eye"></i></button>
          </div>
          <div class="d-flex align-self-center justify-content-center">
            <button class="w-50 btn btn-lg btn-outline-light border border-2 rounded-pill shadow mt-3"
              type="submit">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Font Awesome Icons -->
  <script src="../js/icons.js"></script>

  <!-- Bootstrap JavaScript Libraries -->
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
    integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
    crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
    integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
    crossorigin="anonymous"></script>

  <!-- JQuery CDN -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

  <!-- Ajax -->
  <script src="js/Ajax/ajax_login_admin.js"></script>

  <!-- Scripts -->
  <script src="../js/passwd_eye.js"></script>
</body>

</html>