let shift = false;
let capsMode = false;
let ctrlMode = false;
const altMode = false;

const ruKeys = [['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'], ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/', 'Del'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'], ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Up', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Left', 'Down', 'Right', 'Ctrl']];
const ruKeysShift = [['`', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'], ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 'Del'],
  ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'], ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', 'Up', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Left', 'Down', 'Right', 'Ctrl']];
const enKeys = [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'], ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'], ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Up', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Left', 'Down', 'Right', 'Ctrl']];
const enKeysShift = [['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'], ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'], ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', 'Up', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Left', 'Down', 'Right', 'Ctrl']];
const keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF',
  'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp',
  'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];

class Wrapper {
  static setLang(lang) {
    localStorage.setItem('lang', lang);
  }

  static getLang() {
    const lang = localStorage.getItem('lang');
    if (lang == null) {
      return 'en';
    }
    return lang;
  }
}

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
  button.classList.add(`key-${role}`);
  if (capsMode === true) {
    button.innerHTML = `<span>${role.toUpperCase()}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false" ondragdrop="return false" ondragstart="return false">`;
  }
  button.innerHTML = `<span>${role}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false" ondragdrop="return false" ondragstart="return false">`;
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
function updateKeyboard(lang, shift) {
  let i = 0;
  Array.from(document.getElementsByClassName('key')).forEach((keyelement) => {
    if (capsMode === true) {
      if (lang === 'ru') {
        if (shift === false) {
          const keyboardset = ruKeys.flat();
          keyelement.innerHTML = `<span>${keyboardset[i].toUpperCase()}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false" ondragdrop="return false" ondragstart="return false">`;
          i += 1;
        }
        if (shift === true) {
          const keyboardset = ruKeysShift.flat();
          keyelement.innerHTML = `<span>${keyboardset[i].toUpperCase()}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false" ondragdrop="return false" ondragstart="return false">`;
          i += 1;
        }
      }
      if (lang === 'en') {
        if (shift === false) {
          const keyboardset = enKeys.flat();
          keyelement.innerHTML = `<span>${keyboardset[i].toUpperCase()}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false" ondragdrop="return false" ondragstart="return false">`;
          i += 1;
        }
        if (shift === true) {
          const keyboardset = enKeysShift.flat();
          keyelement.innerHTML = `<span>${keyboardset[i].toUpperCase()}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false" ondragdrop="return false" ondragstart="return false">`;
          i += 1;
        }
      }
    } else if (capsMode === false) {
      if (lang === 'ru') {
        if (shift === false) {
          const keyboardset = ruKeys.flat();
          keyelement.innerHTML = `<span>${keyboardset[i]}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false" ondragdrop="return false" ondragstart="return false">`;
          i += 1;
        }
        if (shift === true) {
          const keyboardset = ruKeysShift.flat();
          keyelement.innerHTML = `<span>${keyboardset[i]}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false" ondragdrop="return false" ondragstart="return false">`;
          i += 1;
        }
      }
      if (lang === 'en') {
        if (shift === false) {
          const keyboardset = enKeys.flat();
          keyelement.innerHTML = `<span>${keyboardset[i]}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false" ondragdrop="return false" ondragstart="return false">`;
          i += 1;
        }
        if (shift === true) {
          const keyboardset = enKeysShift.flat();
          keyelement.innerHTML = `<span>${keyboardset[i]}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false" ondragdrop="return false" ondragstart="return false">`;
          i += 1;
        }
      }
    }
  });
}

function changeLang() {
  if (Wrapper.getLang() === 'ru') {
    Wrapper.setLang('en');
  } else {
    Wrapper.setLang('ru');
  }
  updateKeyboard(Wrapper.getLang(), shift);
}

function keyDown(key) {
  Array.from(key.getElementsByClassName('twinkle')).forEach((decoration) => {
    decoration.classList.add('dotwinkle');
  });
}
function keyUp(key) {
  Array.from(key.getElementsByClassName('twinkle')).forEach((decoration) => {
    decoration.classList.remove('dotwinkle');
  });
}

function editTextarea(sign) {
  const text = document.getElementsByClassName('textarea')[0].value;
  const indexStart = document.getElementsByClassName('textarea')[0].selectionStart;
  const indexEnd = document.getElementsByClassName('textarea')[0].selectionEnd;
  if (indexStart === indexEnd) {
    const a = text.slice(0, indexStart) + sign + text.slice(indexStart);
    document.getElementsByClassName('textarea')[0].value = a;
    document.getElementsByClassName('textarea')[0].selectionEnd = indexStart + 1;
  } else {
    const a = text.slice(0, indexStart) + sign + text.slice(indexEnd);
    document.getElementsByClassName('textarea')[0].value = a;
    document.getElementsByClassName('textarea')[0].selectionEnd = indexStart + 1;
  }
}

window.addEventListener('load', () => {
  createHeader();
  createTextArea();
  createKeyboard(Wrapper.getLang(), shift);
  createFooter();

  document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'shift') {
      shift = true;
      if (event.code === 'ShiftLeft') {
        document.getElementsByClassName('key-Shift')[0].classList.add('pressed');
      }
      if (event.code === 'ShiftRight') {
        document.getElementsByClassName('key-Shift')[1].classList.add('pressed');
      }
    }
    updateKeyboard(Wrapper.getLang(), shift);
  });
  document.addEventListener('keyup', (event) => {
    if (event.key.toLowerCase() === 'shift') {
      shift = false;
      if (event.code === 'ShiftLeft') {
        document.getElementsByClassName('key-Shift')[0].classList.remove('pressed');
      }
      if (event.code === 'ShiftRight') {
        document.getElementsByClassName('key-Shift')[1].classList.remove('pressed');
      }
    }
    updateKeyboard(Wrapper.getLang(), shift);
  });

  document.getElementsByClassName('textarea')[0].focus();
  document.getElementsByClassName('textarea')[0].addEventListener('focusout', (event) => {
    event.target.focus();
  });

  Array.from(document.getElementsByClassName('key')).forEach((elementKey) => {
    elementKey.addEventListener('mousedown', () => {
      keyDown(elementKey);
    });
    const mouseUpListener = () => {
      keyUp(elementKey);
    };
    elementKey.addEventListener('mouseup', mouseUpListener);
    elementKey.addEventListener('mouseleave', mouseUpListener);
  });

  // // /* снизу - мб сделать просто альтки тру и цтрлки тру, плюс ивент локейшн лефт? */
  // document.addEventListener('keydown', (event) => {
  //   if (event.ctrlKey === true && event.code === 'AltLeft' && event.location === 1) {
  //     changeLang();
  //   }
  // });
  // document.addEventListener('keydown', (event) => {
  //   if (event.altKey === true && event.code === 'ControlLeft' && event.location === 1) {
  //     changeLang();
  //   }
  // });

  /* смена языка */
  Array.from(document.getElementsByClassName('key-Ctrl')).forEach((keyelement) => {
    if (Array.from(document.getElementsByClassName('key-Ctrl')).indexOf(keyelement) === 0) {
      keyelement.addEventListener('mousedown', () => {
        if (ctrlMode === false) {
          ctrlMode = true;
          keyelement.classList.add('pressed');
        } else {
          ctrlMode = false;
          keyelement.classList.remove('pressed');
        }
      });
    }
    if (Array.from(document.getElementsByClassName('key-Ctrl')).indexOf(keyelement) === 1) {
      keyelement.addEventListener('mousedown', () => {
        keyelement.classList.add('pressed');
      });
      keyelement.addEventListener('mouseup', () => {
        keyelement.classList.remove('pressed');
      });
    }
  });

  Array.from(document.getElementsByClassName('key-Alt')).forEach((keyelement) => {
    if (Array.from(document.getElementsByClassName('key-Alt')).indexOf(keyelement) === 0) {
      keyelement.addEventListener('mousedown', () => {
        if (ctrlMode === true) {
          changeLang();
          ctrlMode = false;
          Array.from(document.getElementsByClassName('key-Ctrl'))[0].classList.remove('pressed');
        }
      });
    }
  });

  Array.from(document.getElementsByClassName('key')).forEach((keyelement) => {
    keyelement.addEventListener('click', () => {
      const sign = keyelement.getElementsByTagName('span')[0].innerText;

      if (sign.length === 1 && capsMode === false) {
        // document.getElementsByClassName('textarea')[0].value += sign;
        editTextarea(sign);
      } else if (sign.length === 1 && capsMode === true) {
        document.getElementsByClassName('textarea')[0].value += sign.toUpperCase();
      }
      if (sign.toLowerCase() === 'space') {
        document.getElementsByClassName('textarea')[0].value += ' ';
      }
      if (sign.toLowerCase() === 'capslock') {
        switch (true) {
          case capsMode === false:
            keyelement.classList.add('enabled');
            capsMode = true;
            updateKeyboard(Wrapper.getLang(), shift);
            break;
          case capsMode === true:
            keyelement.classList.remove('enabled');
            capsMode = false;
            updateKeyboard(Wrapper.getLang(), shift);
            break;
          default:
            break;
        }
      }
      if (sign.toLowerCase() === 'up') {
        document.getElementsByClassName('textarea')[0].value += '↑';
      }
      if (sign.toLowerCase() === 'down') {
        document.getElementsByClassName('textarea')[0].value += '↓';
      }
      if (sign.toLowerCase() === 'left') {
        document.getElementsByClassName('textarea')[0].value += '←';
      }
      if (sign.toLowerCase() === 'right') {
        document.getElementsByClassName('textarea')[0].value += '→';
      }
      if (sign.toLowerCase() === 'tab') {
        document.getElementsByClassName('textarea')[0].value += '\t';
      }
      if (sign.toLowerCase() === 'enter') {
        document.getElementsByClassName('textarea')[0].value += '\n';
      }
      /* сделать шифту превент дефолт и просто подсвечивать внопку и менять клавиатуру,
      а когда кнопка отпущена - снимать режим шифт и убирать эктив у кнопки */
    });
  });

  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    const keyboardset = Array.from(document.getElementsByClassName('key'));
    const index = keyCodes.indexOf(event.code);
    keyboardset[index].classList.add('pressed');
    keyboardset[index].getElementsByClassName('twinkle')[0].classList.add('dotwinkle');
    keyboardset[index].click();
  });
  document.addEventListener('keyup', (event) => {
    event.preventDefault();
    const keyboardset = Array.from(document.getElementsByClassName('key'));
    const index = keyCodes.indexOf(event.code);
    keyboardset[index].classList.remove('pressed');
    keyboardset[index].getElementsByClassName('twinkle')[0].classList.remove('dotwinkle');
  });
});
