export function bindKeyboard(onKeyPress, onEnter, onDelete) {
  window.addEventListener("keydown", (event) => {
    if (event.code === "Backspace") onDelete();
    if (event.code === "Enter") onEnter();
    if (event.code.startsWith("Key"))
      onKeyPress(event.code.slice(-1).toLowerCase());
  });
}
