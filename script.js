const letters = document.querySelectorAll(".letter");
const brand = document.querySelector(".brand");
const description = document.querySelector(".description");
const loading = document.querySelector(".loading");
let isLoading = false;
const ANSWER_LENGTH = 5;
const GUESSES = 6;
const WORD_URL = "https://words.dev-apis.com/word-of-the-day";

const isLetter = (letter) => {
  return /^[a-zA-Z]$/.test(letter);
}

const setLoading = (isLoading) => {
  if (isLoading) {
    loading.classList.remove("hidden");
    brand.classList.add("hidden");
    description.classList.add("hidden");
  } else if (!isLoading) {
    loading.classList.add("hidden");
    brand.classList.remove("hidden");
    description.classList.remove("hidden");
  }
}

async function init() {
  let currentRow = 0;
  let currentGuess = "";
  let done = false;

  const response = await fetch(WORD_URL);
  const processedResponse = await response.json();
  const word = processedResponse.word.toUpperCase();
  setLoading(false);

  const addLetter = (letter) => {
    if (currentGuess.length === ANSWER_LENGTH){
      // replace the last letter of currentGuess with letter
      currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
    } else if (currentGuess.length < ANSWER_LENGTH){
      currentGuess += letter;
    }

    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText = letter;
  }

  async function submitGuess() {
    if (currentGuess.length != ANSWER_LENGTH) {
      // add invalid to all buttons
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
