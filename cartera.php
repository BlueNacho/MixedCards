<?php
session_start();

if ($_SESSION['usuario'] == null) {
    header('location: index.html');
    exit;
}
?>

<!doctype html>
<html lang="en">

<head>
    <title>Editar perfil | Mixed Cards</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.6.1/font/bootstrap-icons.min.css">

    <!-- Bootstrap CSS v5.0.2 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

    <!-- Favicon -->
    <link rel="shortcut icon" href="img/mixed cards logo.png">

    <!-- CSS -->
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark position-static top-0 py-4">
        <div class="container">
            <a class="navbar-brand" href="index.html"><img src="img/mixed cards logo.png" alt="" width="58"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active text-uppercase mx-2" aria-current="page" href="index.html">Inicio</a>
                    </li>

                </ul>
                <form class="d-flex">
                    <div class="dropstart d-flex align-items-center mx-2">
                        <button type="button" class="btn text-light" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-translate fa-lg"></i>
                        </button>
                        <ul class="dropdown-menu blur-bg-white">
                            <li><a class="text-light dropdown-item" href="#">Español</a></li>
                            <li><a class="text-light dropdown-item" href="#">Ingles</a></li>
                        </ul>
                    </div>
                    <div class="blur-bg-white border border-0 rounded-3 d-flex align-items-center px-lg-2">
                        <a class="text-light m-2" href="#" data-bs-toggle="modal" data-bs-target="#logModal" id="log-state-icon">
                            <i class="bi bi-box-arrow-in-right fa-2x"></i></a>
                        <a class="text-light m-2" href="cosmeticos.php"><i class="bi bi-cart2 fa-lg"></i></a>
                    </div>
                </form>
            </div>
        </div>
    </nav>

    <!-- Sidebar Usuario -->
    <div class="offcanvas offcanvas-end bg-page-green text-white" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <button type="button" class="btn-close btn-close-white text-reset p-4" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        <div class="offcanvas-body">
            <!-- Usuario -->
            <div class="d-flex justify-content-center mb-4">
                <i class="far fa-user-circle fa-10x"></i>
            </div>
            <div class="d-flex justify-content-center mb-4">
                <h2 id="username-sb"></h2>
            </div>
            <!-- Opciones -->
            <hr>
            <ul class="nav nav-pills flex-column mb-auto" id="sidebar-items">
                <li class="py-2 rounded-3">
                    <div class="dropdown">
                        <button class="nav-link text-white dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-user me-2"></i>
                            Perfil
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="ver_perfil.php">
                                    <i class="far fa-id-card me-2"></i>
                                    Ver perfil</a></li>
                            <li><a class="dropdown-item" href="editar_perfil.php">
                                    <i class="fas fa-user-edit me-2"></i>
                                    Editar perfil</a></li>
                        </ul>
                    </div>
                </li>
                <li class="py-2 rounded-3">
                    <a href="cartera.php" class="nav-link active text-white ">
                        <i class="fas fa-wallet me-2"></i>
                        Cartera
                    </a>
                </li>
                <li class="py-2 rounded-3">
                    <a href="inventario.php" class="nav-link text-white">
                        <i class="fas fa-briefcase me-2"></i>
                        Inventario
                    </a>
                </li>
                <li class="py-2 rounded-3">
                    <a href="mis_estadisticas.php" class="nav-link text-white">
                        <i class="bi bi-clipboard-data me-2"></i>
                        Mis estadísticas
                    </a>
                </li>
            </ul>
            <hr>
        </div>
        <div class="d-flex align-items-end justify-content-center pb-3">
            <button class="btn btn-lg btn-outline-light w-75" type="button" id="btn-cerrar-sesion">Cerrar
                sesión</button>
        </div>
    </div>

    <!-- Cartera -->
    <div class="container py-4">
        <div class="p-4 mb-4 blur-bg-white border border-1 border-light rounded-3 text-light shadow">
            <div class="container-fluid py-2">
                <h1>Tu balance es de:</h1>
                <h1 class="display-6 mx-4 my-3" style="font-size: 70px;"><i class="bi bi-coin fa-sm me-3" title='Mixed Coins'></i><span id="balance"></span></h1>
            </div>
        </div>
        <div class="row align-items-md-stretch">
            <div class="col-md-6">
                <div class="p-3 blur-bg-white border border-1 border-light rounded-3 text-light h-100 shadow">
                    <div class="container-fluid py-3">
                        <h3>Tus movimientos</h3>
                        <hr>
                        <table class="table text-light table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">Valor</th>
                                    <th scope="col">Fecha</th>
                                </tr>
                            </thead>
                            <tbody id="tabla-movimientos">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="p-3 pb-0 h-100 blur-bg-white border border-1 border-light rounded-3 text-light shadow">
                    <div class="container-fluid py-3">
                        <h3>Comprar <b>Mixed Coins</b><i class="bi bi-coin ms-2" title='Mixed Coins'></i></h3>
                        <button data-bs-toggle="modal" data-bs-target="#comprasModal" class="btn btn-outline-light btn-lg mt-3 w-100" type="button"><i class="fas fa-box-open me-2"></i>Ver los paquetes de compra</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Paquetes de compra -->
    <div class="modal fade" id="comprasModal" tabindex="-1">
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content blur-bg-white text-white border rounded-3 border-light">
                <div class="modal-body my-3 mx-2 pb-1">

                    <button type="button" class="btn-close btn-close-white d-block d-sm-none" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="d-flex align-content-center justify-content-center mb-4">
                        <h3 class="display-6 fs-1">Paquetes de compra de <b>Mixed Coins</b></h1>
                    </div>
                    <div class="container-fluid">
                        <div class="row gx-4 mb-2">
                            <div class="col-lg-4 mb-2">
                                <div class="card text-ligt bg-page-green border border-1 border-light">
                                    <div class="card-body">
                                        <h5 class="card-title fs-1 text-center py-3"><i class="bi bi-coin me-1" title="Mixed Coins"></i>
                                            <span id="cant-0"></span>
                                        </h5>
                                    </div>
                                    <div class="card-footer pb-1 border border-light ">
                                        <h5 class="text-center">Valor: US$ <span id="val-0"></span></h5>
                                        <div class="text-center pb-1">
                                            <button type="button" id="btn-comprar0" class="btn btn-outline-light btn-sm rounded-pill" data-bs-toggle="modal" data-bs-target="#checkoutModal" data-bs-dismiss="modal">
                                                Comprar<i class="bi bi-cart2 fa-lg ms-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 mb-2">
                                <div class="card text-ligt bg-page-green border border-1 border-light">
                                    <div class="card-body">
                                        <h5 class="card-title fs-1 text-center py-3"><i class="bi bi-coin me-1" title="Mixed Coins"></i>
                                            <span id="cant-1"></span>
                                        </h5>
                                    </div>
                                    <div class="card-footer pb-1 border border-light ">
                                        <h5 class="text-center">Valor: US$ <span id="val-1"></span></h5>
                                        <div class="text-center pb-1">
                                            <button type="button" id="btn-comprar1" class="btn btn-outline-light btn-sm rounded-pill" data-bs-toggle="modal" data-bs-target="#checkoutModal" data-bs-dismiss="modal">
                                                Comprar<i class="bi bi-cart2 fa-lg ms-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 mb-2">
                                <div class="card text-ligt bg-page-green border border-1 border-light">
                                    <div class="card-body">
                                        <h5 class="card-title fs-1 text-center py-3"><i class="bi bi-coin me-1" title="Mixed Coins"></i>
                                            <span id="cant-2"></span>
                                        </h5>
                                    </div>
                                    <div class="card-footer pb-1 border border-light ">
                                        <h5 class="text-center">Valor: US$ <span id="val-2"></span></h5>
                                        <div class="text-center pb-1">
                                            <button type="button" id="btn-comprar2" class="btn btn-outline-light btn-sm rounded-pill" data-bs-toggle="modal" data-bs-target="#checkoutModal" data-bs-dismiss="modal">
                                                Comprar<i class="bi bi-cart2 fa-lg ms-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row gx-4">
                            <div class="col-lg-4 mb-2">
                                <div class="card text-ligt bg-page-green border border-1 border-light">
                                    <div class="card-body">
                                        <h5 class="card-title fs-1 text-center py-3"><i class="bi bi-coin me-1" title="Mixed Coins"></i>
                                            <span id="cant-3"></span>
                                        </h5>
                                    </div>
                                    <div class="card-footer pb-1 border border-light ">
                                        <h5 class="text-center">Valor: US$ <span id="val-3"></span></h5>
                                        <div class="text-center pb-1">
                                            <button type="button" id="btn-comprar3" class="btn btn-outline-light btn-sm rounded-pill" data-bs-toggle="modal" data-bs-target="#checkoutModal" data-bs-dismiss="modal">
                                                Comprar<i class="bi bi-cart2 fa-lg ms-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 mb-2">
                                <div class="card text-ligt bg-page-green border border-1 border-light">
                                    <div class="card-body">
                                        <h5 class="card-title fs-1 text-center py-3"><i class="bi bi-coin me-1" title="Mixed Coins"></i>
                                            <span id="cant-4"></span>
                                        </h5>
                                    </div>
                                    <div class="card-footer pb-1 border border-light ">
                                        <h5 class="text-center">Valor: US$ <span id="val-4"></span></h5>
                                        <div class="text-center pb-1">
                                            <button type="button" id="btn-comprar4" class="btn btn-outline-light btn-sm rounded-pill" data-bs-toggle="modal" data-bs-target="#checkoutModal" data-bs-dismiss="modal">
                                                Comprar<i class="bi bi-cart2 fa-lg ms-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 mb-2">
                                <div class="card text-ligt bg-page-green border border-1 border-light">
                                    <div class="card-body">
                                        <h5 class="card-title fs-1 text-center py-3"><i class="bi bi-coin me-1" title="Mixed Coins"></i>
                                            <span id="cant-5"></span>
                                        </h5>
                                    </div>
                                    <div class="card-footer pb-1 border border-light ">
                                        <h5 class="text-center">Valor: US$ <span id="val-5"></span></h5>
                                        <div class="text-center pb-1">
                                            <button type="button" id="btn-comprar5" class="btn btn-outline-light btn-sm rounded-pill" data-bs-toggle="modal" data-bs-target="#checkoutModal" data-bs-dismiss="modal">
                                                Comprar<i class="bi bi-cart2 fa-lg ms-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border border-0 d-flex align-content-center justify-content-center">
                        <p class="fs-5">Aposta responsablemente. <a href="" data-bs-target="#jrModal" data-bs-toggle="modal" data-bs-dismiss="modal" class="text-light">
                                <b>Leer más acerca del juego responsable.</b></a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal checkout -->
    <div class="modal fade" id="checkoutModal" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content blur-bg-white text-white border rounded-3 border-light">
                <form id="checkoutForm" autocomplete="off">
                    <div class="modal-body my-3 mx-2 pb-1">
                        <div class="d-flex align-content-center justify-content-center mb-4">
                            <h3 class="display-6 fs-1">Checkout</h1>
                        </div>
                        <div class="container-fluid">
                            <div class="row g-5">
                                <div class="col-md-5 col-lg-4 mb-2 order-md-last">
                                    <h4 class="d-flex justify-content-between align-items-center mb-3">
                                        <span class="text-light">Tu compra</span>
                                        <span class="badge blur-bg-white text-light rounded-pill">1</span>
                                    </h4>
                                    <span id="id" class="d-none"></span>
                                    <ul class="list-group mb-3">
                                        <li class="list-group-item d-flex justify-content-between lh-sm blur-bg-white text-light">
                                            <div>
                                                <h6 class="my-0">Cantidad<i class="bi bi-coin mx-1"></i>:</h6>
                                            </div>
                                            <span id="cant"></span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between lh-sm blur-bg-white text-light">
                                            <div>
                                                <h6 class="my-0">Valor US$:</h6>
                                            </div>
                                            <span id="val"></span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between blur-bg-white text-light">
                                            <span>Total (US$)</span>
                                            <span id="total"><strong></strong></span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-7 col-lg-8">
                                    <h4 class="mb-3">Método de pago</h4>
                                    <div class="my-3">
                                        <div class="form-check">
                                            <input id="credit" name="paymentMethod" type="radio" class="form-check-input" value="Credito" required>
                                            <label class="form-check-label" for="credit">Crédito</label>
                                        </div>
                                        <div class="form-check">
                                            <input id="debit" name="paymentMethod" type="radio" class="form-check-input" value="Debito" required>
                                            <label class="form-check-label" for="debit">Débito</label>
                                        </div>
                                        <div class="form-check">
                                            <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" value="Paypal" required>
                                            <label class="form-check-label" for="paypal">PayPal</label>
                                        </div>
                                    </div>

                                    <div class="row gy-3 mb-3">
                                        <div class="col-lg-6">
                                            <div class="form-floating text-light">
                                                <input type="text" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="Nombre" required>
                                                <label for="floatingInput">Nombre en la tarjeta</label>
                                                <small class="text-white-50">Nombre completo en la tarjeta</small>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-floating text-light">
                                                <input type="number" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="Nombre" required>
                                                <label for="floatingInput">Número de la tarjeta</label>
                                            </div>
                                        </div>

                                        <div class="col-lg-4">
                                            <div class="form-floating text-light">
                                                <input type="number" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="Nombre" required>
                                                <label for="floatingInput">Vencimiento</label>
                                            </div>
                                        </div>

                                        <div class="col-lg-4">
                                            <div class="form-floating text-light">
                                                <input type="number" class="form-control border border-2 border-light rounded rounded-3 shadow" placeholder="Nombre" required>
                                                <label for="floatingInput">CVV</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr class="my-2">
                        </div>
                        <div class="modal-footer border border-0 d-flex align-content-center justify-content-center">
                            <div class="col-lg-8">
                                <button class="w-100 btn btn-outline-light rounded-pill btn-lg w-50" id="btn-checkout" type="submit">Comprar</button>
                            </div>
                            <div class="col-lg-3 ms-3">
                                <button class="w-100 btn btn-outline-danger rounded-pill btn-lg w-50" type="button" 
                                data-bs-target="#comprasModal" data-bs-toggle="modal" data-bs-dismiss="modal" id="btn-cancel-checkout">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- Modal juego responsable -->
    <div data-bs-target="#comprasModal" data-bs-toggle="modal" data-bs-dismiss="modal">
        <div class="modal fade" id="jrModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content blur-bg-white text-white border rounded-3 border-light py-3" data-bs-target="#comprasModal" data-bs-toggle="modal" data-bs-dismiss="modal">
                    <div class="modal-body mx-3 pb-1">
                        <h1>¡Hola! Juega seguro</h1>
                        </p>Pretendemos enlazar la actividad del juego con la actitud personal
                        de cada usuario permitiendo realizar esta actividad de una manera lúdica y que su práctica no lleve a consecuencias negativas para su salud.</p>
                        <p class="text-end fst-italic">Atentamente, el equipo de Mixed Cards.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="w-100" style="padding-top: 10%;">
        <footer class="text-center text-lg-start text-light blur-bg-white shadow">
            <div class="container p-4 pb-0">
                <section class="">
                    <div class="row">
                        <div class="col-md-3 col-lg-3 col-xl-3 mx-auto d-flex align-items-center mt-3">
                            <img src="img/mixed_cards_isologo.png" class="img-fluid">
                        </div>
                        <hr class="w-100 clearfix d-md-none" />
                        <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 class="text-uppercase mb-4 font-weight-bold">Links perfilL</h6>
                            <p>
                                <a href="ver_perfil.php" class="text-white">Ver Perfil</a>
                            </p>
                            <p>
                                <a href="editar_perfil.php" class="text-white">Editar Perfil</a>
                            </p>
                        </div>
                        <hr class="w-100 clearfix d-md-none" />
                        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 class="text-uppercase mb-4 font-weight-bold">
                                Otros links
                            </h6>
                            <p>
                                <a href="cartera.php" class="text-white">Cartera</a>
                            </p>
                            <p>
                                <a href="inventario.php" class="text-white">Inventario</a>
                            </p>
                            <p>
                                <a href="mis_estadisticas.php" class="text-white">Mis estadisticas</a>
                            </p>
                        </div>
                        <hr class="w-100 clearfix d-md-none" />
                        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 class="text-uppercase mb-4 font-weight-bold">Contact</h6>
                            <p><i class="fas fa-home mr-3"></i> Montevideo, Uruguay</p>
                            <p><i class="fas fa-envelope mr-3"></i> cobaltsys.soporte@gmail.com</p>
                        </div>
                    </div>
                </section>
                <hr class="my-3">
                <section class="p-3 pt-0">
                    <div class="row d-flex align-items-center">

                        <div class="col-md-7 col-lg-8 text-center text-md-start">

                            <div class="p-3">
                                © 2021 Copyright:
                                <a class="text-white" href="#">Cobalt Systems</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </footer>
    </div>
    <!-- Footer -->

    <!-- Bootstrap JavaScript Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>

    <!-- JQuery CDN -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <!-- Font Awesome Icons -->
    <script src="js/icons.js"></script>

    <!-- Ajax -->
    <script src="js/Ajax/ajax_sesion.js"></script>
    <script src="js/Ajax/ajax_cargar_modificaciones.js"></script>
    <script src="js/Ajax/ajax_cerrar_sesion.js"></script>
    <script src="js/Ajax/ajax_datos_usuario.js"></script>
    <script src="js/Ajax/ajax_packs_compra.js"></script>
    <script src="js/Ajax/ajax_comprar.js"></script>
    <script src="js/Ajax/ajax_datos_cartera.js"></script>

    <!-- Scripts -->
    <script src="js/passwd_eye.js"></script>
    <script src="js/passwd_matching.js"></script>
    <script src="js/input_parameters.js"></script>
    <script src="js/popover.js"></script>

</body>

</html>