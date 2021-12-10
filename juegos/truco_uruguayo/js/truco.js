/* Variables globales */

var mazo = []; //Guarda el mazo
var cartasUser = []; //Guarda la mano del usuario
var cartasBot = []; //Guarda la mano de la maquina
var cartaMuestra; //Guarda datos de la muestra
var cartaJugadaBot; //Guarda la carta con la que juega la maquina
var ganaUser = 0; //Guarda las veces que va ganando el usuario
var ganaBot = 0; //Guarda las veces que va ganando la maquina
var puntosJugador = 0; //Guarda puntos del jugador de la mano
var puntosMaquina = 0; //Guarda puntos de la maquina de la mano
var puntosJugada = 1; //Guarda los puntos por los que se juega la ronda
var puntosAddUser = 0; //Guarda todos los puntos del usuario
var puntosAddBot = 0; //Guarda todos los puntos de la maquina
var numJugada = 0; //Se utiliza para saber quien es mano. Si es par la mano es la maquina y si es impar la mano es el usuario
var hayTruco = false; //Identifica si se esta jugando el truco
var hayReTruco = false; //Identifica si se esta jugando el retruco
var firstCard = false; //Identifica si es la primer carta de la mano
var apuesta = 0; //Guarda la apuesta

var empate = false; //Identifica si en la partida hubo un empate

jugadaMano(); //Se llama a la funcion para comenzar la partida

/**
 * Carga la apuesta
 * @param {int} valorApuesta
 */
function apuestas(valorApuesta) {
    apuesta = valorApuesta;
}

/**
 * Inicia el juego
 * Carga la mano del usuario y maquina
 */
function jugadaMano() {
    numJugada += 1;
    verificarPuntos();
    metodoMazo();
    cartasUser.splice(0, 3);
    cartasBot.splice(0, 3);

    $('#cartauser').html('');
    $('#cartabot').html('');
    $('#muestraDeCartas').html('');
    $('#cartajugada').html('');

    for (i = 0; i < 3; i++) {
        cartasUser.push(pedirCarta());
        cartasBot.push(pedirCarta());
    }

    cartaMuestra = pedirCarta();
    for (i = 0; i < cartasBot.length; i++) {
        $('#cartabot').append("<img src='img/carta1.png' class='rounded-3' id= cartabot" + cartasBot[i].palo + cartasBot[i].valor + " onclick =jugada(" + cartasBot[i].valor + ",'" + cartasBot[i].palo + "','" + cartasBot[i].img + "','" + 'cartabot' + i + "')>");
    }
    verCarta(cartasUser, 'cartauser');
    verCarta(cartaMuestra, 'muestraDeCartas');
    if (numJugada % 2 !== 0) {
        if (flor(cartasUser).hayFlor == true) {
            document.getElementById('botonesadd').innerHTML = '<button type="submit" class="btn btn-dark" onclick="truco()">Truco</button> <button type="submit" class="btn btn-dark" onclick="cantarFlor()">Flor</button>';
        } else {
            document.getElementById('botonesadd').innerHTML = '<button type="submit" class="btn btn-dark" onclick="truco()">Truco</button> <button type="submit" class="btn btn-dark" onclick="cantarEnvido()">Envido</button>';
        }
    } else if (numJugada % 2 === 0) {
        noMostrar();
        document.getElementById('botonesadd').innerHTML = '';
        jugadaBot();
    }
    document.getElementById('puntosBot').innerHTML = puntosAddBot;
    document.getElementById('puntosUser').innerHTML = puntosAddUser;

}

/**
 * Funcion para cuando la maquina es mano
 */
function jugadaBot() {
    if (numJugada % 2 === 0) {
        var imagenes = document.getElementsByTagName('img');

        for (var i = 0; i < imagenes.length; i++) {
            imagenes[i].onclick = false;
        }

        if (firstCard == false && flor(cartasBot).hayFlor == true) { //Si se cumple quiere decir que la maquina quiere jugar la flor
            document.getElementById('mensaje').innerHTML = 'FLOR!';
            document.getElementById('botonRespuesta').innerHTML = '<button type="submit" class="btn btn-success" onclick="respuestaFlor(true)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16"> <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/> </svg> </button> <button type="submit" class="btn btn-danger" onclick="respuestaFlor(false)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/> <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg> </button>';
            mostrar();
            mostrar();
        } else if (firstCard == false && envido(cartasBot).hayEnvido == true && envido(cartasBot).valorEnvido > 30) { //Si se cumple quiere decir que la maquina quiere jugar el envido
            document.getElementById('mensaje').innerHTML = 'ENVIDO!';
            document.getElementById('botonRespuesta').innerHTML = '<button type="submit" class="btn btn-success" onclick="respuestaEnvido(true)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16"> <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/> </svg> </button> <button type="submit" class="btn btn-danger" onclick="respuestaEnvido(false)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/> <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg> </button>';
            mostrar();
        } else if (hayTruco = false && cartaMayor(cartasBot) > 26) { //Si se cumple quiere decir que la maquina quiere jugar el truco
            document.getElementById('mensaje').innerHTML = 'TRUCO!';
            hayTruco = true;
            document.getElementById('botonRespuesta').innerHTML = '<button type="submit" class="btn btn-success" onclick="respuestaTruco1(0)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16"> <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/> </svg> </button> <button type="submit" class="btn btn-danger" onclick="respuestaTruco1(1)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/> <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg> </button> <button type="submit" class="btn btn-info" onclick="respuestaTruco1(2)"> ReTruco </button>';
            mostrar();
        } else { //Si no se cumple ninguna se juega la mano sin ninguna funcion agregada
            cartaJugadaBot = cartaMayor(cartasBot);
            $('#cartabot' + cartaJugadaBot.palo + cartaJugadaBot.valor).remove();
            $('#cartajugada').append('<img src=' + cartaJugadaBot.img + '>');
            eliminarCarta(cartaJugadaBot, cartasBot, 'bot');

            verCarta(cartasUser, 'cartauser');
        }
        firstCard = true;
    }

}

