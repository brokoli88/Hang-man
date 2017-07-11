var words = ["asas", "house", "sun", "monkey", "dogggy", " secret", "job"];
var word = words[Math.floor(Math.random() * words.length)];
var newWord = document.getElementById("newWordInput");
var chooseWord = document.getElementById("chooseWordInput");

var guessingWord = document.getElementById("guessWord");

var dashedWord = [];
var letter = document.getElementById("guessLetter").value;
//var remainingLetters = word.length;

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
    //letter = document.getElementById("guessLetter").value;
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
                        if (word == dashedWord.join("")) {
                            outputMessages.innerHTML = messages.win;
                            numOfLetters()
                            //Remove guessed word from words
                            guessedWordsArray = [];
                            guessedWordsArray.push(word);
                            if (guessedWordsArray.indexOf(word) > -1) {
                                var deleteGuessedWord = words.indexOf(word);
                                words.splice(deleteGuessedWord, 1);
                            }
                            continueGame();
                            //document.getElementById("howManyetters").split("___") 

                        }
                            
                    } 
                }
            }  
            
                //If letter is not in the word
                if (!match) {
                    outputMessages.innerHTML = messages.wrongLetter;
                    //If letter does not exist in array Used letters,  push it
                    if (wrongLettersArray.indexOf(letter) == -1) {
                        wrongLettersArray.push(letter);
                        wrongLetters.textContent += letter;
                        //Put "," between wrong letters 
                        wrongLetters.textContent = wrongLettersArray.join(' , ');
                        //Decrease lives on wrong guess
                        lives--;
                        if (lives) {
                            messageLives.innerHTML = 'You have ' + lives + ' lives remaining.';
                        } 
                        if (lives == 0) {
                            outputMessages.innerHTML = messages.lose;
                        //Napravi da se vrednost slova ne racuna da ne vidi i ne dodaje u niz
                        //document.getElementById("guessLetter")
                        } 
                    }   
                }           
        }

    guessingWord.innerHTML = dashedWord.join(" ");
    //Makes blank input for leter after submition
    document.getElementById("guessLetter").value = "";   
    })
     
};

//Continue play after guessing the word
function continueGame() {

    word =  words[Math.floor(Math.random() * words.length)];
    remainingLetters = word.length; 
    wordInDashes();

    //Reset wrong letters
    wrongLettersArray = [];
    //Reset number of letters
    //document.getElementById("howManyLetters").innerHTML = "";

    guessLetter();

    
} 
   
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
        document.getElementById("howManyLetters").innerHTML += lettersArray[j] + " = " + counter + "x " + "<br/>";
    //document.getElementById("howManyLetters").innerHTML += "___"
    }  
    document.getElementById("howManyLetters").innerHTML += "____" + "<br/>"; 
    countPoints();
};
    
   
function countPoints () {
    var vowels = ["a","e","i","o","u"];
    var pointsVowels = 0;
    var pointsConsonants = 0;
    var pointsWrongGuesses = 0;
    var totalPoints = 0;
    var wrongGuesses =  wrongLetters.textContent;
    //Reset points
    document.getElementById("points").innerHTML = "";

    //Loop thru guessed letters
    for (var i = 0; i < word.length; i++) {
        for ( j = 0; j < vowels.length; j++) {
            if (word[i] == vowels[j]) {
                pointsVowels += 0.5;
                
            } 
        }

    //Push wrong letters in new array to counte them    
    for (var k = 0; k < wrongGuesses.length; k++) {
        pointsWrongGuesses += -0.25;
    }

    //Count points for wrong guesses
    //pointsWrongGuesses = wrongGuesses.length * (-0.25); 
    
    }
    console.log(pointsVowels)
    console.log(pointsWrongGuesses)
    totalPoints = pointsVowels + pointsWrongGuesses;
    document.getElementById("points").innerHTML += totalPoints;
    document.getElementById("points").innerHTML += "; ";
};


   

//On Play again button, start all over game 
function playAgain() {
    wrongLetters.innerHTML = [];
    //document.getElementById("howManyLetters").textContent = "";
    //document.getElementById("guessWord").value = "";
    document.getElementById("guessLetter").value = null;
    document.getElementById("messages").textContent = null;
    lives = 5;
    messageLives.innerHTML = 'You have ' + lives + ' lives remaining!';
    word = words[Math.floor(Math.random() * words.length)];
    wordInDashes();
    guessLetter();
}; 
