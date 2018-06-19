


var stringArray;
var duplicateArray = [];
var lives = 11

window.onload = function(){

  document.getElementById("startPlay").onclick = function startPlay() {
    document.getElementById('startArea').classList.add("hide");
    document.getElementById('gameArea').classList.remove("hide");
    setUpTheGame()
  }

  document.getElementById("getText").onclick = function getText() {
    var input = document.getElementById('field').value
    checkInput(input)
  }
}

function setUpTheGame() {

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
  document.getElementById('field').value = ''
}

function checkDuplicateArray(input) {
  if (-1 != duplicateArray.indexOf(input)) {
    var text = "Yup, that is correct"
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
  if (lives == -1) {
    gameOver()
  }
}

function displayHangman(lives){
  // for (i = 11; i > lives; i-=1) {
    var life = ("lives" + lives).toString()
    // console.log("i", i) 
    console.log("life", life) 
    var thing = document.getElementsByClassName(life)
    for (i = 0; i < thing.length; i++) {
    thing.item(i).classList.remove("hide");
    // console.log("display", thing.item(i))
    }
  // }
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