/**
 * Inicia el mazo
 */
function metodoMazo() {
    var carta;

    mazo.length = 0;

    for (i = 1; i <= 48; i++) {
        if (i <= 12) {
            carta = { img: 'img/basto/' + i + '.png', valor: i, palo: "basto" };
            mazo.push(carta);
        }
        if (i > 12 && i <= 24) {
            carta = { img: 'img/copa/' + (i - 12) + '.png', valor: (i - 12), palo: "copa" };
            mazo.push(carta);
        }
        if (i > 24 && i <= 36) {
            carta = { img: 'img/espada/' + (i - 24) + '.png', valor: (i - 24), palo: "espada" };
            mazo.push(carta);
        }
        if (i > 36 && i <= 48) {
            carta = { img: 'img/oro/' + (i - 36) + '.png', valor: (i - 36), palo: "oro" };
            mazo.push(carta);
        }

    }
    mazo.splice(7, 2);
    mazo.splice(17, 2);
    mazo.splice(27, 2);
    mazo.splice(37, 2);
}

/**
 * Le asigna una carta a la mano del usuario o de la maquina y la elimina del mazo
 * @returns carta del mazo
 */
function pedirCarta() {
    do {
        var i = 0;
        var numeroRandom = Math.floor(Math.random() * (mazo.length - 0) + 0);
        var carta;

        if (mazo[numeroRandom]) { //Si la carta existe en el mazo se agrega, si no existe se vuelve a seleccionar otra carta
            carta = mazo[numeroRandom];
            mazo.splice(numeroRandom, 1); //Elimina la carta del mazo
        } else {
            i = 1;
        }
    } while (i == 1);
    return carta;
}

/**
 * Muestra las cartas en el sitio web
*/
function verCarta(mano, lugarCarta) {
    document.getElementById(lugarCarta).innerHTML = '';

    if (mano.length) {
        for (i = 0; i < mano.length; i++) {
            $('#' + lugarCarta).append("<img src=" + mano[i].img + " class='rounded-3' id=" + lugarCarta + mano[i].palo + mano[i].valor + " onclick =jugada(" + mano[i].valor + ",'" + mano[i].palo + "','" + mano[i].img + "','" + lugarCarta + i + "')>");
        }
    } else {
        var insertar = document.createElement("img");
        insertar.src = mano.img;
        insertar.className = 'muestra rounded-3'
        document.getElementById(lugarCarta).appendChild(insertar);
    }
}

/**
 * Identifica las cartas con el mismo palo
 * Obtiene la mano del usuario o maquina
 * Devuelve la cantidad de cartas con el mismo palo y las cartas 
 * @param {array} mano
 * @returns respuesta
 */
function mismoPalo(mano) {
    var cantCartasRepetidas = 0;
    var respuesta;
    var cartaIgual = [];

    for (i = 0; i < mano.length; i++) {
        if (i < 2) {
            for (c = 0; c < mano.length; c++) { ///////////////
                if (c != i && c > i) {
                    if (mano[i].palo == mano[c].palo) {
                        cantCartasRepetidas++;
                        if (!(cartaIgual[i])) {
                            cartaIgual.push(mano[i]);
                        } else {
                        }
                        if (!(cartaIgual[c])) {
                            cartaIgual.push(mano[c]);
                        } else {
                        }
                    }
                }
            }
        }
    }

    respuesta = { cantCardsRep: cantCartasRepetidas, cartasIguales: cartaIgual }

    return respuesta;
}

/**
 * Identifica las cartas que son pieza
 * Obtiene la mano del usuario o maquina
 * Devuelve la cantidad de piezas, las cartas que son pieza y las que no
 * @param {array} mano
 * @returns objetoDatos
 */
function mismaPieza(mano) {
    var esPieza = 0;
    var pieza = [];
    var noPieza = [];

    for (i = 0; i < mano.length; i++) {
        if (cartaMuestra.palo == mano[i].palo) {
            //******************************************************************************************************************************************** */
            if (cartaMuestra.valor == 2 || cartaMuestra.valor == 4 || cartaMuestra.valor == 5 || cartaMuestra.valor == 10 || cartaMuestra.valor == 11) {
                if (mano[i].valor == 2 || mano[i].valor == 4 || mano[i].valor == 5 || mano[i].valor == 10 || mano[i].valor == 11 || mano[i].valor == 12) {
                    esPieza = esPieza + 1;
                    pieza.push(mano[i]);
                } else {
                    noPieza.push(mano[i]);
                }
                //******************************************************************************************************************************************** */
            } else {
                if (mano[i].valor == 2 || mano[i].valor == 4 || mano[i].valor == 5 || mano[i].valor == 10 || mano[i].valor == 11) {
                    esPieza = esPieza + 1;
                    pieza.push(mano[i]);
                } else {
                    noPieza.push(mano[i]);
                }
            }
            //******************************************************************************************************************************************** */
        } else {
            noPieza.push(mano[i]);
        }
    }

    var objetoDatos = { cantidadPieza: esPieza, cartaPieza: pieza, cartaNormal: noPieza }
    return objetoDatos;
}

