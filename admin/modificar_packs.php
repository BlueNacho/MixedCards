<?php
session_start();

if (!($_SESSION['usuario']['admin'] == 1)) {
  header('location: ../index.html');
  exit;
}
?>

<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
  <meta name="generator" content="Hugo 0.84.0">
  <title>Panel administrador | Mixed Cards</title>

  <!-- Bootstrap Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.6.1/font/bootstrap-icons.min.css">

  <!-- Bootstrap CSS v5.0.2 -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

  <!-- Favicon -->
  <link rel="shortcut icon" href="../img/mixed cards logo.png">

  <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/dashboard/">

  <!-- Bootstrap core CSS -->
  <link href="../css/BootstrapCSS/bootstrap.min.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link href="css/style_admin.css" rel="stylesheet">
</head>

<body>
  <header class="navbar navbar-dark sticky-top  flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 px-3 shadow" href="index.php"><i class="fas fa-user-cog fa-lg"></i>&nbsp;&nbsp;Panel administrador</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

  </header>
  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-page-green sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="index.php">
                <i class="fas fa-users me-2"></i>
                Usuarios
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-muted" href="#">
                <i class="bi bi-clipboard-data me-2"></i>
                Estadisticas (No disponible)
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="nuevo_juego.php">
                <i class="fas fa-gamepad me-2"></i>
                Administrar juegos
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="modificar_packs.php">
                <i class="bi bi-coin me-2 fa-lg"></i>
                Modificar packs de compra
              </a>
            </li>
          </ul>

          <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-white">
            <span>Herramientas Debug</span>
            <span data-feather="plus-circle"></span>
          </h6>
          <ul class="nav flex-column mb-2">
            <li class="nav-item">
              <a class="nav-link text-muted" href="#">
                <i class="fas fa-server me-2"></i>
                Generar datos de prueba para la Base de Datos (No disponible)
              </a>
            </li>
          </ul>
        </div>
        <div class="d-flex align-items-end justify-content-center py-4 fixed-bottom" style="background-color:#3f6d63;">
          <div class="dropdown">
            <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="far fa-user-circle fa-2x me-1"></i>
              <strong id="username-admin"></strong>
            </a>
            <ul class="dropdown-menu dropdown-menu-light text-small shadow" aria-labelledby="dropdownUser1">
              <li><a class="dropdown-item" href="../editar_perfil.php">Ir a editar perfil</a></li>
              <li><a class="dropdown-item" href="../index.html">Ir a inicio</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><button class="dropdown-item" type="button" id="btn-cerrar-sesion">Cerrar sesion</button></li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- Main content -->
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="pt-4">
          <!-- Tabla de packs -->
          <h2>Packs de compra</h2>
        </div>
        <div class="table-responsive">
          <div class="col-lg-3">
            <div class="input-group mb-3">
            </div>
          </div>
          <table class="table table-striped table-sm table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Cantidad<i class="bi bi-coin ms-2 fa-lg"></i></th>
                <th scope="col">Costo US$</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody id="tabla-packs">
            </tbody>
          </table>
        </div>
        <hr>
        <div class="pt-1">

          <!-- Editar packs Modal -->
          <div class="modal fade" id="editar-pack-modal" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content bg-page-green text-white border rounded-3 border-light">
                <form id="editar-pack-form" action="php/registro.php" method="POST" enctype="multipart/form-data">
                  <div class="modal-body">
                    <div class="d-flex align-content-center justify-content-center mb-4">
                      <h3 class="display-6 fs-1">Editar pack</h3>
                    </div>
                    <div class="row g-3 mb-3 mx-4">
                      <div class="col-md-4 blur-bg-white text-white rounded-3 py-3 shadow">
                        <div class="p-3 h-100 align-self-center">
                          <div class="d-flex justify-content-center mb-1">
                            <h1 class="display-6" id="username-card-show">ID del pack</h1>
                          </div>
                          <div class="d-flex justify-content-center mb-1">
                            <h1 class="display-1" id="username-card-show">#<span id="id-pack-show"></span></h1>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-8">
                        <div class="p-5 blur-bg-white text-white rounded-3 shadow">
                          <div id="mod-alert"></div>
                          <input type="number" class="d-none" name="id-pack-edit" id="id-pack-edit">
                          <div class="form-floating mb-3 text-light">
                            <input type="number" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="Cantidad" name="cant-edit" id="cant-edit" autocomplete="off" required>
                            <label for="floatingInput">Cantidad</label>
                          </div>
                          <div class="form-floating mb-3 text-light">
                            <input type="number" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="Valor" name="val-edit" id="val-edit" autocomplete="off" required>
                            <label for="floatingInput">Valor</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="d-flex align-self-center justify-content-center">
                      <button class="w-25 btn btn-lg btn-outline-light border border-2 rounded-pill shadow mt-3" id="confirmar-guardar" type="submit">Guardar</button>
                      <button class="btn btn-lg btn-outline-danger rounded-pill shadow mt-3 ms-3" data-bs-dismiss="modal" type="button" id="confirmar-cancelar">Cancelar</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>


          <!-- Font Awesome Icons -->
          <script src="../js/icons.js"></script>

          <!-- Bootstrap JavaScript Libraries -->
          <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>

          <!-- JQuery CDN -->
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

          <!-- Ajax -->
          <script src="js/Ajax/ajax_datos_admin.js"></script>
          <script src="js/Ajax/ajax_mostrar_packs.js"></script>
          <script src="js/Ajax/ajax_cerrar_sesion_admin.js"></script>
          <script src="js/Ajax/ajax_actualizar_packs.js"></script>

          <!-- Scripts -->
          <script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js" integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE" crossorigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js" integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha" crossorigin="anonymous"></script>

</body>

</html>