var words = ["dog", "house", " secret", "job", "monkey"];
var guess = document.getElementById("letter").value;

//Output messages win, lose, guessed, validLetter
var messages = {
            win: 'You win!',
            lose: 'Game over!',
            guessed: 'Please try another letter...',
            validLetter: 'Please enter a letter from A-Z'
        };
var output = document.getElementById("output");

//Choosing random current word from words
var word = words[Math.floor(Math.random() * words.length)];

//Display letters of current random word in div above
var letters = document.getElementById("letters");

//letters.innerHTML = addedWord;
var addedWord = [];

//Function for showing random word in _
function randomWord() {
    //Reset letters 
    addedWord = [];

//Replace random word with "_"
for (var i = 0; i < word.length; i++) {
    addedWord[i] = "_";
    letters.textContent = addedWord;
};
letters.textContent = addedWord.join(' ');
};

//Wrong letters in paragraph
var usedLettersP = document.getElementById("usedLetters");
usedLetters = [];

//Message to show how many lives do you have
var lives = 5;
var message = document.getElementById("message");
message.innerHTML = 'You have ' + lives + ' lives remaining!';

//Text from insert word - input 
var newWord = document.getElementById("insertNewWord");

//When choosing word
var chooseWord = document.getElementById("choose-word");

//Remaining letters
var remainingLetters = word.length;
 
randomWord();

//Check if guess is equal to letter in the word
 function guessLetter() {
	 guess = document.getElementById("letter").value;
	 document.getElementById("output").textContent = "";
     
	// If blank input is submitted
	if (guess === "") {
        output.innerHTML = messages.validLetter;
		} else {
			
		//Loop all letters in word and find same letter
            var match = false;
			for ( var i = 0; i < word.length; i ++)  {
				
                //If guess is correct, change it from _ to guess
				   if (word[i] == guess) {
                     addedWord[i] = guess;
					   remainingLetters--;
                       match = true;
					   gameOver(remainingLetters);
				}  
			}
			//If letter is not in the word
            if (!match){
                output.innerHTML = messages.guessed;
				
				//If letter does not exist in array Used letters,  push it
				if (usedLetters.indexOf(guess) == -1) {
					usedLetters.push(guess);
					document.getElementById("usedLetters").textContent += guess;
					//Put "," between usedletters 
					document.getElementById("usedLetters").textContent = usedLetters.join(' , ');
					
				//Decrease lives on wrong guess
				lives--;
				if (lives >= 0) {
					message.innerHTML = 'You have ' + lives + ' lives remaining.';
                    
					//If lives are equal to 0
				} else {
					output.innerHTML = messages.lose;
                    gameOver(remainingLetters); 
                    if (lives < 0) {
                        lives = 0;
                    }
					}
				}	
			}
		} 
     letters.innerHTML = addedWord.join(" ");
	 
     //Makes blank input  after finishing the function
	document.getElementById("letter").value = "";
 };

//Display message if player wins
function gameOver(remainingLetters) {
    if(remainingLetters === 0) {
        output.innerHTML = messages.win;
        dontRepeatWords();
    }
};

//Function that puts guessed word in new array
function dontRepeatWords() {
        usedWordsArray = [];
        usedWordsArray.push(word);
    
        var isItTrue = true;
        if (usedWordsArray.indexOf(word) == false ) {
            words.splice(word, 1);
            console.log("Rec se nece vise pogadjati.");
 } else {
     console.log("Rec ce se dalje pogadjati.");
    }
};

//On Play again button, start all over game (empty fields and new random word)
function playAgain() {
    
    //------Used letters restarting------------ne radi
	usedLettersP.innerHTML = [];
    console.log(usedLetters);
    document.getElementById("letter").value = null;
     
    //Choosing random current word from words
    word = words[Math.floor(Math.random() * words.length)];
    randomWord();
    dontRepeatWords();
	guessLetter();
	document.getElementById("output").textContent = "";
	//Lives again starts from start
	lives = 5;
	message.innerHTML = 'You have ' + lives + ' lives remaining!';
}; 