/**
 * Muestra el valor de la pieza
 * Obtiene el valor de la carta
 * Devuele el valor de la pieza
 * @param {int} carta
 * @returns carta
 */
function valorPieza(carta) {
    switch (carta) {
        case 2:
            carta = 30;
            break;
        case 4:
            carta = 29;
            break;
        case 5:
            carta = 28;
            break;
        case 10:
            carta = 27;
            break;
        case 11:
            carta = 27;
            break;
        case 12:
            if (cartaMuestra.valor == 2 || cartaMuestra.valor == 4 || cartaMuestra.valor == 5 || cartaMuestra.valor == 10 || cartaMuestra.valor == 11) {
                carta = valorPieza(cartaMuestra.valor);
            }
            break;
    }
    return carta;
}

/**
 * Asigna un valor a la carta dependiendo si es pieza, mata o carta normal
 * Obtiene la carta
 * Devuele el valor de esta
 * @param {object} carta 
 * @returns {int}
 */
function valorCartas(carta) {
    switch (carta.valor) {
        case 3:
            return 10;
            break;
        case 2:
            if (carta.palo == cartaMuestra.palo) {
                return valorPieza(carta.valor);
            } else {
                return 9;
            }
            break;
        case 1:
            if (carta.palo == 'espada') {
                return 14;
            } else if (carta.palo == 'basto') {
                return 13;
            } else {
                return 8;
            }
            break;
        case 12:
            if (carta.palo == cartaMuestra.palo) {
                if (carta.valor == valorPieza(carta.valor)) {
                    return 7;
                } else {
                    return valorPieza(carta.valor);
                }
            } else {
                return 7;
            }
            break;
        case 11:
            if (carta.palo == cartaMuestra.palo) {
                return valorPieza(carta.valor);
            } else {
                return 6;
            }
            break;
        case 10:
            if (carta.palo == cartaMuestra.palo) {
                return valorPieza(carta.valor);
            } else {
                return 5;
            }
            break;
        case 7:
            if (carta.palo == 'espada') {
                return 12;
            } else if (carta.palo == 'oro') {
                return 11;
            } else {
                return 4;
            }
            break;
        case 6:
            return 3;
            break;
        case 5:
            if (carta.palo == cartaMuestra.palo) {
                return valorPieza(carta.valor);
            } else {
                return 2;
            }
            break;
        case 4:
            if (carta.palo == cartaMuestra.palo) {
                return valorPieza(carta.valor);
            } else {
                return 1;
            }
            break;
        case 0:
            return 0;
            break;
    }
}

/**
 * Devuelve la carta mayor de la mano
 * @param {Array} mano
 * @returns {object}
 */
function cartaMayor(mano) {
    var manoCarta = mano;
    var mayorvalor = { valor: 0, palo: "" };
    var cartaMayor = { valor: 0, palo: "" };

    for (i = 0; i < manoCarta.length; i++) {
        if (valorCartas(manoCarta[i]) >= valorCartas(mayorvalor)) {
            mayorvalor = manoCarta[i];
            cartaMayor = manoCarta[i];
        }
    }
    return cartaMayor;
}

/**
 * Identifica la carta mayor que no es pieza
 * Obtiene la mano del usuario o maquina
 * Devuelve la carta mayor
 * @param {array} mano 
 * @returns {Object} cartaMayor
 */
function cartaMayorValor(mano) {
    var manoCarta = mismaPieza(mano).cartaNormal;
    var mayorvalor = { valor: 0, palo: "" };
    var cartaMayor = { valor: 0, palo: "" };

    for (i = 0; i < manoCarta.length; i++) {
        if (manoCarta[i].valor != 10 && manoCarta[i].valor != 11 && manoCarta[i].valor != 12) {
            if (manoCarta[i].valor >= mayorvalor.valor) {
                mayorvalor = manoCarta[i];
                cartaMayor = manoCarta[i];
            }
        }
    }
    return cartaMayor;
}

/**
 * Identifica la pieza con mayor valor
 * Obtiene la mano del usuario o maquina
 * Devuelve la carta mayor
 * @param {array} mano 
 * @returns {Object} cartaMayor
 */
function cartaMayorValorPieza(mano) {
    var manoCarta = mismaPieza(mano).cartaPieza;
    var mayorvalor = manoCarta[manoCarta.length - 1];
    var cartaMayor = { valor: 0, palo: "" };
    var identificador = 0;
    var respuesta;

    for (i = 0; i < manoCarta.length; i++) {
        if (cartaMuestra.valor == 2 || cartaMuestra.valor == 4 || cartaMuestra.valor == 5 || cartaMuestra.valor == 10 || cartaMuestra.valor == 11) {
            if (manoCarta[i].valor == 2 || manoCarta[i].valor == 4 || manoCarta[i].valor == 5 || manoCarta[i].valor == 10 || manoCarta[i].valor == 11 || manoCarta[i].valor == 12) {
                if (manoCarta[i].valor <= mayorvalor.valor) {
                    mayorvalor = manoCarta[i];
                    cartaMayor = manoCarta[i];
                    identificador = i;
                }
            }
        } else if (manoCarta[i].valor == 2 || manoCarta[i].valor == 4 || manoCarta[i].valor == 5 || manoCarta[i].valor == 10 || manoCarta[i].valor == 11) {
            if (manoCarta[i].valor <= mayorvalor.valor) {
                mayorvalor = manoCarta[i];
                cartaMayor = manoCarta[i];
                identificador = i;
            }
        }
    }

    manoCarta.splice(identificador, 1);
    respuesta = { cartaMayor: cartaMayor, manoSinCartaMayor: manoCarta }

    return respuesta;
}


