//Resetuje polje na pogadjanje sledece reci(continue, playAgain) ali ne restuje vrednost na 0

var words = JSON.parse(localStorage.getItem('wordsLocStorage')) || [];
var word ;


var newWord = document.getElementById("newWordInput");
var chooseWord = document.getElementById("chooseWordInput");
 
var guessingWord = document.getElementById("guessWord");
var guessedWordsArray = [];

var dashedWord = [];
var letter = document.getElementById("guessLetter").value;

var wrongLetters = document.getElementById("wrongLetters");
    wrongLettersArray = [];

var lives = 5;
var messageLives = document.getElementById("livesLeft");
    messageLives.innerHTML = 'You have ' + lives + ' lives remaining!';

//Messages in gameplay
var outputMessages = document.getElementById("messages");
var messages = {
    win: 'You win!',
    lose: 'Game over!',
    wrongLetter: 'Please try another letter...',
    unvalidValue: 'Please enter a letter from A-Z'
};

//Object about guessed word information
var shoWordInfo = document.getElementById("guessedWordInfo");
    wordInfo = {
        letters: "",
        word: "",
        points: "",
        time: "",
    };

var player = document.getElementById("playersName");
var players = JSON.parse(localStorage.getItem('playersLocalStorage')) || [];

var scorePerGame = JSON.parse(localStorage.getItem("scoresLocal")) || [];

//Insert new word for guessing
function insertNewWord() {
    words.push(newWord.value);
    //Return to local storage new inputed words
    localStorage.setItem('wordsLocStorage', JSON.stringify(words));
    newWord.value = "";
    findWord();
};
//Function to play random word
function randomWord() {
    outputMessages.innerHTML = "";
    for (var i = 0; i < words.length; i++) {
        
        console.log(word)
        if (guessedWordsArray.indexOf(words[i]) == -1 ) {
            word = words[i]
        }
    }  
    if(words.length == guessedWordsArray.length) {
        console.log("Game over!")
        console.log(words.length)
        console.log(guessedWordsArray.length)
        word = ""
        document.getElementById("guessLetter").disabled = true;//Ne radi???
        outputMessages.innerHTML = messages.lose;
        document.getElementById("info").style.display = "none";
        stop();
    }  
}; 
    
    

//Searching word
function findWord() {
    document.getElementById("chooseWordList").innerHTML = "";
   //Loop thru words array
    for ( var i = 0; i < words.length; i++) {
        //If letters are part of word in words in array
        if (words[i].indexOf(chooseWord.value) >= 0) {
            //Create new option element
            var newOption = document.createElement("option");
            //Set new value (for showing the word as option)
            newOption.value = words[i];
            //Add the newOption to the datalist
            document.getElementById("chooseWordList").appendChild(newOption);
        } 
    }
};

//Play choosen word
function playChoosenWord() {
    word = chooseWord.value;
    wordInDashes(); 
    //Clear search input text
    chooseWord.value = " ";
    start ();
    wordInDashes();
}; 

//Show word in _
function wordInDashes() {
    //Reset wrong letters 
    dashedWord = [];
    //Replace random word with "_"
    for (var i = 0; i < word.length; i++) {
        dashedWord[i] = "_";
        guessingWord.textContent = dashedWord;
    }
    guessingWord.textContent = dashedWord.join(' ');
    guessLetter();
};

//Guess is letter in the word
function guessLetter() {
    //Var for counting points
    var vowels = ["a","e","i","o","u"];
    var pointsVowels = 0;
    var pointsConsonants = 0;
    var pointsWrongGuesses = 0;
    var pointsTotal = 0;
    //If enter is pressed, letter is submitted (add event listener)
    document.getElementById("guessLetter").addEventListener("keypress", function (e) {
        if(e.keyCode == 13) {
            letter = document.getElementById("guessLetter").value;
            document.getElementById("messages").textContent = "";
            // If blank input is submitted
            if (letter === "") {
                outputMessages.innerHTML = messages.unvalidValue;
            } else { 
            //Loop all letters in word and find matching letter
                var match = false;
                for ( var i = 0; i < word.length; i ++) {
                    //If guess is correct, change it from _ to letter
                    if (word[i] == letter) {
                        dashedWord[i] = letter;
                        match = true;

                        //Add points for vowel
                        for ( j = 0; j < vowels.length; j++) {
                            if (dashedWord[i] == vowels[j]) {
                                pointsVowels += 0.5;
                                document.getElementById("points").innerHTML =  pointsTotal + pointsVowels; 
                            }  
                        }
                        //Add points for consonant
                        if (vowels.indexOf(word[i]) == -1) {
                            pointsConsonants += 1;
                            document.getElementById("points").innerHTML = pointsTotal + pointsConsonants;
                        }                         
                    }
                    //If player win
                    if (word == dashedWord.join("")) {
                        outputMessages.innerHTML = messages.win;
                        stop();
                        numOfLetters()
                        //Push guessed word from words
                        guessedWordsArray.push(word);
                        randomWord(); 
                        continueGame();    
                    }   
                }    
            
                //If letter is not in the word
                if (!match) {
                    //Add points for wrong letter
                    pointsWrongGuesses += -0.25;
                    document.getElementById("points").innerHTML = pointsTotal + pointsWrongGuesses;
                    outputMessages.innerHTML = messages.wrongLetter;
                    //If letter does not exist in array Used letters,  push it
                    if (wrongLettersArray.indexOf(letter) == -1) {
                        wrongLettersArray.push(letter);
                        wrongLetters.textContent += letter;
                        //Put "," between wrong letters 
                        wrongLetters.textContent = wrongLettersArray.join(',');
                        //Decrease lives on wrong guess
                        lives--;
                        if (lives >= 0) {
                            messageLives.innerHTML = 'You have ' + lives + ' lives remaining.';
                        } 
                        if (lives <= 0) {
                            outputMessages.innerHTML = messages.lose;
                            document.getElementById("guessLetter").disabled = true;
                            stop();
                            scorePerGame.push(wordInfo)
                            localStorage.setItem('scoresLocal', JSON.stringify(scorePerGame));
                        } 
                    }  
                } 
            pointsTotal = pointsConsonants + pointsVowels + pointsWrongGuesses;
            } 
        } 
    guessingWord.innerHTML = dashedWord.join(" ");
    //Makes blank input for leter after submition
    document.getElementById("guessLetter").value = "";   
    }) 
};

