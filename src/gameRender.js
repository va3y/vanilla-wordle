import { GRID_COL_SIZE, GRID_ROW_SIZE } from "./constants";

const gameEl = document.querySelector("#game");
const keyboardEl = document.querySelector("#keyboard");
const DYNAMIC_KEYBOARD_CLASSES = ["correct", "incorrect", "selected"];

export function buildKeyboardRow(
  letters,
  lastRow = false,
  onEnterClick,
  onLetterClick,
  onDeleteClick
) {
  const rowEl = document.createElement("div");
  rowEl.classList.add("keyboard-row");
  keyboardEl.appendChild(rowEl);

  if (lastRow) {
    const letterEl = document.createElement("span");
    letterEl.innerText = "Enter";
    letterEl.classList.add("keyboard-letter");
    letterEl.classList.add("enter");
    rowEl.appendChild(letterEl);
    letterEl.onclick = onEnterClick.bind(null);
  }

  letters.split("").forEach((letter) => {
    const letterEl = document.createElement("span");
    letterEl.innerText = letter;
    letterEl.classList.add("keyboard-letter");
    letterEl.id = `letter-${letter}`;
    rowEl.appendChild(letterEl);
    letterEl.onclick = onLetterClick.bind(null, letter);
  });

  if (lastRow) {
    const letterEl = document.createElement("span");
    letterEl.innerText = "Del";
    letterEl.classList.add("keyboard-letter");
    letterEl.classList.add("delete");
    rowEl.appendChild(letterEl);
    letterEl.onclick = onDeleteClick.bind(null);
  }
}

export function buildGameGrid() {
  for (let i = 0; i < GRID_COL_SIZE; i++) {
    for (let j = 0; j < GRID_ROW_SIZE; j++) {
      const letterEl = document.createElement("div");
      letterEl.className = "game-letter";
      gameEl.appendChild(letterEl);
    }
  }
}

export function setLetter(currentLetter, attempt, letter) {
  gameEl.childNodes[attempt * GRID_COL_SIZE + currentLetter].innerText = letter;
}

export function setCellClass(currentLetter, attempt, className) {
  gameEl.childNodes[attempt * GRID_COL_SIZE + currentLetter].classList.add(
    className
  );
}

export function changeSelectedLetter(fromX, toX, attempt) {
  gameEl.childNodes[attempt * GRID_COL_SIZE + fromX].classList.remove(
    "selected"
  );
  gameEl.childNodes[attempt * GRID_COL_SIZE + toX].classList.add("selected");
}

export function resetBoard() {
  gameEl.childNodes.forEach((cell) => {
    DYNAMIC_KEYBOARD_CLASSES.forEach((dynamicClass) => {
      cell.classList.remove(dynamicClass);
      cell.innerText = "";
    });
  });

  keyboardEl.childNodes.forEach((row) => {
    row.childNodes.forEach((key) => {
      DYNAMIC_KEYBOARD_CLASSES.forEach((dynamicClass) => {
        key.classList.remove(dynamicClass);
      });
    });
  });
}

export function addKeyboardButtonClass(key, className) {
  document.querySelector(`#letter-${key}`).classList.add(className);
}