/**
 * Verifica si el bot tiene envido
 * Si se cumple la condicion se muestra por consola que quiere jugar el envido
 * @returns {Object} envidoBot
 */
function botEnvido() {
    var envidoBot = envido(cartasBot);
    return envidoBot;
}

/**
 * Identifica si hay envido en la mano
 * Obtiene la mano del usuario o maquina
 * Devuelve si hay envido o no y el valor del envido
 * @param {Array} mano 
 * @returns {Object} envidoJugador
 */
function envido(mano) {
    var envidoJugador;
    var hayEnvido = false;
    var valorEnvido;
    var cartasMismoPalo = mismoPalo(mano);

    if (mismaPieza(mano).cantidadPieza == 1) {
        hayEnvido = true;
        valorEnvido = valorPieza(mismaPieza(mano).cartaPieza[0].valor) + cartaMayorValor(mano).valor;

    } else if (cartasMismoPalo.cantCardsRep == 1 || cartasMismoPalo.cantCardsRep == 3) {
        var sumaCartas = 0;

        for (i = 0; i < cartasMismoPalo.cartasIguales.length; i++) {
            if (cartasMismoPalo.cartasIguales[i].valor != 10 && cartasMismoPalo.cartasIguales[i].valor != 11 && cartasMismoPalo.cartasIguales[i].valor != 12) {
                sumaCartas = sumaCartas + cartasMismoPalo.cartasIguales[i].valor;
            }
        }
        hayEnvido = true;
        valorEnvido = 20 + sumaCartas;

    } else {
        hayEnvido = true;
        valorEnvido = cartaMayorValor(mano).valor;
    }

    envidoJugador = { hayEnvido: hayEnvido, valorEnvido: valorEnvido }
    return envidoJugador;
}

/**
 * Identifica si hay flor en la mano
 * Obtiene la mano del usuario o maquina
 * Devuelve si hay flor o no y el valor de la flor
 * @param {Array} mano 
 * @returns {Object} florJugador
 */
function flor(mano) {
    var cartasMismoPalo = mismoPalo(mano);
    var cartasMismaPieza = mismaPieza(mano);
    var cartaMayorPieza = cartaMayorValorPieza(mano);
    var florJugador;
    var hayFlor = false;
    var valorFlor = 0;

    if (cartasMismoPalo.cantCardsRep == 3) { //Tres cartas del mismo palo
        if (cartasMismaPieza.cantidadPieza == 3) { //Tres piezas
            var cartaMayorPieza = cartaMayorValorPieza(cartasMismaPieza.cartaPieza);
            var sumaCartas = 0;

            hayFlor = true;
            valorFlor = valorPieza(cartaMayorPieza.cartaMayor.valor);
            for (i = 0; i < 2; i++) {
                sumaCartas = sumaCartas + valorPieza(cartaMayorPieza.manoSinCartaMayor[i].valor) - 20;
            }
            valorFlor = valorFlor + sumaCartas;
        } else { //Tres cartas del mismo palo
            var sumaCartas = 0;
            hayFlor = true;
            for (i = 0; i < cartasMismoPalo.cartasIguales.length; i++) {
                if (cartasMismoPalo.cartasIguales[i].valor != 10 && cartasMismoPalo.cartasIguales[i].valor != 11 && cartasMismoPalo.cartasIguales[i].valor != 12) {
                    sumaCartas = sumaCartas + cartasMismoPalo.cartasIguales[i].valor;
                }
            }
            valorFlor = 20 + sumaCartas;
        }

    } else if (cartasMismoPalo.cantCardsRep == 1 && cartasMismaPieza.cantidadPieza == 1) { //Una pieza y dos cartas del mismo palo
        var sumaCartas = 0;
        hayFlor = true;

        for (i = 0; i < cartasMismoPalo.cartasIguales.length; i++) {
            if (cartasMismoPalo.cartasIguales[i].valor != 10 && cartasMismoPalo.cartasIguales[i].valor != 11 && cartasMismoPalo.cartasIguales[i].valor != 12) {
                hayFlor = true;
                sumaCartas = sumaCartas + cartasMismoPalo.cartasIguales[i].valor;
            }
        }

        valorFlor = valorPieza(cartaMayorPieza.cartaMayor.valor) + sumaCartas;
    } else if (cartasMismaPieza.cantidadPieza == 2) {   //Dos piezas
        hayFlor = true;

        valorFlor = valorPieza(cartaMayorPieza.cartaMayor.valor);
        valorFlor = valorFlor + valorPieza(cartaMayorPieza.manoSinCartaMayor[0].valor) - 20 + cartasMismaPieza.cartaNormal[0].valor;
    }

    florJugador = { hayFlor: hayFlor, valorFlor: valorFlor }
    return florJugador;
}

/**
 * Identifica quien es el ganador de la flor
 * Recibe la flor del user y el bot
 * @param {object}
 * @returns {number}
 */
function verificarPuntosFlor(flor1, flor2) {
    if (flor1.hayFlor == true) {
        if (flor2.hayFlor == true) {
            if (flor1.valorFlor > flor2.valorFlor) {
                return 1; //Gano
            } else if (flor1.valorFlor < flor2.valorFlor) {
                return 2; //Perdio
            } else if (flor1.valorFlor == flor2.valorFlor) {
                return 3; //Empato
            }
        } else {
            return 1; //Gano
        }
    } else {
        return 2; //Perdio
    }
}

