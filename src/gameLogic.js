import { GRID_COL_SIZE } from "./constants";
import {
  addKeyboardButtonClass,
  buildGameGrid,
  buildKeyboardRow,
  changeSelectedLetter,
  resetBoard,
  setCellClass,
  setLetter
} from "./gameRender";
import { bindKeyboard } from "./keyboardInput";
import { wordList } from "./wordList";

let gameState = {};

function initGameState() {
  gameState = {
    currentLetterIndex: 0,
    currentAttempt: 0,
    currentWord: "",
    wordList,
    secret: "",
    nonSecretLetters: ""
  };
  gameState.secret = wordList[Math.floor(Math.random() * wordList.length)];
  console.log("secret: ", gameState.secret);
}

function onLetterClick(pressedLetter) {
  const { currentLetterIndex, currentAttempt, nonSecretLetters } = gameState;
  if (currentLetterIndex >= GRID_COL_SIZE) return;
  if (nonSecretLetters.includes(pressedLetter)) return;
  const nextSelectedLetter = Math.min(GRID_COL_SIZE, currentLetterIndex + 1);
  setLetter(currentLetterIndex, currentAttempt, pressedLetter);
  if (nextSelectedLetter < GRID_COL_SIZE) {
    changeSelectedLetter(
      currentLetterIndex,
      nextSelectedLetter,
      currentAttempt
    );
  }
  gameState.currentWord += pressedLetter;
  gameState.currentLetterIndex = nextSelectedLetter;
}

function onEnterClick() {
  const { currentWord, wordList, secret, currentAttempt } = gameState;

  if (currentWord.length < GRID_COL_SIZE) {
    window.alert("Not enough letters");
    return;
  }
  if (!wordList.includes(currentWord)) {
    window.alert("Word is not in the list!");
    return;
  }
  if (currentWord.toLowerCase() === secret) {
    window.alert("You won!");
    restart();
    return;
  }
  if (currentAttempt >= GRID_COL_SIZE) {
    window.alert("You lost");
    restart();
    return;
  }

  currentWord
    .toLowerCase()
    .split("")
    .forEach((letter, i) => {
      setCellClass(
        i,
        currentAttempt,
        secret.includes(letter) ? "correct" : "incorrect"
      );
      addKeyboardButtonClass(
        letter,
        secret.includes(letter) ? "correct" : "incorrect"
      );

      if (!secret.includes(letter)) {
        gameState.nonSecretLetters += letter;
      }
    });

  gameState.currentWord = "";
  gameState.currentLetterIndex = 0;
  gameState.currentAttempt++;
}

function onDeleteClick() {
  const { currentLetterIndex, currentAttempt } = gameState;
  if (currentLetterIndex < 0) return;
  const nextSelectedLetter = Math.max(0, currentLetterIndex - 1);
  setLetter(nextSelectedLetter, currentAttempt, "");
  changeSelectedLetter(currentLetterIndex, nextSelectedLetter, currentAttempt);
  gameState.currentWord = gameState.currentWord.slice(0, -1);
  gameState.currentLetterIndex = nextSelectedLetter;
}

export function init() {
  buildKeyboardRow(
    "qwertyuiop",
    false,
    onEnterClick,
    onLetterClick,
    onDeleteClick
  );
  buildKeyboardRow(
    "asdfghjkl",
    false,
    onEnterClick,
    onLetterClick,
    onDeleteClick
  );
  buildKeyboardRow("zxcvbnm", true, onEnterClick, onLetterClick, onDeleteClick);
  bindKeyboard(onLetterClick, onEnterClick, onDeleteClick);
  buildGameGrid();
  initGameState();
}

function restart() {
  initGameState();
  resetBoard();
}
