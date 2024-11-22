let turno = 0;
const tablero = [];
let score1 = 0;
let score2 = 0;

const btnPulsado = (e, pos) => {
    turno++;
    const btn = e.target;
    const color = turno % 2 ? 'salmon' : 'paleGreen';
    btn.style.backgroundColor = color;
    btn.disabled = true; // Deshabilita el botón después de pulsarlo
    tablero[pos] = color;
    if (haGanado()) {
        setTimeout(() => {
            const ganador = color === 'salmon' ? 'Jugador 1' : 'Jugador 2';
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

const actualizarPuntaje = (color) => {
    if (color === 'salmon') {
        score1++;
        document.getElementById('score1').textContent = score1;
    } else {
        score2++;
        document.getElementById('score2').textContent = score2;
    }
};

const reiniciarJuego = () => {
    turno = 0;
    tablero.length = 0; // Vacía el tablero
    document.querySelectorAll('.tablero button').forEach(button => {
        button.style.backgroundColor = '';
        button.disabled = false;
    });
};

const reiniciarMarcador = () => {
    score1 = 0;
    score2 = 0;
    document.getElementById('score1').textContent = score1;
    document.getElementById('score2').textContent = score2;
    reiniciarJuego();
};

document.querySelectorAll('.tablero button').forEach((obj, i) =>
    obj.addEventListener('click', (e) => btnPulsado(e, i))
);

document.querySelector('.reset').addEventListener('click', reiniciarMarcador);