/**
 * Identifica quien es el ganador de la envido
 * Recibe la flor del user y el envido
 * @param {object}
 * @returns {number}
 */
function verificarPuntosEnvido(envido1, envido2) {
    if (envido1.hayEnvido == true) {
        if (envido2.hayEnvido == true) {
            if (envido1.valorEnvido > envido2.valorEnvido) {
                return 1; //Gano
            } else if (envido1.valorEnvido < envido2.valorEnvido) {
                return 2; //Perdio
            } else if (envido1.valorEnvido == envido2.valorEnvido) {
                return 3; //Empato
            }
        } else {
            return 1;
        }
    } else {
        return 2;
    }
}

/**
 * Identifica el ganador del envido dependiendo de la respuesta de la maquina
 */
function cantarEnvido() {
    document.getElementById('botonesadd').innerHTML = '';
    var envidoBot = botEnvido();

    var resultado = verificarPuntosEnvido(envido(cartasUser), envido(cartasBot));

    if (envidoBot.hayEnvido == true) {
        document.getElementById('mensaje').innerHTML = 'Quiero jugar el envido';
        document.getElementById('botonRespuesta').innerHTML = '';
        verCarta(cartasBot, 'cartabot');
        if (resultado == 1) { //Gana el usuario
            puntosJugador += 2;
            puntosAddUser += 2;
            ganaUser += 10;
        } else if (resultado == 2) { //Pierde el usuario
            puntosMaquina += 2;
            puntosAddBot += 2;
            ganaBot += 10;
        } else if (resultado == 3) { //Gana el usuario porque es mano
            puntosJugador += 2;
            puntosAddUser += 2;
            ganaUser += 10;
        }
    } else {
        document.getElementById('mensaje').innerHTML = 'No quiero envido';
        document.getElementById('botonRespuesta').innerHTML = '';
        puntosJugador += 1;
        puntosAddUser += 1;
        ganaBot += 10;
    }
    mostrar();
    document.getElementById('puntosBot').innerHTML = puntosAddBot;
    document.getElementById('puntosUser').innerHTML = puntosAddUser;
    finMano();
    if (verificarPuntos() != true) {
        finMano();
    }
}

/**
 * Identifica el ganador de la flor dependiendo de la respuesta de la maquina
 */
function cantarFlor() {
    document.getElementById('botonesadd').innerHTML = '';
    var florBot = flor(cartasBot);
    var resultado = verificarPuntosFlor(flor(cartasUser), flor(cartasBot));

    if (florBot.hayFlor == true) {
        document.getElementById('mensaje').innerHTML = 'Quiero jugar flor';
        document.getElementById('botonRespuesta').innerHTML = '';
        verCarta(cartasBot, 'cartabot');
        if (resultado == 1) { //Gana el usuario
            puntosJugador += 3;
            puntosAddUser += 3;
            ganaUser += 10;
        } else if (resultado == 2) { //Pierde el usuario
            puntosMaquina += 3;
            puntosAddBot += 3;
            ganaBot += 10;
        } else if (resultado == 3) { //Gana el usuario
            puntosJugador += 3;
            puntosAddUser += 3;
            ganaUser += 10;
        }
    } else {
        document.getElementById('mensaje').innerHTML = 'No quiero flor';
        document.getElementById('botonRespuesta').innerHTML = '';
        puntosJugador += 1;
        puntosAddUser += 1;
        ganaUser += 10;
    }
    mostrar();
    document.getElementById('puntosBot').innerHTML = puntosAddBot;
    document.getElementById('puntosUser').innerHTML = puntosAddUser;
    finMano();
    if (verificarPuntos() != true) {
        finMano();
    }
}

/**
 * Verifica quien gano y toma acciones segun el ganador
 * @param {number} respuesta
 */
function respuestaTruco1(respuesta) { //FALTAAAAAAAAAAAAAAAAAA
    noMostrar();
    if (respuesta == 0) { //Usuario quiere truco
        hayTruco = true;
        jugadaBot();
    } else if (respuesta == 1) { //Usuario no quiere truco
        puntosMaquina += puntosJugada;
        puntosAddBot += puntosJugada;
        finMano();
    } else if (respuesta == 2) { //Usuario quiere reTruco
        var respuesta = respuestaTruco();

        if (respuesta.peticion == 2) {
            hayReTruco = true;
            jugadaBot();
        } else if (respuesta.peticion < 2) {
            puntosJugador += puntosJugada;
            puntosAddUser += puntosJugada;
            finMano();
        }

    }
}


/**
 * Verifica quien gano y toma acciones segun el ganador
 * @param {boolean} respuesta
 */
function respuestaFlor(respuesta) {
    noMostrar();
    if (respuesta == true) {
        verCarta(cartasBot, 'cartabot');
        var resultado = verificarPuntosFlor(flor(cartasBot), flor(cartasUser));

        if (resultado == 1) { //Pierde el usuario
            puntosMaquina += 3;
            puntosAddBot += 3;
            ganaBot += 10;
        } else if (resultado == 2) { //Gana el usuario
            puntosJugador += 3;
            puntosAddUser += 3;
            ganaUser += 10;
        } else if (resultado == 3) { //Pierde el usuario
            puntosMaquina += 3;
            puntosAddBot += 3;
            ganaBot += 10;
        }
    } else if (respuesta == false) { //Pierde el usuario
        puntosMaquina += 1;
        puntosAddBot += 1;
        ganaBot += 10;
    }

    document.getElementById('puntosBot').innerHTML = puntosAddBot;
    document.getElementById('puntosUser').innerHTML = puntosAddUser;
    finMano();
    verificarPuntos();
}

