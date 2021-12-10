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
              <a class="nav-link active" aria-current="page" href="index.php">
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
              <a class="nav-link" href="modificar_packs.php">
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

          <!-- Tabla de usuarios -->
          <h2>Datos de usuarios</h2>
        </div>
        <div class="table-responsive">
          <div class="col-lg-3">
            <div class="input-group mb-3 rounded-3">
              <input class="form-control form-control-dark text-dark" type="text" placeholder="Buscar un usuario..." aria-label="Search">
              <span class="input-group-text " id="basic-addon1"><i class="bi bi-search"></i></span>
            </div>
          </div>
          <table class="table table-striped table-sm table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Username</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">E-mail</th>
                <th scope="col">Telefono</th>
                <th scope="col">Nacimiento</th>
                <th scope="col">Admin Status</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody id="tabla-usuarios">
            </tbody>
          </table>
          <div id="vermas-cont"></div>
        </div>
        <hr>

        <!-- Editar perfil Modal -->
        <div class="modal fade" id="editar-perfil-modal" tabindex="-1">
          <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content bg-page-green text-white border rounded-3 border-light py-3">
              <div class="modal-body mx-3 pb-1">
                <div class="row g-3">
                  <div class="col-md-4 blur-bg-white text-white rounded-3 py-5 shadow">
                    <div class="p-3 h-100 align-self-center ">
                      <div class="d-flex justify-content-center">
                        <i class="far fa-user-circle fa-10x"></i>
                      </div>
                      <div class="d-flex justify-content-center mb-1">
                        <h1 class="display-6" id="username-card-show"></h1>
                      </div>
                      <div class="d-flex justify-content-center mb-2">
                        <p id="email-card-show"></p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <form id="editar-form" action="php/registro.php" method="POST" enctype="multipart/form-data">
                      <div class="p-5 blur-bg-white text-white rounded-3 shadow">
                        <div id="mod-alert"></div>
                        <input type="text" class="d-none" name="id-mod" id="id-mod">
                        <div class="row g-3">
                          <div class="col">
                            <div class="form-floating mb-3 text-light">
                              <input type="text" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="Nombre" name="name-mod" id="name-mod" required autocomplete="off">
                              <label for="floatingInput">Nombre</label>
                            </div>
                          </div>
                          <div class="col">
                            <div class="form-floating mb-3 text-light">
                              <input type="text" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="Apellido" name="surname-mod" id="surname-mod" required autocomplete="off">
                              <label for="floatingInput">Apellido</label>
                            </div>
                          </div>
                        </div>
                        <div class="row g-3">
                          <div class="col">
                            <div class="form-floating mb-3 text-light">
                              <input type="text" class="form-control border border-2 border-light rounded rounded-3 shadow " placeholder="Nombre de usuario" name="username-mod" id="username-mod" data-bs-trigger="focus" autocomplete="off">
                              <label for="floatingInput">Usuario</label>
                              <div id="mod-username-alert" class="text-danger"></div>
                            </div>
                            <!-- Popover de usuario -->
                            <div class="visually-hidden">
                              <div id="popover-title-mod">
                                <div><b>Requerimientos</b></div>
                              </div>
                              <div id="popover-content-mod" class="p-0">
                                <div class="m-0">
                                  <div class="text-danger" id="username-mod-param1">
                                    <p><i class="fas fa-times"></i> Al menos una mayuscula</p>
                                  </div>
                                  <div class="text-danger" id="username-mod-param2">
                                    <p><i class="fas fa-times"></i> Más de 5 caracteres</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col">
                            <div class="form-floating mb-3 text-light">
                              <input type="email" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="E-mail" name="email-mod" id="email-mod" required autocomplete="off">
                              <label for="floatingInput">E-mail</label>
                              <div id="mod-email-alert" class="text-danger"></div>
                            </div>
                          </div>
                        </div>
                        <div class="form-floating mb-3 text-light">
                          <input type="number" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="Número de teléfono" name="tel-mod" id="tel-mod" autocomplete="off">
                          <label for="floatingInput">Número de teléfono <label style="color: rgba(255, 255, 255, 0.514);">(Opcional)</label></label>
                        </div>
                        <div class="form-floating mb-3 text-light">
                          <input type="date" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="Nacimiento" name="nac-mod" id="nac-mod" required>
                          <label for="floatingPassword">Nacimiento</label>
                          <div id="mod-nac-alert" class="text-danger"></div>
                        </div>

                        <div class="input-group border border-2 border-light rounded rounded-3 shadow mb-3" id="passwd-mod-container">
                          <div class="form-floating flex-grow-1 text-light">
                            <input type="password" class="form-control border border-0" id="passwd-mod" placeholder="Contraseña" name="passwd-mod" minlength="9" maxlength="25" data-bs-trigger="focus" required autocomplete="off">
                            <label for="floatingPassword">Contraseña</label>
                          </div>
                          <button class="input-group-text border border-0 bg-transparent text-light me-1" id="btn-mod-eye" type="button"><i class="far fa-eye"></i></button>
                        </div>
                        <!-- Popover de contraseña -->
                        <div class="visually-hidden">
                          <div id="popover-title-passwd-mod">
                            <div><b>Requerimientos</b></div>
                          </div>
                          <div id="popover-content-passwd-mod" class="p-0">
                            <div class="m-0">
                              <div class="text-danger" id="passwd-mod-param1">
                                <p><i class="fas fa-times"></i> Al menos una mayuscula</p>
                              </div>
                              <div class="text-danger" id="passwd-mod-param2">
                                <p><i class="fas fa-times"></i> Al menos un número</p>
                              </div>
                              <div class="text-danger" id="passwd-mod-param3">
                                <p><i class="fas fa-times"></i> Más de 8 caracteres</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- / -->
                        <div class="input-group border border-2 border-light rounded rounded-3 shadow mb-3" id="passwd-rep-mod-container">
                          <div class="form-floating flex-grow-1 text-light">
                            <input type="password" class="form-control border border-0 " id="passwd-rep-mod" placeholder="Contraseña" name="passwd-rep-mod" minlength="9" maxlength="25" required autocomplete="off">
                            <label for="floatingPassword">Repetir contraseña</label>
                          </div>
                          <button class="input-group-text border border-0 bg-transparent text-light me-1" id="btn-rep-mod-eye" type="button"><i class="far fa-eye"></i></button>
                        </div>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" id="admin-mod" value="admin">
                          <label class="form-check-label" for="admin-reg">Admin</label>
                        </div>
                        <div class="d-flex align-self-center justify-content-center">
                          <button class="w-50 btn btn-lg btn-outline-light border border-2 rounded-pill shadow mt-3" type="submit" name="submit" id="btn-submit-mod">Guardar Cambios</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Eliminar perfil Modal -->
        <div class="modal fade" id="borrar-perfil-modal" tabindex="-1">
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content bg-page-green text-white border rounded-3 border-light">
              <div class="modal-header d-flex justify-content-center">
                <h3 class="modal-title">Alerta</h3>
              </div>
              <form id="alerta-eliminar">
                <div class="modal-body">
                  <div class="d-flex align-content-center justify-content-center mb-4">
                    <h3 class="display-6 fs-1">¿Está seguro de eliminiar a este usuario?</h1>
                  </div>
                  <div class="d-flex align-content-center justify-content-center mb-4">
                    <table class="table text-light table-sm w-50">
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Username</th>
                          <th scope="col">Admin Status</th>
                        </tr>
                      </thead>
                      <tbody id="tabla-usuarios">
                        <tr>
                          <td id="id-eliminar-modal"></td>
                          <td id="user-eliminar-modal"></td>
                          <td id="status-eliminar-modal"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="d-flex align-self-center justify-content-center">
                    <button class="w-25 btn btn-lg btn-outline-light border border-2 rounded-pill shadow mt-3" id="confirmar-eliminar" type="submit">Si, elminar</button>
                    <button class="btn btn-lg btn-outline-danger rounded-pill shadow mt-3 ms-3" data-bs-dismiss="modal" type="button" id="confirmar-cancelar">Cancelar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Crear usuarios -->
        <div class="pt-1">
          <h2>Crear usuarios</h2>
        </div>
        <div class="mb-5 mt-4">
          <div class="modal-dialog modal-xl">
            <div class="modal-content text-white border rounded-3 border-light py-3" style="background-color: #477a6f;">
              <div class="modal-body mx-3 pb-1">
                <div id="alert"></div>
                <form id="register-form" action="php/registro.php" method="POST" enctype="multipart/form-data">
                  <div class="row g-3">
                    <div class="col">
                      <div class="form-floating mb-3 text-light">
                        <input type="text" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="Nombre" name="name-reg" id="name-reg" required autocomplete="off">
                        <label for="floatingInput">Nombre</label>
                      </div>
                    </div>
                    <div class="col">
                      <div class="form-floating mb-3 text-light">
                        <input type="text" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="Apellido" name="surname-reg" id="surname-reg" required autocomplete="off">
                        <label for="floatingInput">Apellido</label>
                      </div>
                    </div>
                  </div>
                  <div class="row g-3">
                    <div class="col">
                      <div class="form-floating mb-3 text-light">
                        <input type="text" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="Nombre de usuario" name="username-reg" id="username-reg" data-bs-trigger="focus" required autocomplete="off">
                        <label for="floatingInput">Usuario</label>
                        <div id="reg-username-alert" class="text-danger"></div>
                      </div>
                      <!-- Popover de usuario -->
                      <div class="visually-hidden">
                        <div id="popover-title">
                          <div><b>Requerimientos</b></div>
                        </div>
                        <div id="popover-content" class="p-0">
                          <div class="m-0">
                            <div class="text-danger" id="username-param1">
                              <p><i class="fas fa-times"></i> Al menos una mayuscula</p>
                            </div>
                            <div class="text-danger" id="username-param2">
                              <p><i class="fas fa-times"></i> Más de 5 caracteres</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- / -->
                    </div>
                    <div class="col">
                      <div class="form-floating mb-3 text-light">
                        <input type="email" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="E-mail" name="email-reg" id="email-reg" required autocomplete="off">
                        <label for="floatingInput">E-mail</label>
                        <div id="reg-email-alert" class="text-danger"></div>
                      </div>

                    </div>
                  </div>
                  <div class="form-floating mb-3 text-light">
                    <input type="number" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="Número de teléfono" name="tel-reg" id="tel-reg" autocomplete="off">
                    <label for="floatingInput">Número de teléfono <label style="color: rgba(255, 255, 255, 0.514);">(Opcional)</label></label>
                  </div>
                  <div class="form-floating mb-3 text-light">
                    <input type="date" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="Nacimiento" name="nac-reg" id="nac-reg" required>
                    <label for="floatingPassword">Nacimiento</label>
                    <div id="reg-nac-alert" class="text-danger"></div>
                  </div>

                  <div class="input-group border border-2 border-light rounded rounded-3 shadow mb-3" id="passwd-reg-container">
                    <div class="form-floating flex-grow-1 text-light">
                      <input type="password" class="form-control border border-0" id="passwd-reg" placeholder="Contraseña" name="passwd-reg" minlength="9" maxlength="25" data-bs-trigger="focus" required autocomplete="off">
                      <label for="floatingPassword">Contraseña</label>
                    </div>
                    <button class="input-group-text border border-0 bg-transparent text-light me-1" id="btn-reg-eye" type="button"><i class="far fa-eye"></i></button>
                  </div>
                  <!-- Popover de contraseña -->
                  <div class="visually-hidden">
                    <div id="popover-title-passwd">
                      <div><b>Requerimientos</b></div>
                    </div>
                    <div id="popover-content-passwd" class="p-0">
                      <div class="m-0">
                        <div class="text-danger" id="passwd-param1">
                          <p><i class="fas fa-times"></i> Al menos una mayuscula</p>
                        </div>
                        <div class="text-danger" id="passwd-param2">
                          <p><i class="fas fa-times"></i> Al menos un número</p>
                        </div>
                        <div class="text-danger" id="passwd-param3">
                          <p><i class="fas fa-times"></i> Más de 8 caracteres</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- / -->
                  <div class="input-group border border-2 border-light rounded rounded-3 shadow mb-3" id="passwd-rep-reg-container">
                    <div class="form-floating flex-grow-1 text-light">
                      <input type="password" class="form-control border border-0 " id="passwd-rep-reg" placeholder="Contraseña" name="passwd-rep-reg" minlength="9" maxlength="25" required autocomplete="off">
                      <label for="floatingPassword">Repetir contraseña</label>
                    </div>
                    <button class="input-group-text border border-0 bg-transparent text-light me-1" id="btn-rep-reg-eye" type="button"><i class="far fa-eye"></i></button>
                  </div>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="admin-reg" value="admin">
                    <label class="form-check-label" for="admin-reg">Admin</label>
                  </div>
                  <div class="d-flex align-self-center justify-content-center">
                    <button class="w-50 btn btn-lg btn-outline-light border border-2 rounded-pill shadow mt-3" type="submit" name="submit" id="btn-submit-reg">Crear usuario</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
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
  <script src="js/Ajax/ajax_crear_usuario.js"></script>
  <script src="js/Ajax/ajax_acciones_usuarios.js"></script>
  <script src="js/Ajax/ajax_datos_admin.js"></script>
  <script src="js/Ajax/ajax_modificar_datos_usuario.js"></script>
  <script src="js/Ajax/ajax_cerrar_sesion_admin.js"></script>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js" integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js" integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha" crossorigin="anonymous"></script>
  <script src="../js/passwd_matching.js"></script>
  <script src="../js/input_parameters.js"></script>
  <script src="../js/passwd_eye.js"></script>
  <script src="../js/popover.js"></script>



</body>

</html>