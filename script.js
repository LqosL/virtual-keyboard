const text = [];
let shift = false;
let capsMode = false;

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

function keyDown(key, input = '', modifyer = null) {
  Array.from(key.getElementsByClassName('twinkle')).forEach((decoration) => {
    decoration.classList.add('dotwinkle');
  });
}

function keyUp(key, modifyer = null) {
  Array.from(key.getElementsByClassName('twinkle')).forEach((decoration) => {
    decoration.classList.remove('dotwinkle');
  });
}

window.addEventListener('load', () => {
  const langWrapper = new Wrapper();
  createHeader();
  createTextArea();
  let keyboardElement = createKeyboard(Wrapper.getLang(), shift);
  createFooter();

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
  /* снизу - мб сделать просто альтки тру и цтрлки тру, плюс ивент локейшн лефт? */
  document.addEventListener('keydown', (event) => {
    console.log(event);
    if ((event.code === 'ControlLeft' && event.code.altKey === true) || (event.code === 'AltLeft' && event.code.ctrlKey === true)) {
      if (langWrapper.getLang() === 'ru') {
        langWrapper.setLang('en');
      }
      if (langWrapper.getLang() === 'en') {
        langWrapper.setLang('ru');
      }
      keyboardElement.remove();
      keyboardElement = createKeyboard(Wrapper.getLang());
    }
  });

  Array.from(document.getElementsByClassName('key')).forEach((keyelement) => {
    keyelement.addEventListener('click', () => {
      const sign = keyelement.getElementsByTagName('span')[0].innerText;
      if (sign.length === 1 && capsMode === false) {
        document.getElementsByClassName('textarea')[0].value += sign;
      } else if (sign.length === 1 && capsMode === true) {
        document.getElementsByClassName('textarea')[0].value += sign.toUpperCase();
      }
      if (sign.toLowerCase() === 'space') {
        document.getElementsByClassName('textarea')[0].value += ' ';
      }
      if (sign.toLowerCase() === 'capslock') {
        switch (true) {
          case capsMode === false:
            keyelement.classList.add('pressed');
            capsMode = true;
            console.log(capsMode);
            updateKeyboard(Wrapper.getLang(), shift);
            break;
          case capsMode === true:
            keyelement.classList.remove('pressed');
            capsMode = false;
            console.log(capsMode);
            updateKeyboard(Wrapper.getLang(), shift);
            break;
          default:
            break;
        }
      }
      /* сделать шифту превент дефолт и просто подсвечивать внопку и менять клавиатуру, а когда кнопка отпущена - снимать режим шифт и убирать эктив у кнопки */
    });
  });
});