/**
 * Verifica quien gano y toma acciones segun el ganador
 * @param {boolean} respuesta
 */
function respuestaEnvido(respuesta) {
    noMostrar();
    if (respuesta == true) {
        verCarta(cartasBot, 'cartabot');
        var resultado = verificarPuntosEnvido(envido(cartasBot), envido(cartasUser));

        if (resultado == 1) { //Pierde el usuario
            puntosMaquina += 2;
            puntosAddBot += 2;
            ganaBot += 10;
        } else if (resultado == 2) { //Gana el usuario
            puntosJugador += 2;
            puntosAddUser += 2;
            ganaUser += 10;
        } else if (resultado == 3) {//Pierde el usuario
            puntosMaquina += 2;
            puntosAddBot += 2;
            ganaBot += 10;
        }
    } else if (respuesta == false) { //Pierde el usuario
        puntosMaquina += 1;
        puntosAddBot += 1;
        ganaBot += 10;
    }

    /**Se actualizan los datos */
    document.getElementById('puntosBot').innerHTML = puntosAddBot;
    document.getElementById('puntosUser').innerHTML = puntosAddUser;

    finMano();
    verificarPuntos();
}

/**
 * Funcion para el truco
 */
function truco() {
    document.getElementById('botonesadd').innerHTML = '';
    var respuesta = respuestaTruco(); //Obtiene la respuesta de la maquina

    if (respuesta.peticion == 0) { //La maquina no quiere jugar el truco
        document.getElementById('mensaje').innerHTML = 'No quiero Truco';
        document.getElementById('botonRespuesta').innerHTML = '';
        puntosJugador += puntosJugada;
        puntosAddUser += puntosJugada;
        ganaUser += 20;
        finMano();

    } else if (respuesta.peticion == 1) { //La maquina quiere jugar el truco
        document.getElementById('mensaje').innerHTML = 'Quiero jugar el Truco';
        document.getElementById('botonRespuesta').innerHTML = '';
        hayTruco = true;
    } else if (respuesta.peticion == 2) { //La maquina quiere reTruco
        document.getElementById('mensaje').innerHTML = 'Quiero re truco';
        document.getElementById('botonRespuesta').innerHTML = '';
        var imagenes = document.getElementsByTagName('img'); //Variable para deshabilitar las cartas del usuario
        for (var i = 0; i < imagenes.length; i++) {
            imagenes[i].onclick = false;
        }
        document.getElementById('botonRespuesta').innerHTML = '<button type="submit" class="btn btn-success" onclick="reTruco(true)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16"> <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/> </svg> </button> <button type="submit" class="btn btn-danger" onclick="reTruco(false)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/> <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg> </button>';

    }
    mostrar(); //Muestra notificaion del usuario

    /**Se actualizan los datos */
    document.getElementById('puntosBot').innerHTML = puntosAddBot;
    document.getElementById('puntosUser').innerHTML = puntosAddUser;

    verificarPuntos();
}

/**
 * Funcion que verifica si el usuario acepta el retruco, (true si acepta, false si no quiere)
 * @param {boolean} respuesta
 */
function reTruco(decision) {
    noMostrar();

    if (decision == true) {
        document.getElementById('botonesadd').innerHTML = ''; //Elimina los botones
        verCarta(cartasUser, 'cartauser'); //Habilita las cartas
        hayReTruco = true;
    } else {
        //Se agregan los puntos a la maquina
        puntosMaquina += puntosJugada;
        puntosAddBot += puntosJugada;
        finMano();
    }
    /**Se actualizan los datos */
    document.getElementById('puntosBot').innerHTML = puntosAddBot;
    document.getElementById('puntosUser').innerHTML = puntosAddUser;

    verificarPuntos();
}

/**
 * Respuesta de la maquina para el truco
 * Devuelve la carta que selecciono y la decicion de la maquina
 * @returns {Object}
 */
function respuestaTruco() {
    var num = cartaMayor(cartasBot);
    var acepto = 0;

    if (valorCartas(num) > 26) {
        acepto = 2; //ReTruco
    } else if (valorCartas(num) > 9) {
        acepto = 1; //Quiere truco
    } else {
        acepto = 0; //No quiere truco
    }
    return { carta: num, peticion: acepto };
}

/**
 * Obtiene la carta mayor a la carta que recibe como parametro
 * Si no hay devuelve la primer carta
 * Recibe la carta con la que jugo el usuario
 * Devuelve una carta del mazo de la maquina
 * @param {Object} carta 
 * @returns {Object} respuesta
 */
function cartaMayorDeRespuesta(carta) {
    var existeMayor = false;
    var respuesta;
    var identificador;
    var valorCarta = valorCartas(carta);

    for (i = 0; i < cartasBot.length; i++) {
        if (valorCartas(cartasBot[i]) > valorCarta) { //Si hay una carta de la mano de la maquina mayor a la del usuario, esta sera la respuesta de la funcion
            existeMayor = true;
            identificador = i;
            respuesta = cartasBot[i];
        }
    }

    if (existeMayor == false) { //Si no existe una carta mayor a la del usuario entonces entra a las siguientes condiciones
        for (i = 0; i < cartasBot.length; i++) {
            if (valorCartas(cartasBot[i]) == valorCarta) { //Si hay una carta de la mano de la maquina igual a la del usuario, esta sera la respuesta de la funcion
                existeMayor = true;
                identificador = i;
                respuesta = cartasBot[i];
            }
        }
        if (existeMayor == false) { //Si no hay cartas mayores y tampoco del mismo valor la respuesta sera la primer carta de la mano de la maquina
            existeMayor = true;
            //Math.floor(Math.random() * (cartasBot.length - 0) + 0);
            identificador = cartasBot.length - 1;
            respuesta = cartasBot[cartasBot.length - 1];
        }
    }

    cartasBot.splice(identificador, 1); //Se borra la carta de la mano
    return respuesta;
}

