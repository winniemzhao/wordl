const letters = document.querySelectorAll(".letter");
const loading = document.querySelector(".loading");
const ANSWER_LENGTH = 5;
const GUESSES = 6;

const isLetter = (letter) => {
  return /^[a-zA-Z]$/.test(letter);
}

async function init() {
  let currentRow = 0;
  let currentGuess = "";
  let done = false;
  let isLoading = true;

  const addLetter = (letter) => {
    if (currentGuess.length === ANSWER_LENGTH){
      // replace the last letter of currentGuess with letter
      currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
    } else if (currentGuess.length < ANSWER_LENGTH){
      // add letter letter to currentGuess
      currentGuess += letter;
    }

    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
  }

  async function submitGuess() {
    if (currentGuess.length != ANSWER_LENGTH) {
      return;
    }

    // validate 5-letter word
    // compare to word of the day
    // add appropriate CSS class
    // win or continue guessing

    currentRow ++;
    currentGuess = "";

  }

  const backspace = () => {
    currentGuess = currentGuess.slice(0, -1);
    letters[currentGuess.length].innerText = "";
  }

  document.addEventListener("keydown", function(event) {
    const keyPressed = event.key.toUpperCase();
    console.log(keyPressed);
    if (keyPressed === "ENTER"){
      submitGuess();
    } else if (keyPressed === "BACKSPACE"){
      backspace();
    } else if (isLetter(keyPressed)){
      addLetter(keyPressed);
    }
  });
}

init();
