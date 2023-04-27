let lang = 'ru';
let shift = false;

const ruKeys = [['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'], ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/', 'Del'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'], ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Up', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Left', 'Down', 'Right', 'Ctrl']];

const ruKeysShift = [['`', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'], ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 'Del'],
  ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'], ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Up', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Left', 'Down', 'Right', 'Ctrl']];

const enKeys = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'], ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'], ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Up', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Left', 'Down', 'Right', 'Ctrl']];

const enKeysShift = [['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'], ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'], ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Up', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Left', 'Down', 'Right', 'Ctrl']];

function createHeader() {
  const header = document.createElement('header');
  header.classList.add('header');
  document.body.appendChild(header);
  const title = document.createElement('h1');
  title.classList.add('title');
  title.innerText = 'RSS Virtual Keyboard';
  header.appendChild(title);
}
function createFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = '<p>Клавиатура создана в операционной системе Windows</p> <p>Для переключения языка комбинация: левыe ctrl + alt</p>';
  footer.classList.add('footer');
  document.body.appendChild(footer);
}
function createTextArea() {
  const textArea = document.createElement('textarea');
  textArea.classList.add('textarea');
  document.body.appendChild(textArea);
}

function createButton(role) {
  const button = document.createElement('div');
  button.classList.add('key');
  button.id = `key-${role}`;
  button.innerHTML = `<span>${role}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false">`;
  return button;
}

function createRow(arr) {
  const row = document.createElement('div');
  row.classList.add('keyboard-row');
  arr.forEach((element) => {
    const button = createButton(element);
    row.appendChild(button);
  });
  return row;
}

function createKeyboard(lang, shift) {
  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard-wrapper');
  document.body.appendChild(keyboardWrapper);
  if (lang === 'ru' && shift === false) {
    const keyboard = document.createElement('div');
    ruKeys.forEach((element) => {
      const row = createRow(element);
      keyboard.appendChild(row);
    });
    keyboardWrapper.appendChild(keyboard);
  }
  if (lang === 'ru' && shift === true) {
    const keyboard = document.createElement('div');
    ruKeysShift.forEach((element) => {
      const row = createRow(element);
      keyboard.appendChild(row);
    });
    keyboardWrapper.appendChild(keyboard);
  }
  if (lang === 'en' && shift === false) {
    const keyboard = document.createElement('div');
    enKeys.forEach((element) => {
      const row = createRow(element);
      keyboard.appendChild(row);
    });
    keyboardWrapper.appendChild(keyboard);
  }
  if (lang === 'en' && shift === true) {
    const keyboard = document.createElement('div');
    enKeysShift.forEach((element) => {
      const row = createRow(element);
      keyboard.appendChild(row);
    });
    keyboardWrapper.appendChild(keyboard);
  }
  return keyboardWrapper;
}

function keyDown(key, input = '', modifyer = null) {
  for (const decoration of key.getElementsByClassName('twinkle')) {
    decoration.classList.add('dotwinkle');
  }
}

function keyUp(key, modifyer = null) {
  for (const decoration of key.getElementsByClassName('twinkle')) {
    decoration.classList.remove('dotwinkle');
  }
}

window.addEventListener('load', () => {
  createHeader();
  createTextArea();
  createKeyboard(lang, shift);
  createFooter();

  for (let elementKey of document.getElementsByClassName('key')) {
    elementKey.addEventListener('mousedown', () => {
      keyDown(elementKey);
    });
    const mouseUpListener = () => {
      keyUp(elementKey);
    };
    elementKey.addEventListener('mouseup', mouseUpListener)
    elementKey.addEventListener('mouseleave', mouseUpListener)
  }
});