/**
 * Inicia la jugada
 * Compara los valores y muestra por consola quien gano
 * @param {int} valor 
 * @param {int} palo 
 * @param {int} imagen 
 * @param {int} id 
 */
function jugada(valor, palo, imagen, id) {
    const cartaJugada = { palo: palo, valor: valor, img: imagen };
    var valorFinalCartaUser;
    var valorFinalCartaBot;

    if (numJugada % 2 !== 0) { //Si el numero de la jugada no es divicible entre 2 quiere decir que el usuario es la mano
        if (hayTruco == false) {
            document.getElementById('botonesadd').innerHTML = '<button type="submit" class="btn btn-dark" onclick="truco()">Truco</button>';
        }

        const cartaRespuesta = cartaMayorDeRespuesta(cartaJugada);
        valorFinalCartaUser = valorCartas(cartaJugada); //Valor de la carta del usuario
        valorFinalCartaBot = valorCartas(cartaRespuesta); //Valor de la carta de la maquina

        //Hacer funcion para eliminar carta (interfaz y array)

        $('#botonesAdicionales').html('');
        $('#cartajugada').html('');
        $('#cartauser' + palo + valor).remove();
        $('#cartabot' + cartaRespuesta.palo + cartaRespuesta.valor).remove();

        $('#cartajugada').append('<img src=' + cartaJugada.img + ' id=' + id + '>', '<img src=' + cartaRespuesta.img + ' id=' + id + '>'); //Muestra las dos cartas seleccionadas en la pagina
        compararPuntos(valorFinalCartaUser, valorFinalCartaBot);

    } else if (numJugada % 2 === 0) { //Si el numero de la jugada es divicible entre 2 quiere decir que la maquina es la mano
        $('#cartauser' + palo + valor).remove(); //Elimina la carta seleccionada de la mano del usuario
        $('#cartajugada').append('<img src=' + cartaJugada.img + '>'); //Se muestra la carta seleccionada por el usuario

        var imagenes = document.getElementsByTagName('img'); //Variable para deshabilitar las cartas del usuario
        for (var i = 0; i < imagenes.length; i++) {
            imagenes[i].onclick = false;
        }

        valorFinalCartaUser = valorCartas(cartaJugada); //Valor de la carta del usuario
        valorFinalCartaBot = valorCartas(cartaJugadaBot); //Valor de la carta del bot

        compararPuntos(valorFinalCartaUser, valorFinalCartaBot);

        setTimeout(function () { //Si los puntos de la partida y de cada jugador son menores a los limites establecidos llamara luego de 2000 milisegundos a la funcion "jugadaBot()" para que la maquina siga jugando la partida
            $('#cartajugada').html('');
            if (ganaBot < 2 || ganaUser < 2) {
                if (puntosAddUser < 20 || puntosAddBot < 20) {
                    if (numJugada % 2 === 0) {
                        jugadaBot();
                    }
                }
            }
        }, 2000);
    }
    eliminarCarta(cartaJugada, cartasUser, 'user'); //Elimina la carta de la mano

    /*Se actualizan los puntos totales de los jugadores*/
    document.getElementById('puntosBot').innerHTML = puntosAddBot;
    document.getElementById('puntosUser').innerHTML = puntosAddUser;

    if (puntosAddUser >= 20 || puntosAddBot >= 20) { //Si el usuario o la maquina superan los 20 puntos se termina la jugada
        verificarPuntos();
    } else {
        verificarPartida(); //Si no se cumple la condicion llamamos a esta funcion para saber si algun jugador gano mas de 2 veces
    }
}

function compararPuntos(valorFinalCartaUser, valorFinalCartaBot) {
    if (valorFinalCartaUser > valorFinalCartaBot) { //Si el usuario tiene una carta con mayor valor  gana el user
        puntosJugador += puntosJugada;
        puntosAddUser += puntosJugada;

        if (empate == true) {
            ganaUser += 2;
            empate = false;
        } else {
            ganaUser += 1;
        }
        puntosJugada = 1;

    } else if (valorFinalCartaUser < valorFinalCartaBot) { //Si la maquina tiene una carta con mayor valor gana la maquina
        puntosMaquina += puntosJugada;
        puntosAddBot += puntosJugada;

        if (empate == true) {
            ganaBot += 2;
            empate = false;
        } else {
            ganaBot += 1;
        }
        puntosJugada = 1;

    } else if (valorFinalCartaUser == valorFinalCartaBot) { //Si las dos cartas tienen el mismo valor hay un empate
        puntosJugada += 1;
        empate = true;
        if (ganaBot == ganaUser) {
            if (numJugada % 2 === 0) {
                puntosMaquina += puntosJugada;
                puntosAddBot += puntosJugada;

                if (empate == true) {
                    ganaBot += 2;
                    empate = false;
                } else {
                    ganaBot += 1;
                }

            } else if (numJugada % 2 !== 0) {
                puntosJugador += puntosJugada;
                puntosAddUser += puntosJugada;

                if (empate == true) {
                    ganaBot += 2;
                    empate = false;
                } else {
                    ganaBot += 1;
                }
            }
            puntosJugada = 1;
        }
    }
}