//Continue play after guessing the word
function continueGame() {
    document.getElementById("points").innerHTML = "";//------Ne resetuje vrednost na 0
    document.getElementById("guessLetter").disabled = false;
    //Reset time
    document.getElementById("seconds").innerHTML = "";
    //Reset number of wrong letters
    wrongLetters.innerHTML = [];
    wordInDashes();
    guessLetter();  
    start();
}; 

//Calculate how much each letter appears in guessed word
function numOfLetters() {
    //Show number of each letter in word
    var lettersArray = [];
    //Push unique letters in array
    for (var l = 0; l < word.length; l++) {
        if (lettersArray.indexOf(word[l]) == -1) {
            lettersArray.push(word[l]);
        }
    }
    //Loop the array and word to find matching letter
    for (var j = 0; j < lettersArray.length; j++) {
        counter = 0;
        for (var k = 0; k < word.length; k++) {
            if (lettersArray[j] == word[k]) {
                counter++;
            }   
        }
    //For showing total points and time of guessed word 
    wordInfo.word = "Word: " + word + "<br/>";   
    wordInfo.letters =  lettersArray[j] + " = " + counter + "x " + "<br/>";
    shoWordInfo.innerHTML += wordInfo.letters;
    }
    var showPoints = document.getElementById("points").textContent
    wordInfo.time =  "Time: " + document.getElementById("seconds").textContent + "<br/>";
    wordInfo.points = "Points: " + showPoints + "<br/>";
    shoWordInfo.innerHTML += wordInfo.word;
    shoWordInfo.innerHTML += wordInfo.time;
    shoWordInfo.innerHTML += wordInfo.points;  
};
    
//On Play again button, start all over game 
function playAgain() {
    words = JSON.parse(localStorage.getItem('wordsLocStorage')) || [];
    //Reset values
    document.getElementById("guessLetter").disabled = false;
    document.getElementById("seconds").innerHTML = "";
    document.getElementById("points").innerHTML = "";//-------Ne resetuje vrednost na 0
    document.getElementById("guessedWordInfo").innerHTML = " ";
    wrongLetters.innerHTML = [];
    guessedWordsArray = []
    document.getElementById("guessLetter").value = null;
    document.getElementById("messages").textContent = null;
    lives = 5;
    messageLives.innerHTML = 'You have ' + lives + ' lives remaining!';
    start();
    randomWord();
    wordInDashes();
    guessLetter();
}; 

//Set timer to start mesuring secondes from 0
function countTime() {
  document.getElementById("seconds").innerHTML = ++ value;
}
var seconds = null;
function start () {
  stop();
  value = 0;
  seconds = setInterval(countTime, 1000);  
}
var stop = function() {
  clearInterval(seconds);
};

//If player is new, add new player
function addPlayer() {
    if (players.indexOf(playersName.value) === -1) {
        players.push(playersName.value);
        localStorage.setItem('playersLocalStorage', JSON.stringify(players));
    }
    playersName.value = "";
    findPlayer();
};

//Add player or choose if player is in local storage
function findPlayer() {
    document.getElementById("choosePlayerList").innerHTML = "";
   //Loop players
    for ( var i = 0; i < players.length; i++) {
        //If letters are part of players name
        if (players[i].indexOf(playersName.value) >= 0) {
            //Create new option element
            var newOption = document.createElement("option");
            //Set new value (for showing the players name as option)
            newOption.value = players[i];
            //Add the newOption to the datalist
            document.getElementById("choosePlayerList").appendChild(newOption);
        }
    }
    choosePlayer()
};

//Function for choosing player
function choosePlayer() {
    //If enter is pressed, player is chosen
    document.getElementById("playersName").addEventListener("keypress", function (e) {
        if (e.keyCode == 13) {
            player = playersName.value;
        }
        console.log("igrate kao " + player)
    })
    //playersName.value = "";
};