//Function insertWord() that insert typed word in array
function insertWord() {
    words.push(newWord.value);
    console.log(words);
}

//Function witch find word that containes that letters
function findWord() {
    document.getElementById("chooseWord").innerHTML = "";
    
   //Loop thru words array
        for ( var i = 0; i < words.length; i++) {
            //If letters are part of word in words in array
            if (words[i].indexOf(chooseWord.value) >= 0) {
                //Create new option element
                var newOption = document.createElement("option");
                //Set new value (for showing the word as option)
                newOption.value = words[i];
                //Add the newOption to the datalist
                document.getElementById("chooseWord").appendChild(newOption);
                    } 
                }
};

//When you click on word, you can guess it in output
function playChosenWord() {
    
    word = chooseWord.value;
    randomWord(); 
    //Clear search input text
    chooseWord.value = " ";
    
    guessLetter();
};
                    
    
////////////////////////////////////////////////
//Kad pogodis dve reci, nece da radi playAgain; broj slova nekad ne radi

var words = ["asas", "house", "sun", "monkey", "dogggy", " secret", "job"];
var word = words[Math.floor(Math.random() * words.length)];
var newWord = document.getElementById("newWordInput");
var chooseWord = document.getElementById("chooseWordInput");

var guessingWord = document.getElementById("guessWord");

var dashedWord = [];
var letter = document.getElementById("guessLetter").value;
var remainingLetters = word.length;

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
}; 

//wordInDashes()
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

//On Play again button, play new word
function guessLetter() {
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
                remainingLetters--;
                match = true;
                if(remainingLetters === -1) {
                    outputMessages.innerHTML = messages.win;
                    
                    numOfDuplicates();
                    
                    //Remove guessed word from words
                    guessedWordsArray = [];
                    guessedWordsArray.push(word);
                    if (guessedWordsArray.indexOf(word) > -1) {
                        var deleteGuessedWord = words.indexOf(word);
                        words.splice(deleteGuessedWord, 1);
                    }
                    guessLetter();
                    playAgain();
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
                if (lives >= 0) {
                    messageLives.innerHTML = 'You have ' + lives + ' lives remaining.';
                } 
                if (lives <= 0) {
                    outputMessages.innerHTML = messages.lose;
                } 
            }   
        }
    } 
    
    guessingWord.innerHTML = dashedWord.join(" ");
    //Makes blank input for leter after submition
    document.getElementById("guessLetter").value = "";                  
};

//On Play again button, start all over game 
function playAgain() {
    wrongLetters.innerHTML = [];
    //document.getElementById("howManyLetters").textContent = "";
    document.getElementById("guessWord").value = "";
    document.getElementById("guessLetter").value = null;
    document.getElementById("messages").textContent = null;
    lives = 5;
    messageLives.innerHTML = 'You have ' + lives + ' lives remaining!';
    word = words[Math.floor(Math.random() * words.length)];
    wordInDashes();
    guessLetter();
}; 

function numOfDuplicates() {    
    var lettersArray = [];
    //Push unique letters in array
    for (var i = 0; i < word.length; i++) {
        if (lettersArray.indexOf(word[i]) == -1) {
            lettersArray.push(word[i]);
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
        document.getElementById("howManyLetters").innerHTML += lettersArray[j] + " = " + counter + " x " + "<br/>";
    }  
};
    
    
   /* word = dashedWord.join('');
    
    var newArr = {};
    for (var i = 0; i < word.length; i++) {
        if (newArr[word[i]]) {
            newArr[word[i]].push(word[i]);
        } else {
            newArr[word[i]] = [];
            newArr[word[i]].push(word[i]);
        }
        
    }
    for (var j = 0; j < newArr.length; j ++) {

        }
    
    //document.getElementById("howManyLetters").innerHTML += newArr[0]
    console.log(newArr)
    
    //console.log( word.replace(/[^searchFor]/g, "").length);
    //console.log(word.replaceAll(/[^searchFor]/g, "").length ());
*/





























     
     

    


    