/**
 * Verifica si algun jugador gano mas de dos veces en la mano
 * si hay algun jugador que cumpla la primer condicion se le agregaran los respectivos puntos al jugador
 * @returns {Boolean}
 */
function verificarPartida() {
    if (ganaBot >= 2 || ganaUser >= 2) { //Hacer una funcion para esto
        if (hayReTruco == true) { //Si hay re truco en la mano
            if (ganaBot > ganaUser) {
                puntosAddBot += 2;
            } else if (ganaBot < ganaUser) {
                puntosAddUser += 2;
            } else if (ganaBot == ganaUser) { //Si hay empate
                if (numJugada % 2 === 0) {
                    puntosAddBot += 2;
                } else if (numJugada % 2 !== 0) {
                    puntosAddUser += 2;
                }
            }
        } else if (hayTruco == true) { //Si hay truco
            if (ganaBot > ganaUser) {
                puntosAddBot += 1;
            } else if (ganaBot < ganaUser) {
                puntosAddUser += 1;
            } else if (ganaBot == ganaUser) { //Si hay empate
                if (numJugada % 2 === 0) {
                    puntosAddBot += 2;
                } else if (numJugada % 2 !== 0) {
                    puntosAddUser += 2;
                }
            }
        }

        /*Se actualizan los puntos totales de los jugadores*/
        document.getElementById('puntosBot').innerHTML = puntosAddBot;
        document.getElementById('puntosUser').innerHTML = puntosAddUser;
        finMano();
        return true;
    } else {
        return false;
    }
}

/**
 * Elimina la carta del array seleccionado
 * @param {Object} carta
 * @param {Array} mano 
 * @param {String} difMano 
 */
function eliminarCarta(carta, mano, difMano) {
    for (var i = 0; i < mano.length; i++) {
        if (carta.valor == mano[i].valor && carta.palo == mano[i].palo) { //Si el numero de la carta y el palo son iguales a los valores de la mano entonces se borra la carta
            if (difMano == 'user') {
                cartasUser.splice(i, 1);
            } else if (difMano == 'bot') {
                cartasBot.splice(i, 1);
            }
        }
    }
}

/**
 * Verifica si algun jugador supero el limite de puntos
 * @returns {Boolean}
 */
function verificarPuntos() {
    if (puntosAddUser >= 20) {
        document.getElementById('resultadoLetras').innerHTML = 'GANASTE';
        document.getElementById('resultadoFinal').innerHTML = puntosAddUser + '  ' + puntosAddBot;
        abrir(document.getElementById('modal2')); //Muestra el modal con el resultado
        puntosAddBot = 0;
        puntosAddUser = 0;
        cargar_puntos(true, false); //Carga datos de la partida
        cargarApuesta(apuesta); //Carga la apuesta
        return true;
    } else if (puntosAddBot >= 20) {
        document.getElementById('resultadoLetras').innerHTML = 'Perdiste.';
        document.getElementById('resultadoFinal').innerHTML = puntosAddUser + '  ' + puntosAddBot;
        abrir(document.getElementById('modal2')); //Muestra el modal con el resultado
        puntosAddBot = 0;
        puntosAddUser = 0;
        cargar_puntos(false, true); //Carga datos de la partida
        cargarApuesta(-apuesta); //Carga la apuesta
        return true;
    }
}

/**
 * Indica quien gano la partida y lo carga en un modal
 */
function respuestaJugada() {
    if (ganaBot > ganaUser) {
        document.getElementById('resultadoJugada').innerHTML = 'Perdiste ' + puntosJugador + '  ' + puntosMaquina;
    } else if (ganaBot < ganaUser) {
        document.getElementById('resultadoJugada').innerHTML = 'Ganaste ' + puntosJugador + '  ' + puntosMaquina;
    }
}

/**
 * Finaliza la mano
 */
function finMano() {
    var imagenes = document.getElementsByTagName('img');

    for (var i = 0; i < imagenes.length; i++) {
        imagenes[i].onclick = false;
    }
    setTimeout(function () {
        noMostrar(); //Cierra la notificacion de la maquina
        respuestaJugada(); //Indica quien gano la partida
        abrir(document.getElementById('modal1')); //Muestra el modal
        /*Se coloca los valores de las variables para volver a jugar la mano */
        jugadas = 0;
        puntosJugada = 1;
        puntosJugador = 0;
        puntosMaquina = 0;
        ganaBot = 0;
        ganaUser = 0;
        hayTruco = false;
        hayReTruco = false;
        firstCard = false;
    }, 2000);
}

/**
 * Finaliza la partida
 */
function finPartida() {
    /*Se coloca los valores de las variables para volver a jugar la partida */
    jugadas = 0;
    puntosJugada = 1;
    puntosJugador = 0;
    puntosMaquina = 0;
    ganaBot = 0;
    ganaUser = 0;
    hayTruco = false;
    hayReTruco = false;
    firstCard = false;
    puntosAddUser = 0;
    puntosAddBot = 0;
    numJugada = 0;
    obtenerMonedas();
    abrir(document.getElementById('modal3')); //Abre modal para apostar
    cerrar(document.getElementById('modal1'));
    jugadaMano(); //Volver a llamar a esta funcion para jugar de nuevo
}