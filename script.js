let shift = false;
let capsMode = false;
let ctrlMode = false;
let altMode = false;

const ruKeys = [['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'], ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/', 'Del'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'], ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Up', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Left', 'Down', 'Right', 'Ctrl']];
const ruKeysShift = [['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'], ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\', 'Del'],
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

function findWithClassInParents(element, className) {
  switch (true) {
    case element == null:
      return null;
    case element.classList.contains(className):
      return element;
    case element.parentElement == null:
      return null;
    default:
      return findWithClassInParents(element.parentElement, className);
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
    button.innerHTML = `<span>${role.toUpperCase()}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false"  ondragstart="return false">`;
  }
  button.innerHTML = `<span>${role}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false"  ondragstart="return false">`;
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
function createKeyboard(lang, shiftMode) {
  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard-wrapper');
  document.body.appendChild(keyboardWrapper);
  if (lang === 'ru' && shiftMode === false) {
    const keyboard = document.createElement('div');
    ruKeys.forEach((element) => {
      const row = createRow(element);
      keyboard.appendChild(row);
    });
    keyboardWrapper.appendChild(keyboard);
  }
  if (lang === 'ru' && shiftMode === true) {
    const keyboard = document.createElement('div');
    ruKeysShift.forEach((element) => {
      const row = createRow(element);
      keyboard.appendChild(row);
    });
    keyboardWrapper.appendChild(keyboard);
  }
  if (lang === 'en' && shiftMode === false) {
    const keyboard = document.createElement('div');
    enKeys.forEach((element) => {
      const row = createRow(element);
      keyboard.appendChild(row);
    });
    keyboardWrapper.appendChild(keyboard);
  }
  if (lang === 'en' && shiftMode === true) {
    const keyboard = document.createElement('div');
    enKeysShift.forEach((element) => {
      const row = createRow(element);
      keyboard.appendChild(row);
    });
    keyboardWrapper.appendChild(keyboard);
  }
  return keyboardWrapper;
}
function updateKeyboard(lang) {
  let i = 0;
  Array.from(document.getElementsByClassName('key')).forEach((keyelement) => {
    const keyElement = keyelement;
    if (capsMode === true) {
      if (lang === 'ru') {
        if (shift === false) {
          const keyboardset = ruKeys.flat();
          keyElement.innerHTML = `<span>${keyboardset[i].toUpperCase()}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false" ondragstart="return false">`;
          i += 1;
        } else {
          const keyboardset = ruKeysShift.flat();
          keyElement.innerHTML = `<span>${keyboardset[i].toLowerCase()}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false" ondragstart="return false">`;
          i += 1;
        }
      }
      if (lang === 'en') {
        if (shift === false) {
          const keyboardset = enKeys.flat();
          keyElement.innerHTML = `<span>${keyboardset[i].toUpperCase()}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false"  ondragstart="return false">`;
          i += 1;
        } else {
          const keyboardset = enKeysShift.flat();
          keyElement.innerHTML = `<span>${keyboardset[i].toLowerCase()}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false"  ondragstart="return false">`;
          i += 1;
        }
      }
    } else if (capsMode === false) {
      if (lang === 'ru') {
        if (shift === false) {
          const keyboardset = ruKeys.flat();
          keyElement.innerHTML = `<span>${keyboardset[i]}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false"  ondragstart="return false">`;
          i += 1;
        } else {
          const keyboardset = ruKeysShift.flat();
          keyElement.innerHTML = `<span>${keyboardset[i]}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false"  ondragstart="return false">`;
          i += 1;
        }
      }
      if (lang === 'en') {
        if (shift === false) {
          const keyboardset = enKeys.flat();
          keyElement.innerHTML = `<span>${keyboardset[i]}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false"  ondragstart="return false">`;
          i += 1;
        } else {
          const keyboardset = enKeysShift.flat();
          keyElement.innerHTML = `<span>${keyboardset[i]}</span> <img src = "assets/key_stars.png" alt = "" class = "twinkle" ondrag="return false"  ondragstart="return false">`;
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
    document.getElementsByClassName('textarea')[0].value = text.slice(0, indexStart) + sign + text.slice(indexStart);
    document.getElementsByClassName('textarea')[0].selectionEnd = indexStart + 1;
  } else {
    document.getElementsByClassName('textarea')[0].value = text.slice(0, indexStart) + sign + text.slice(indexEnd);
    document.getElementsByClassName('textarea')[0].selectionEnd = indexStart + 1;
  }
}
function shiftOff() {
  shift = false;
  Array.from(document.getElementsByClassName('key-Shift')).forEach((element) => {
    element.classList.remove('enabled');
  });
  updateKeyboard(Wrapper.getLang(), shift);
}

window.addEventListener('load', () => {
  createHeader();
  createTextArea();
  createKeyboard(Wrapper.getLang(), shift);
  createFooter();

  document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'shift' && !shift) {
      shift = true;
      if (event.code === 'ShiftLeft') {
        document.getElementsByClassName('key-Shift')[0].classList.add('enabled');
      }
      if (event.code === 'ShiftRight') {
        document.getElementsByClassName('key-Shift')[1].classList.add('enabled');
      }
      updateKeyboard(Wrapper.getLang(), shift);
    }
  });
  document.addEventListener('keyup', (event) => {
    if (event.key.toLowerCase() === 'shift') {
      let pressedShift = document.getElementsByClassName('key-Shift').item(0);
      let oppositeShift = document.getElementsByClassName('key-Shift').item(1);
      if (event.code === 'ShiftRight') {
        pressedShift = document.getElementsByClassName('key-Shift').item(1);
        oppositeShift = document.getElementsByClassName('key-Shift').item(0);
      }
      if (findWithClassInParents(pressedShift, 'moused') != null) {
        event.stopImmediatePropagation();
        return;
      }
      if (!oppositeShift.classList.contains('enabled') || !event.shiftKey) {
        shiftOff();
      }
    }
  });
  document.addEventListener('mousedown', (event) => {
    const keyElement = findWithClassInParents(event.target, 'key');
    if (keyElement != null) {
      keyElement.classList.add('moused');
      if (keyElement.classList.contains('key-Shift')) {
        shift = true;
        keyElement.classList.add('enabled');
        updateKeyboard(Wrapper.getLang(), shift);
      }
    }
  });
  document.addEventListener('mouseup', (event) => {
    const keyElement = findWithClassInParents(event.target, 'key');
    if (keyElement != null) {
      keyElement.classList.remove('moused');
      if (keyElement.classList.contains('key-Shift')) {
        shiftOff();
      }
    }
  });

  document.getElementsByClassName('textarea')[0].focus();
  document.getElementsByClassName('textarea')[0].addEventListener('focusout', (event) => {
    event.target.focus();
  });

  Array.from(document.getElementsByClassName('key')).forEach((elementKey) => {
    const isShift = elementKey.classList.contains('key-Shift');
    if (!isShift) {
      elementKey.addEventListener('mousedown', () => {
        keyDown(elementKey);
      });
      const mouseUpListener = () => {
        keyUp(elementKey);
      };
      elementKey.addEventListener('mouseup', mouseUpListener);
      elementKey.addEventListener('mouseleave', mouseUpListener);
    }
  });

  Array.from(document.getElementsByClassName('key-Ctrl')).forEach((keyelement) => {
    if (Array.from(document.getElementsByClassName('key-Ctrl')).indexOf(keyelement) === 0) {
      keyelement.addEventListener('mousedown', () => {
        if (ctrlMode === false && altMode === false) {
          ctrlMode = true;
          keyelement.classList.add('pressed');
        } else if (ctrlMode === false && altMode === true) {
          ctrlMode = false;
          altMode = false;
          changeLang(Wrapper.getLang(), shift);
          keyelement.classList.remove('pressed');
          Array.from(document.getElementsByClassName('key-Alt'))[0].classList.remove('pressed');
        } else if (ctrlMode === true && altMode === false) {
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
          altMode = false;
          Array.from(document.getElementsByClassName('key-Ctrl'))[0].classList.remove('pressed');
          keyelement.classList.remove('pressed');
        } else if (ctrlMode === false && altMode === false) {
          altMode = true;
          keyelement.classList.add('pressed');
        } else if (ctrlMode === false && altMode === true) {
          altMode = false;
          keyelement.classList.remove('pressed');
        }
      });
    }
    if (Array.from(document.getElementsByClassName('key-Alt')).indexOf(keyelement) === 1) {
      keyelement.addEventListener('mousedown', () => {
        keyelement.classList.add('pressed');
      });
      keyelement.addEventListener('mouseup', () => {
        keyelement.classList.remove('pressed');
      });
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey === true && event.code === 'AltLeft' && event.location === 1) {
      changeLang();
    } else if (event.code === 'AltLeft' && ctrlMode === true) {
      ctrlMode = false;
      document.getElementsByClassName('key-Ctrl')[0].classList.remove('pressed');
      changeLang();
    } else if (event.code === 'AltLeft' && ctrlMode === false && altMode === false) {
      document.getElementsByClassName('key-Alt')[0].classList.add('pressed');
      altMode = true;
    } else if (event.code === 'AltLeft' && ctrlMode === false && altMode === true) {
      document.getElementsByClassName('key-Alt')[0].classList.remove('pressed');
      altMode = false;
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.altKey === true && event.code === 'ControlLeft' && event.location === 1) {
      changeLang();
    } else if (event.code === 'ControlLeft' && event.location === 1 && altMode === true) {
      altMode = false;
      document.getElementsByClassName('key-Alt')[0].classList.remove('pressed');
      changeLang();
    } else if (event.code === 'ControlLeft' && altMode === false && ctrlMode === false) {
      document.getElementsByClassName('key-Ctrl')[0].classList.add('pressed');
      ctrlMode = true;
    } else if (event.code === 'ControlLeft' && altMode === false && ctrlMode === true) {
      document.getElementsByClassName('key-Ctrl')[0].classList.remove('pressed');
      ctrlMode = false;
    }
  });

  Array.from(document.getElementsByClassName('key')).forEach((keyelement) => {
    keyelement.addEventListener('click', (event) => {
      const targetElement = findWithClassInParents(event.target, 'key');
      const sign = targetElement.getElementsByTagName('span')[0].innerText;
      if (targetElement.classList.contains('moused')) {
        return;
      }
      if (sign.length === 1 && capsMode === false) {
        editTextarea(sign);
      } else if (sign.length === 1 && capsMode === true && shift === false) {
        editTextarea(sign.toUpperCase());
      } else if (sign.length === 1 && capsMode === true && shift === true) {
        editTextarea(sign);
      }
      if (sign.toLowerCase() === 'space') {
        editTextarea(' ');
      }
      if (sign.toLowerCase() === 'capslock') {
        switch (true) {
          case capsMode === false:
            targetElement.classList.add('enabled');
            targetElement.classList.add('pressed');
            capsMode = true;
            updateKeyboard(Wrapper.getLang(), shift);
            break;
          case capsMode === true:
            targetElement.classList.remove('enabled');
            targetElement.classList.remove('pressed');
            capsMode = false;
            updateKeyboard(Wrapper.getLang(), shift);
            break;
          default:
            break;
        }
      }
      if (sign.toLowerCase() === 'up') {
        editTextarea('↑');
      }
      if (sign.toLowerCase() === 'down') {
        editTextarea('↓');
      }
      if (sign.toLowerCase() === 'left') {
        editTextarea('←');
      }
      if (sign.toLowerCase() === 'right') {
        editTextarea('→');
      }
      if (sign.toLowerCase() === 'tab') {
        editTextarea('\t');
      }
      if (sign.toLowerCase() === 'enter') {
        editTextarea('\n');
      }
      if (sign.toLowerCase() === 'del') {
        const text = document.getElementsByClassName('textarea')[0].value;
        const indexStart = document.getElementsByClassName('textarea')[0].selectionStart;
        const indexEnd = document.getElementsByClassName('textarea')[0].selectionEnd;
        if (indexStart === indexEnd) {
          document.getElementsByClassName('textarea')[0].value = text.slice(0, indexStart) + text.slice(indexStart + 1);
          document.getElementsByClassName('textarea')[0].selectionEnd = indexStart;
        } else {
          document.getElementsByClassName('textarea')[0].value = text.slice(0, indexStart) + text.slice(indexEnd);
          document.getElementsByClassName('textarea')[0].selectionEnd = indexStart;
        }
      }
      if (sign.toLowerCase() === 'backspace') {
        const text = document.getElementsByClassName('textarea')[0].value;
        const indexStart = document.getElementsByClassName('textarea')[0].selectionStart;
        const indexEnd = document.getElementsByClassName('textarea')[0].selectionEnd;
        if (indexStart === indexEnd) {
          document.getElementsByClassName('textarea')[0].value = text.slice(0, indexStart - 1) + text.slice(indexStart);
          document.getElementsByClassName('textarea')[0].selectionEnd = indexStart - 1;
        } else {
          document.getElementsByClassName('textarea')[0].value = text.slice(0, indexStart) + text.slice(indexEnd);
          document.getElementsByClassName('textarea')[0].selectionEnd = indexStart;
        }
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    const keyboardset = Array.from(document.getElementsByClassName('key'));
    const index = keyCodes.indexOf(event.code);
    const element = keyboardset[index];
    if (element != null) {
      element.classList.add('pressed');
      element.getElementsByClassName('twinkle')[0].classList.add('dotwinkle');
      element.click();
      if (ctrlMode === true) {
        ctrlMode = false;
      }
      if (altMode === true) {
        altMode = false;
      }
    }
  });
  document.addEventListener('keyup', (event) => {
    event.preventDefault();
    const keyboardset = Array.from(document.getElementsByClassName('key'));
    const index = keyCodes.indexOf(event.code);
    const element = keyboardset[index];
    if (findWithClassInParents(element, 'moused') != null) {
      event.stopImmediatePropagation();
      return;
    }
    if (element != null) {
      element.classList.remove('pressed');
      element.getElementsByClassName('twinkle')[0].classList.remove('dotwinkle');
    }
  });
});
