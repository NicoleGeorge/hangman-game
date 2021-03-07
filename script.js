const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

// define words
const words = ['application', 'programming', 'development', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// SHOW HIDDEN WORD
function displayWord() {
  wordEl.innerHTML = `
${selectedWord
  .split('')
  .map(
    (letter) => `
    <span class="letter">
    ${correctLetters.includes(letter) ? letter : ''}
    </span>`
  )
  .join('')}
`;

  const innerWord = wordEl.innerText.replace(/\n/g, '');
  //   console.log(wordEl.innerText, innerWord);

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'YAY, You Won!!!';
    popup.style.display = 'flex';
  }
}

// UPDATE WRONG LETTER ELEMENT
function updateWrongLettersEl() {
  //   console.log('Update wrong letter');
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  //   CHECK IF THE PLAYER HAS LOST - WHEN ALL PARTS ARE DISPLAYED
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Bah-bohwn....you lose!';
    popup.style.display = 'flex';
  } else {
  }
}

// SHOW NOTIFICATION FUNCTION
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// KEY DOWN LETTER PRESS EVENT LISTENER

window.addEventListener('keydown', (e) => {
  // validation to only register letters
  // using keycodes to differentiate
  //   console.log(e.keyCode);
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    // console.log(123);
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        // update word element
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

displayWord();
