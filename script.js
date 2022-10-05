let currentLetter = "";

const letters = document.querySelectorAll(".letter")
letters.forEach((letter) => {
  letter.addEventListener("keydown", function (event) {
    console.log(event);
  })
})
