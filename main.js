// Resetovanje poena, sabiranje poena, vreme igre

var players = JSON.parse(localStorage.getItem('playersLocalStorage')) || [];
var playersName = document.getElementById("playersName")
var player;

var words = JSON.parse(localStorage.getItem('wordsLocalStorage')) || [];
var word ;
var dashedWord = [];
var guessingWord = document.getElementById("guessWord");
var guessedWordsArray = [];
var wrongLettersArray = [];

var scores = JSON.parse(localStorage.getItem("scoresLocalStorage")) || [];
var gameplay = {
    "name": "",
    "info": []
}; 

var messages = {
	    win: 'You win!',
	    lose: 'Game over!',
	    wrongLetter: 'Please try another letter...',
	    unvalidValue: 'Please enter a letter from A-Z'
    };

var lives = 5;
var gameTime = {
    gameStarted: "",
    gameEnded: ""
};

var wordTime = {
    wordStarted: "",
    wordEnded: ""
    };

var timeL;
var wordL;
var pointsL;

var wordInfo = {
    letters: "",
    word: "",
    points: "",
    time: "",
};


    //If player is new, add new player and start a game
    function addPlayer() {
        document.getElementById("messages").innerHTML = "";
        if (playersName.value == "") {
            document.getElementById("messages").innerHTML += "You must enter a name!"
        } else if (players.indexOf(playersName.value) === -1) {
            players.push(playersName.value);
            localStorage.setItem('playersLocalStorage', JSON.stringify(players));
        }
        player = playersName.value;
        document.getElementById("player").innerHTML += player;
        playersName.value = "";
        document.getElementById("playersName").disabled = true
    }

    //Add player or choose if player is in local storage
    function findPlayer() {
        document.getElementById("choosePlayerList").innerHTML = "";
        for ( var i = 0; i < players.length; i++) {
            if (players[i].indexOf(playersName.value) >= 0) {
                var newOption = document.createElement("option");
                newOption.value = players[i];
                document.getElementById("choosePlayerList").appendChild(newOption);
                choosePlayer();
            }
        }
    }

    //Function for choosing player
    function choosePlayer() {
        if (players.indexOf(playersName.value) >= 0) {
            player = playersName.value;
            document.getElementById("player").innerHTML += player;
            playersName.value = "";
            document.getElementById("playersName").disabled = true;
        }
    }

    //Insert new word for guessing
	function insertNewWord() {
        if (words.indexOf(document.getElementById("newWordInput").value) == -1) {
            words.push(document.getElementById("newWordInput").value);
	        localStorage.setItem('wordsLocalStorage', JSON.stringify(words));
        }
        document.getElementById("newWordInput").value = "";
	    findWord();
	}

    //Search for word
	function findWord() {
	    document.getElementById("chooseWordList").innerHTML = "";
	    for ( var i = 0; i < words.length; i++) {
	        if (words[i].indexOf(document.getElementById("chooseWordInput").value) >= 0) {
	            var newOption = document.createElement("option");
	            newOption.value = words[i];
	            document.getElementById("chooseWordList").appendChild(newOption);
	        }
	    }
	}

    //Play choosen word
	function playChoosenWord() {
        if (words.indexOf(document.getElementById("chooseWordInput").value) > -1) {
            word = document.getElementById("chooseWordInput").value;
        }
	    document.getElementById("chooseWordInput").value = " ";
	    wordInDashes();
        start ();
        wordTime.wordStarted = new Date ();
        gameTime.gameStarted = new Date ();
	}

    //Show word in dashes
	function wordInDashes() {
        dashedWord = [];
	    for (var i = 0; i < word.length; i++) {
	        dashedWord[i] = "_";
	        guessingWord.textContent = dashedWord;
	    }
	    guessingWord.textContent = dashedWord.join(' ');
	    guessLetter();
	}

    //Guess is letter in the word
	function guessLetter() {
        var vowels = ["a","e","i","o","u"];
        var pointsVowels = 0;
        var pointsConsonants = 0;
        var pointsWrongGuesses = 0;
        var pointsTotal = 0;

	    //If enter is pressed, letter is submitted (add event listener)
	    document.getElementById("guessLetter").addEventListener("keypress", function (e) {
	        if(e.keyCode == 13) {
	            var letter = document.getElementById("guessLetter").value;
	            document.getElementById("messages").textContent = "";
	            if (letter === "") {
	                document.getElementById("messages").innerHTML = messages.unvalidValue;
	            } else {
	                var match = false;
	                for ( var i = 0; i < word.length; i ++) {
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

	                    //If player guees word
	                    if (word == dashedWord.join("")) {
	                        stop();
	                        numOfLetters()
	                        guessedWordsArray.push(word);
                            randomWord();
                            continueGame();
	                    }
	                }
	                //If letter is not match
	                if (!match) {

	                    //Add points for wrong letter
	                    pointsWrongGuesses += -0.25;
	                    document.getElementById("points").innerHTML = pointsTotal + pointsWrongGuesses;
	                    document.getElementById("messages").innerHTML  = messages.wrongLetter;
	                    if (wrongLettersArray.indexOf(letter) == -1) {
	                        wrongLettersArray.push(letter);
	                        document.getElementById("wrongLetters").textContent += letter;
	                        document.getElementById("wrongLetters").textContent = wrongLettersArray.join(',');
	                        lives--;
	                        if (lives >= 0) {
	                            document.getElementById("livesLeft").innerHTML = 'You have ' + lives + ' lives remaining.';
	                        }
	                        if (lives <= 0) {
	                            document.getElementById("messages").innerHTML = player + "! " + messages.lose;
                                document.getElementById("newWordInput").disabled = true;
                                document.getElementById("chooseWordInput").disabled = true;
	                            stop();
                                wordTime.wordEnded = new Date ();
                                gameTime.gameEnded = new Date ();
                                storeGameplay();
	                        }
	                    }
	                }
	            pointsTotal = pointsConsonants + pointsVowels + pointsWrongGuesses;
	            }
	        }
	    guessingWord.innerHTML = dashedWord.join(" ");
	    document.getElementById("guessLetter").value = "";
	    })
	}

    //Continue play after guessing the word, next word is random word
    function continueGame() {
        wordTime.wordStarted = new Date ();
        gameTime.gameStarted = new Date ();
        document.getElementById("points").innerHTML = "";//------Ne resetuje vrednost na 0
        //Reset time
        document.getElementById("seconds").innerHTML = "";
        //Reset number of wrong letters
        wrongLetters.innerHTML = [];
        wordInDashes();
        guessLetter();
        start();
    }

    //Function to play random word
    function randomWord() {
        document.getElementById("messages").innerHTML = "";
        for (var i = 0; i < words.length; i++) {
            if (guessedWordsArray.indexOf(words[i]) == -1 ) {
                word = words[i]
            }
        }

        //If player played all words, game over
        if(words.length == guessedWordsArray.length) {

            document.getElementById("guessLetter").disabled = true;
            document.getElementById("newWordInput").disabled = true;
            document.getElementById("chooseWordInput").disabled = true;
            document.getElementById("messages").innerHTML = messages.lose;
            document.getElementById("info").style.display = "none";
            stop();
            wordTime.wordEnded = new Date ();
            gameTime.gameEnded = new Date ();
            word = "";
            storeGameplay();
        }
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

    //Calculate how much each letter appears in guessed word
    function numOfLetters() {
        var lettersArray = [];
        for (var l = 0; l < word.length; l++) {
            if (lettersArray.indexOf(word[l]) == -1) {
                lettersArray.push(word[l]);
            }
        }
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
        document.getElementById("guessedWordInfo").innerHTML += wordInfo.letters;
        }
        var showPoints = document.getElementById("points").textContent
        wordInfo.time =  "Time: " + document.getElementById("seconds").textContent + "<br/>";
        wordInfo.points = "Points: " + showPoints + "<br/>";
        document.getElementById("guessedWordInfo").innerHTML += wordInfo.word;
        document.getElementById("guessedWordInfo").innerHTML += wordInfo.time;
        document.getElementById("guessedWordInfo").innerHTML += wordInfo.points;
        storeResults();
    }

    //On Play again button, start all over game
	function playAgain() {
	    //Reset values
        document.getElementById("guessLetter").disabled = false;
        document.getElementById("playersName").disabled = false;
        document.getElementById("newWordInput").disabled = false;
        document.getElementById("chooseWordInput").disabled = false;
	    document.getElementById("seconds").innerHTML = "";
	    document.getElementById("points").innerHTML = "";//-------Ne resetuje vrednost na 0
	    document.getElementById("guessedWordInfo").innerHTML = " ";
	    document.getElementById("wrongLetters").innerHTML = [];
	    guessedWordsArray = [];
	    document.getElementById("messages").textContent = null;
	    lives = 5;
	    document.getElementById("livesLeft").innerHTML = 'You have ' + lives + ' lives remaining!';
        playChoosenWord();
        randomWord();
        wordInDashes();
	    start();
	    guessLetter();
	}

    //Function for storing results for each guessing word in one gameplay
    function storeResults () {
        gameplay.name = player;
        timeL = document.getElementById("seconds").textContent;
        wordL= word;
        pointsL = document.getElementById("points").textContent;
        console.log(wordTime.wordEnded)
        gameplay.info.push({'time' : timeL, 'points' : pointsL, 'word' : wordL, 'wordStarted' : wordTime.wordStarted, 'wordEnded' : wordTime.wordEnded, 'gameStarted' : gameTime.timeStarted, 'gameEnded' : gameTime.timeEnded});
    }

    //Store gameplay in local storage
    function storeGameplay () {
        scores.push(gameplay);
        localStorage.setItem('scoresLocalStorage', JSON.stringify(scores));
        gameplay = "";
    }

    //Function for showing players scores on button click
    function showScores() {
        var searchName = document.getElementById("playersName").value; 
        var gameplaysNum = 0;
        for (var i = 0; i < scores.length; i ++) {
            if (scores[i].name === searchName) {
                gameplaysNum++;
               for (var j in scores[i].info) {
                    console.log(scores[i].info);
                    console.log("Number of games: " + gameplaysNum)
                     document.getElementById("previousScore").textContent += " Game No: " + gameplaysNum + " Word: " + scores[i].info[j].word + " Time: " + scores[i].info[j].time + " Points: " + scores[i].info[j].points + " Word started: "+ wordTime.wordStarted + " Word ended: " + wordTime.wordEnded; 
                }
               
            }  
            //document.getElementById("previousScore").textContent += "<br/>" + " Game started: " + scores[i].info[j].gameStarted + " Game ended: " + scores[i].info[j].gameEnded; 
        } 
    }
