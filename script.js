// PARTE I
const WORDS = ["perla", "envia", "melon","perro", "libro", "salir",
 "carro", "silla", "piano", "tigre","fuego", "circo", "mujer", "carta", "nubes",
"tinta", "trigo", "pinta", "sabor", "banda", "honor", "vapor", "palma", "pluma", 
"gusto", "mover", "salta", "cielo", "nieve", "canto", "sabor", "cerca", "gente", 
"toque", "juego", "coste","pagar", "temor", "sueve", "corta", "grito", "aroma",
"carne", "masas", "torre", "sello", "rueda", "corte","trama", "novia", "humor", 
"plaza", "joven", "vuelo","salto", "banco",];
const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
let revealedLetters = [];

function initBoard() {
    let board = document.getElementById("game-board");
    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div");
        row.className = "letter-row";
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div");
            box.className = "letter-box";
            row.appendChild(box);
        }
        board.appendChild(row);
    }
}
// PARTE II
function insertLetter(pressedKey) {
    if (nextLetter === 5) return;
    pressedKey = pressedKey.toLowerCase();
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    let box = row.children[nextLetter];
    box.textContent = pressedKey;
    box.classList.add("filled-box");
    currentGuess.push(pressedKey);
    nextLetter += 1;
}

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    nextLetter -= 1;
}

function checkGuess() {
    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    let guessString = '';
    let rightGuess = Array.from(rightGuessString);
    
    for (const val of currentGuess) {
        guessString += val;
    }

    if (guessString.length !== 5) {
        alert("Faltan letras!");
        return;
    }

    for (let i = 0; i < 5; i++) {
        let box = row.children[i];
        let letter = currentGuess[i];
        let letterColor = '';

        if (rightGuess[i] === letter) {
            letterColor = 'green';
        } else if (rightGuess.includes(letter)) {
            letterColor = 'yellow';
        } else {
            letterColor = 'grey';
        }

        box.style.backgroundColor = letterColor;
        if (letterColor === 'green') {
            rightGuess[i] = null; 
        }
    }

    if (guessString === rightGuessString) {
        alert("¡Acertaste! Juego terminado!");
        guessesRemaining = 0;
        return;
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            alert(`¡Se te acabaron las oportunidades! La palabra correcta era: "${rightGuessString}"`);
        }
    }
}
// PARTE III
function revealHint() {
    let remainingLetters = rightGuessString.split("").reduce((acc, letter, index) => {
        if (!revealedLetters.includes(letter) && currentGuess[index] !== letter) {
            acc.push({ letter, index });
        }
        return acc;
    }, []);

    if (remainingLetters.length === 0) {
        showMessage("¡Ya se han revelado todas las letras posibles!");
        return;
    }

    let randomIndex = Math.floor(Math.random() * remainingLetters.length);
    let { letter: letterToReveal, index } = remainingLetters[randomIndex];
    revealedLetters.push(letterToReveal);

    let row = document.getElementsByClassName("letter-row")[NUMBER_OF_GUESSES - guessesRemaining];
    let box = row.children[index];

    if (!box.textContent) {
        box.textContent = letterToReveal;
        box.style.backgroundColor = "#add8e6";
        box.classList.add("revealed");
    } else {
        showMessage("Ya se ha usado esta pista. Escribe y verifica.");
    }
}

document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0) return;

    let pressedKey = String(e.key);
    if (pressedKey === "Backspace") {
        deleteLetter();
        return;
    }

    if (pressedKey === "Enter") {
        checkGuess();
        return;
    }

    let found = pressedKey.match(/[a-z]/i);
    if (found) {
        insertLetter(pressedKey);
    }
});
document.getElementById("hint-button").addEventListener("click", revealHint);
initBoard();
