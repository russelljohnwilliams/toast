var stringArray;
var duplicateArray = [];
var lives = 11

window.onload = function(){

  document.getElementById("startPlay").onclick = function startPlay() {
 
    setUpTheGame()
  }

  document.getElementById("textInput").addEventListener("keyup", pressEnter);


  document.getElementById("getText")
  .onclick = function getText(){
    makeAGuess()
  }

  document.getElementById("guessInput").addEventListener("keyup", hitReturn);
}

function hitReturn() {
  if (event.keyCode == 13){
   makeAGuess()
 }

}function pressEnter() {
  if (event.keyCode == 13){
   setUpTheGame()
 }
}

function makeAGuess(){
  var input = document.getElementById('guessInput').value
  checkInput(input)
}

function setUpTheGame() {
   console.log("thiiiis")
   document.getElementById('startArea').classList.add("hide");
   document.getElementById('gameArea').classList.remove("hide");
  stringArray = document.getElementById("textInput").value.split('');
  duplicateArray = stringArray.slice(0)
  for (i = 0; i < stringArray.length; i++) {
    if (stringArray[i] != ' ') {
      duplicateArray[i] = "_"
    }
  }
  document.getElementById('output').innerHTML = duplicateArray.join('')
}

function checkInput(input) {
  for (i = 0; i < stringArray.length; i++) {
    if (input == stringArray[i]) {
      duplicateArray[i] = input
      document.getElementById('output').innerHTML = duplicateArray.join('');
    }
  }
  checkDuplicateArray(input)
  checkIfWon()
  document.getElementById('guessInput').value = ''
}

function checkDuplicateArray(input) {
  if (-1 != duplicateArray.indexOf(input)) {
    var text = "Well done, that is correct"
  } else {
    var text = "Sorry, you lose a life, try again"
    loseALife()
  }
  displayText(text)
}

function displayText(text) {
  document.getElementById('message').innerHTML = text
}

function loseALife() {
  lives -= 1
  document.getElementById('livesLeft').innerHTML = "you have " + lives + " lives left"
  checkLives(lives)
  displayHangman(lives)
}

function checkLives(lives) {
  if (lives == 0) {
    gameOver()
  }
}

function displayHangman(lives){
  var life = ("lives" + lives).toString()
  console.log("life", life) 
  var thing = document.getElementsByClassName(life)
  for (i = 0; i < thing.length; i++) {
    thing.item(i).classList.remove("hide");
  }
}

function checkIfWon() {
  for (i = 0; i < duplicateArray.length; i++) {
    if (-1 == duplicateArray.indexOf("_")) {
      var text = "Yeah! You won!!!"
      displayText(text)
    }
  }
}

function gameOver() {
  document.getElementById('livesLeft').innerHTML = "Game Over, Loser!";
  var loserElement = document.getElementById("gameArea");
  loserElement.classList.add("hide");
}
