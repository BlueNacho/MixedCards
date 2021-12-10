/***********************************************************************************************************************
 * Variables globales */

var cartaUser = []; //Array que guarda la imagen y el valor de la carta del usuario
var cartaBot = []; //Array que guarda la imagen y el valor de la carta del Crupier
var mazo; //Variable que guarda el id del mazo
var apuesta = 0; //Variable que guarda el monto de la apuesta del usuario
/************************************************************************************************************************/

/**
 * Carga la apuesta del usuario
 * @param {int} valorApuesta 
 */
function apuestas(valorApuesta) {
    apuesta = valorApuesta;
}

/***********************************************************************************************************************
 * Extrae el codigo del mazo */

async function traerMazo() {
    const data = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`, //Llamada al servidor de la API
        {
            method: `GET`, //Utilizamos el metodo GET para obtener los datos de la llamada
        });
    const datos = await data.json(); //Le asignamos a la variable los datos de la llamada al servidor
    mazo = datos.deck_id; //Le asignamos a la variable un id del mazo
}

/************************************************************************************************************************/



/*********************************************************************************************************************** */
/**
 * Obtiene datos de las cartas
 * @param {int} numero 
 * @returns cardData
 */
async function extraerCartas(numero) {
    const data = await fetch("https://deckofcardsapi.com/api/deck/" + mazo + "/draw/?count=" + numero, //Llamada al servidor de la API con el id del mazo y el numero de cartas que queremos obtener
    {
        method: `GET`, //Utilizamos el metodo GET para obtener los datos de la llamada
    });
    const datosCarta = await data.json(); //Le asignamos a la variable los datos de la llamada al servidor
    const cardData = await datosCarta.cards; //Le asignamos a la variable los datos de la o las cartas
    return cardData;
}

/************************************************************************************************************************/



/************************************************************************************************************************/
/**
 * Asigna valores a las cartas en numeros 
 * Si el valor de la carta esta entre el 2 y el 9 el valor final se mantiene 
 * Si el valor de la carta es 10, 'KING', 'JACK' o 'QUEEN' el valor final es 10 
 * Si el valor de la carta es 'ACE' el valor final es 11 (este valor puede ser mpodificado)
 * @param {int} valorApi 
 * @returns {int}
 */

function valorCarta(valorApi) {
    var valueCarta = 0;
    switch (valorApi) {
        case '2':
            valueCarta = 2;
            break;
        case '3':
            valueCarta = 3;
            break;
        case '4':
            valueCarta = 4;
            break;
        case '5':
            valueCarta = 5;
            break;
        case '6':
            valueCarta = 6;
            break;
        case '7':
            valueCarta = 7;
            break;
        case '8':
            valueCarta = 8;
            break;
        case '9':
            valueCarta = 9;
            break;
        case 'KING':
        case 'JACK':
        case 'QUEEN':
        case '10':
            valueCarta = 10;
            break;
        case 'ACE':
            valueCarta = 11;
            break;
    }
    return valueCarta; //Devuelve el valor final de la carta
}

/************************************************************************************************************************/



/***********************************************************************************************************************
 * Define las cartas iniciales, tanto de la maquina como del jugador */

async function cartasIniciales() {
    await traerMazo(); //Llamada a la funcion para obtener un mazo

    await pedircarta('Usuario'); //Llamada a la funcion para asignarle al usuario 1 carta
    await pedircarta('Bot'); //Llamada a la funcion para asignarle al Crupier 1 carta
    await pedircarta('Usuario'); //Llamada a la funcion para asignarle al usuario 1 carta

    var imagen = document.createElement("img");
    imagen.src = './img/carta1.png';
    imagen.id = 1;
    setTimeout(function(){document.getElementById("cartabot").appendChild(imagen);}, 1000) //Luego de 1000 milisegundos se muestra el lado de atras de la carta
}

/************************************************************************************************************************/



/************************************************************************************************************************/
/**
 * Muestra las cartas del bot o del usuario en el sitio web. 
 * 'imagenLink' es la ruta de la imagen a mostrar 
 * 'lugar' es para indicar donde se muestra la imagen (en el lugar del bot o en el lugar del usuario)
 * @param {string} imagenLink 
 * @param {String} lugar 
 */
async function verCarta(imagenLink, lugar) {
    var lugarBot = document.getElementById("cartabot");
    var lugarUser = document.getElementById("cartauser");
    var imagen = document.createElement("img");

    imagen.src = imagenLink; //Se le asigna la ruta de la imagen a la variable

    if (lugar == 'Usuario') { //Si el lugar es igual a 'Usuario' se inserta la imagen en el lugar del usuario
        lugarUser.appendChild(imagen);
    }
    if (lugar == 'Bot') { //Si el lugar es igual a 'Bot' se inserta la imagen en el lugar del Crupier
        lugarBot.appendChild(imagen);
    }
}

/************************************************************************************************************************/



/************************************************************************************************************************/
/**
 * Dependiendo el identificador agrega cartas al usuario o al bot
 * @param {string} identificador 
 */
async function pedircarta(identificador) {

    var cantCartas;
    var cartaValor;

    await extraerCartas('1').then(dato => { //Llamada a la funcion para obtener los datos de la carta
        cartaValor = dato; //Le asignamos a la variable los datos de la llamada a la funcion
    });
    var carta = {
        imagenCarta: cartaValor[0].image,
        valorCarta: valorCarta(cartaValor[0].value) }; //Se crea un objeto con la imagen y el valor de la carta

    if (identificador == 'Usuario') { //Si identificador es igual a 'Usuarios' se le agrega una carta al usuario y muestra en el sitio la carta agregada
        cartaUser.push(carta);
        await verCarta(carta.imagenCarta, 'Usuario');

        cantCartas = valorTotalCartas(cartaUser);
        document.getElementById('puntosValor').innerHTML = cantCartas;

        if (cantCartas > 21) { //Si el resultado de la suma de las cartas es mayor a 21 se para el juego
            plantarse();
        }
    }

    if (identificador == 'Bot') { //Si identificador es igual a 'Bot' se le agrega una carta al bot y muestra en el sitio la carta agregada
        cartaBot.push(carta);
        await verCarta(carta.imagenCarta, 'Bot');
        
        cantCartas = valorTotalCartas(cartaBot);
        document.getElementById('puntosBot').innerHTML = cantCartas;
    }

}

/************************************************************************************************************************/



/************************************************************************************************************************/
/**
 * Devuelve la suma de todas las cartas
 * @param {array} arrayCartas 
 * @returns {int}
 */
function valorTotalCartas(arrayCartas) {
    
    var valorArray = 0;
    var contador = 0;

    for (var i = 0; i < arrayCartas.length; i++) {
        if (arrayCartas[i].valorCarta == 11) { //Si el valor de la carta es igual a 11 se suma 1 al contador
            contador = contador + 1;
        } else { //Si el valor de la carta es distinto de 11 se suma al valor total el valor de la carta
            valorArray = valorArray + arrayCartas[i].valorCarta;
        }
    }
    for (var i = 0; i < contador; i++) { //Reiterara las veces que aparezca un "ACE" en el array de las cartas
            if (valorArray > 10) {  //Si el valor total de las cartas es mayor a 10 se le suma 1 y si es mayor o igual se le suma 11
                valorArray = valorArray + 1;
            } else {
                valorArray = valorArray + 11;
            }
    }
    return valorArray;
}

/************************************************************************************************************************/



/***********************************************************************************************************************
 * Asigna cartas al bot y verifica quien es el ganador */

async function plantarse() {
    document.getElementById("cartabot").removeChild(document.getElementById('1'));
    do { //Pide cartas para el bot siempre que el valor total de las cartas del usuario sea menor o igual a 21 y mayor al total de cartas del bot
        await pedircarta('Bot');
    } while (valorTotalCartas(cartaUser) > valorTotalCartas(cartaBot) && valorTotalCartas(cartaUser) <= 21);
    comprobarGanador(); //Verifica el ganador
}

/************************************************************************************************************************/



/***********************************************************************************************************************
 * Verifica el ganador para luego mostrarlo en un modal */

function comprobarGanador() {
    valorTotalUser = valorTotalCartas(cartaUser);
    valorTotalBot = valorTotalCartas(cartaBot);
    var modal3 = document.getElementById("modal3");

    if (valorTotalBot == valorTotalUser) { //Si el valor total de las cartas del bot es igual a las del usuario aparece un mensaje 
        document.getElementById("resultadoJugada").innerHTML = "Empate🤝, los valores son iguales";
        cargar_puntos(true, true);
        cargarApuesta(0);
    } else {
        if (valorTotalBot <= 21 && valorTotalUser <= 21) { 
            if (valorTotalBot < valorTotalUser) { //Si el valor total de las cartas del bot es menor a las del usuario aparece un mensaje 
                document.getElementById("resultadoJugada").innerHTML = "Ganaste 🎉, el Crupier tiene menos valor";
                cargar_puntos(true, false);
                cargarApuesta(apuesta);
            } else {
                if (valorTotalBot > valorTotalUser) { //Si el valor total de las cartas del bot es mayor a las del usuario aparece un mensaje 
                    document.getElementById("resultadoJugada").innerHTML = "Perdiste 😔";
                    cargar_puntos(false, true);
                    cargarApuesta(-apuesta);
                }
            }
        } else {
            if (valorTotalUser > 21) { //Si el valor total de las cartas del usuario es mayor a 21 aparece un mensaje 
                document.getElementById("resultadoJugada").innerHTML = "Perdiste 😔 te pasaste";
                cargar_puntos(false, true);
                cargarApuesta(-apuesta);
            } else {
                if (valorTotalBot > 21) { //Si el valor total de las cartas del bot es mayor a 21 aparece un mensaje 
                    document.getElementById("resultadoJugada").innerHTML = "Ganaste 🎉, el Crupier se paso";
                    cargar_puntos(true, false);
                    cargarApuesta(apuesta);
                }
            }
        }
    }
    modal3.style.display = "block"; //Muestra el mensaje de las comparaciones
}

/************************************************************************************************************************/



/***********************************************************************************************************************
 * Vuelve a iniciar el juego, eliminando los valores y las imagenes de las cartas */

function volverAJugar() {
    cartaUser.splice(0,cartaUser.length);
    cartaBot.splice(0,cartaBot.length);
    document.getElementById('puntosBot').innerHTML = '';
    document.getElementById('puntosValor').innerHTML = '';
    document.getElementById("cartabot").innerHTML = '';
    document.getElementById("cartauser").innerHTML = '';
    modal3.style.display = "none";
    cartasIniciales();
}