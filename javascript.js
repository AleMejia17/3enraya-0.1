let turno = 0;
let score1 = 0;
let score2 = 0;
const tablero = [];
let jugador1Nombre = '';
let jugador2Nombre = '';
let jugador1Color = '#ff0000';
let jugador2Color = '#0000ff';

const botonIniciar = document.getElementById('iniciarJuego');
const botonReiniciar = document.getElementById('reiniciarMarcador');
const configuracionDiv = document.getElementById('configuracion');
const tableroDiv = document.getElementById('tablero');
const jugadoresDiv = document.getElementById('jugadores');
const puntajesDiv = document.getElementById('puntajes');

// Mostrar nombres y colores seleccionados
const actualizarJugadores = () => {
    document.getElementById('player1').textContent = `${jugador1Nombre} `;
    document.getElementById('player2').textContent = `${jugador2Nombre} `;
    document.getElementById('player1').style.backgroundColor = jugador1Color;
    document.getElementById('player2').style.backgroundColor = jugador2Color;
};

// Crear el tablero
const crearTablero = () => {
    for (let i = 0; i < 9; i++) {
        const boton = document.createElement('button');
        boton.addEventListener('click', (e) => btnPulsado(e, i));
        tableroDiv.appendChild(boton);
    }
};

// Función para manejar el clic en los botones
const btnPulsado = (e, pos) => {
    turno++;
    const btn = e.target;
    const color = turno % 2 === 0 ? jugador1Color : jugador2Color;
    btn.style.backgroundColor = color;
    btn.disabled = true;
    tablero[pos] = color;
    if (haGanado()) {
        setTimeout(() => {
            const ganador = color === jugador1Color ? jugador1Nombre : jugador2Nombre;
            alert(`¡${ganador} ha ganado!`);
            actualizarPuntaje(color);
            reiniciarJuego();
        }, 100);
    } else if (turno === 9) {
        setTimeout(() => {
            alert('¡Es un empate!');
            reiniciarJuego();
        }, 100);
    }
};

// Comprobación de ganador
const haGanado = () => {
    const combinacionesGanadoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return combinacionesGanadoras.some(combinacion =>
        tablero[combinacion[0]] &&
        tablero[combinacion[0]] === tablero[combinacion[1]] &&
        tablero[combinacion[0]] === tablero[combinacion[2]]
    );
};

// Actualizar el puntaje
const actualizarPuntaje = (color) => {
    if (color === jugador1Color) {
        score1++;
        document.getElementById('score1').textContent = `Puntaje: ${score1}`;
    } else {
        score2++;
        document.getElementById('score2').textContent = `Puntaje: ${score2}`;
    }
};

// Reiniciar el juego
const reiniciarJuego = () => {
    turno = 0;
    tablero.length = 0;
    document.querySelectorAll('.tablero button').forEach(button => {
        button.style.backgroundColor = '';
        button.disabled = false;
    });
};

// Reiniciar marcador
const reiniciarMarcador = () => {
    score1 = 0;
    score2 = 0;
    document.getElementById('score1').textContent = `Puntaje: 0`;
    document.getElementById('score2').textContent = `Puntaje: 0`;
};

// Iniciar juego
botonIniciar.addEventListener('click', () => {
    jugador1Nombre = document.getElementById('jugador1Nombre').value || 'Jugador 1';
    jugador2Nombre = document.getElementById('jugador2Nombre').value || 'Jugador 2';
    jugador1Color = document.getElementById('jugador1Color').value;
    jugador2Color = document.getElementById('jugador2Color').value;

    configuracionDiv.style.display = 'none';
    jugadoresDiv.style.display = 'flex';
    puntajesDiv.style.display = 'flex';
    tableroDiv.style.display = 'grid';
    botonReiniciar.style.display = 'inline-block';

    actualizarJugadores();
    crearTablero();
});

// Evento para reiniciar marcador
botonReiniciar.addEventListener('click', reiniciarMarcador);
