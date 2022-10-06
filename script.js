const letters = document.querySelectorAll(".letter");
const info = document.querySelector(".info");
const brand = document.querySelector(".brand");
const description = document.querySelector(".description");
const loading = document.querySelector(".loading");
const done = document.querySelector(".done");
const tryAgain = document.querySelector(".try-again");
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

const countLetters = (array) => {
  const lettersObj = {};
  for (let i = 0; i < array.length; i++){
    const letter = array[i];
    if (lettersObj[letter]){
      lettersObj[letter]++;
    } else {
      lettersObj[letter] = 1;
    }
  }
  return lettersObj;
}

async function init() {
  let currentRow = 0;
  let currentGuess = "";
  let isDone = false;
  let isLoading = true;

  const response = await fetch(WORD_URL);
  const processedResponse = await response.json();
  const word = processedResponse.word.toUpperCase();
  isLoading = false;
  setLoading(isLoading);

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
      // TODO add invalid to all buttons
      return;
    }

    // win or continue
    if (currentGuess === word){
      for (let i = 0; i < ANSWER_LENGTH; i++){
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
      }
      isDone = true;
      done.classList.remove("hidden");
      info.classList.add("hidden");
      return;
    }

    // validate 5-letter word


    // compare to word of the day and add appropriate CSS class for correct/close/wrong
    const guessLetters = currentGuess.split("");
    const wordLetters = word.split("");
    const letterCount = countLetters(wordLetters);

    for (let i = 0; i < ANSWER_LENGTH; i++){
      // mark as correct
      if (guessLetters[i] === wordLetters[i]){
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
        letterCount[guessLetters[i]]--;
      }
    }

    for (let i = 0; i < ANSWER_LENGTH; i++){
      if (guessLetters[i] === wordLetters[i]){
        // do nothing
      } else if (wordLetters.includes(guessLetters[i]) && letterCount[guessLetters[i]] > 0){
        letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
        letterCount[guessLetters[i]]--;
      } else {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
      }
    }

    currentRow ++;
    currentGuess = "";

    if (currentRow === GUESSES){
      isDone = true;
      tryAgain.classList.remove("hidden");
      info.classList.add("hidden");
    }
  }

  const backspace = () => {
    currentGuess = currentGuess.slice(0, -1);
    letters[currentRow * ANSWER_LENGTH + currentGuess.length].innerText = "";
  }

  document.addEventListener("keydown", function(event) {
    if (isDone || isLoading){
      return;
    }
    const keyPressed = event.key.toUpperCase();
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
