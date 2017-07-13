//Resetuje polje na pogadjanje sledece reci(continue, playAgain) ali ne restuje vrednost na 0

var words = ["asas", "house", "sun", "monkey", "dogggy", "secret", "job"];
var word = words[Math.floor(Math.random() * words.length)];
var newWord = document.getElementById("newWordInput");
var chooseWord = document.getElementById("chooseWordInput");
 
var guessingWord = document.getElementById("guessWord");

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

//Insert new word for guessing
function insertNewWord() {
    words.push(newWord.value);
    newWord.value = "";
    findWord();
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
    //If eneter is pressed, letter is submitted (add event listener)
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
                
                        //Remove guessed word from words
                        guessedWordsArray = [];
                        guessedWordsArray.push(word);
                        if (guessedWordsArray.indexOf(word) > -1) {
                            var deleteGuessedWord = words.indexOf(word);
                            words.splice(deleteGuessedWord, 1);
                        }
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
    //After choosen word, player must play random word
    word =  words[Math.floor(Math.random() * words.length)];
    remainingLetters = word.length; 
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
    //Reset values
    document.getElementById("guessLetter").disabled = false;
    document.getElementById("seconds").innerHTML = "";
    document.getElementById("points").innerHTML = "";//-------Ne resetuje vrednost na 0
    document.getElementById("guessedWordInfo").innerHTML = " ";
    wrongLetters.innerHTML = [];
    document.getElementById("guessLetter").value = null;
    document.getElementById("messages").textContent = null;
    lives = 5;
    messageLives.innerHTML = 'You have ' + lives + ' lives remaining!';
    word = words[Math.floor(Math.random() * words.length)];
    start();
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
