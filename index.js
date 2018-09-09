var stringArray;
var duplicateArray = [];
var lives = 11
var filmTitle

window.onload = function(){

  document.getElementById("startPlay").onclick = function startPlay() {
    setUpTheGame()
  }

  document.getElementById("textInput").addEventListener("keyup", pressEnter);

  document.getElementById("selectRandomTitle").onclick = function selectRandomTitle() {
    getFilms()
  }

  document.getElementById("getText").onclick = function getText(){
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

function getFilms() {
  var url = "https://api.myjson.com/bins/1elm6s";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function(){
    if (request.status === 200){
      var jsonString = request.responseText;
      filmSearch = JSON.parse( jsonString );
      var randomNumber = Math.floor(Math.random()*filmSearch.movies.length)
      console.log("length", randomNumber)
      choseTitleFromArray(randomNumber, filmSearch.movies)
    };
  };
  request.send( null );
};

function choseTitleFromArray(int, movies){
  document.getElementById('startArea').classList.add("hide");
  document.getElementById('gameArea').classList.remove("hide");
  // var randomNumber = Math.floor(Math.random()*preloadedContent.length)
  filmTitle = filmSearch.movies[int].title.toLowerCase()
  stringArray = filmTitle.split('');
  duplicateArray =  stringArray.slice(0)
  console.log('log:',  stringArray)
  for (i = 0; i < stringArray.length; i++) {
   if (stringArray[i] != ' ') {
     duplicateArray[i] = "_"
   }
}
document.getElementById('output').innerHTML = duplicateArray.join('')
}

function setUpTheGame() {
 document.getElementById('startArea').classList.add("hide");
 document.getElementById('gameArea').classList.remove("hide");
 stringArray = document.getElementById("textInput").value.split('');
 duplicateArray = stringArray.slice(0)
 console.log('log:',  stringArray)
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

function displayHangman(lives){
  var life = ("lives" + lives).toString()
  var thing = document.getElementsByClassName(life)
  for (i = 0; i < thing.length; i++) {
    thing.item(i).classList.remove("hide");
  }
}

function checkLives(lives) {
  if (lives == 0) {
    gameOver()
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
  document.getElementById('livesLeft').innerHTML = "Game Over, Loser!"+"<br>"+"The answer is"+ "<br>" + "'" + filmTitle + "'";
  var loserElement = document.getElementById("gameArea");
  loserElement.classList.add("hide");
}





