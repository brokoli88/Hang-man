/*
// !!!!pokazuje da je letter == word[i]>>> true samo ukoliko je id-letter, ukoliko je id-view(iako je ista prenesena vrednost tj.slovo) pokazuje false ... U oba slucaja registruje slovo kao string...

var letter = document.getElementById("letter").textContent;
var words = ["pas", "drvo", "sunce", "zgrada"];
//Pick a random word
var word = words[Math.floor(Math.random() * words.length)];
var addedWord = [];


//Replace random choosen word with "_"
for (var i = 0; i < word.length; i++) {
    addedWord[i] = "_";
    document.getElementById("demo").textContent = addedWord;
}
var remainingLetters = word.length;

//Show letter that is typed in input field in square below
function showLetter() {
    var inputLetter = document.getElementById("letter").value;
    document.getElementById("view").innerHTML = inputLetter;
    //guess(letter);
};
    
    //Show correct letter instead of _
function guess(letter) {
    Treba da uradi loop kroz rec i da pronadje slovo koje je isto kao ukucano
    for (j = 0; 0 < word.length; j++) {
        if (letter === word[j]) {
        console.log("jeeej");
        word[j] = letter;
        } 
     }
};

//On Play again button, start all over game (empty fields and new random word)
function playAgain() {
    document.getElementById("letter").value = null;
    showLetter();
}

Novoooooooo

/*  
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var words = ["pas", "drvo", "sunce", "zgrada"];
var messages = {
            win: 'You win!',
            lose: 'Game over!',
            guessed: ' Already guessed, please try again...',
            validLetter: 'Please enter a letter from A-Z'
        };
var lives = 5;

//Choosing random current word from words
var word = words[Math.floor(Math.random() * words.length)];
var addedWord = [];

//Output messages 
var output = document.getElementById("output");
output.innerHTML = '';

var guess = document.getElementById("letter").textContent;
//guess.value = '';

//Message to show how many lives do you have
var message = document.getElementById("message");
message.innerHTML = 'You have ' + lives + ' lives remaining';
        
 
//Display letters of current word in div
var letters = document.getElementById("letters");
letters.innerHTML = addedWord;

//Replace random word with "_"
for (var i = 0; i < word.length; i++) {
    addedWord[i] = "_";
    letters.textContent = addedWord;
};
letters.textContent = addedWord.join(' ');

//Check if guessInput is equal to letter in the word
 function guessLetter() {
	// If blank input is submitted
	if (guess === null) {
		alert("Enter a letter please!");
		output.innerHTML = messages.validLetter;
	} else {
		//Check if player typed letter or unvalid value(number etc)
	for ( var i = 0; i < alphabet.length; i ++) {
		if (alphabet[i] === guess) {
			for (var j = 0; j < word.length; j++) {
			if (word.charAt[j] === guess) {
				word[j] = guess;
				remainingLetters --;
				}
			}
		}
	}	
	}
	//Makes blank input  after finishing function
	//guess.value = '';
	//output.innerHTML = " ";
};
var remainingLetters = word.length;	


//Display message if player wins
function gameOver(win) {
    if(win) {
        output.innerHTML = messages.win;
    } else {
        output.innerHTML = messages.loose;
    }
    guessInput.value = '';
}

//On Play again button, start all over game (empty fields and new random word)
function playAgain() {
    document.getElementById("letter").value = null;
	guessLetter();
};
 
*/ 

var words = ["pas", "drvo"];
var messages = {
            win: 'You win!',
            lose: 'Game over!',
            guessed: 'Please try another letter...',
            validLetter: 'Please enter a letter from A-Z'
        };
var lives = 5;

//Choosing random current word from words
var word = words[Math.floor(Math.random() * words.length)];


//Output messages 
var output = document.getElementById("output");
//Used letters message
var usedLetters = document.getElementById("usedLetters");
var usedLetters = [];

var guess = document.getElementById("letter").value;

//Message to show how many lives do you have
var message = document.getElementById("message");
message.innerHTML = 'You have ' + lives + ' lives remaining';
        
 
//Display letters of current word in div
var letters = document.getElementById("letters");
letters.innerHTML = addedWord;

//Replace random word with "_"
var addedWord = [];
for (var i = 0; i < word.length; i++) {
    addedWord[i] = "_";
    letters.textContent = addedWord;
};
letters.textContent = addedWord.join(' ');
 var remainingLetters = word.length;

//Check if guess is equal to letter in the word
 function guessLetter() {
	 guess = document.getElementById("letter").value;
	 //output.innerHTML = "";
	// If blank input is submitted
	if (guess == "") {
		alert("Enter a letter please!");
		output.innerHTML = messages.validLetter;
		} else {
		//Loop all letters in word and find same letter
			for ( var i = 0; i < word.length; i ++)  {
				   if (word[i] === guess) {
			console.log("Great, you guessed a letter!");
					   //Loop added word to change _ to letter
			for (var j = 0; j < addedWord.length; j++) {
			if (addedWord[j] === guess) {
				guess = addedWord[i];
				addedWord.join(" ")
				remainingLetters--;
				
				//If letter is not in the word
				} else if (word[i] !== guess) {
			output.innerHTML = messages.guessed;
					usedLetters.innerHTML = guess;
			console.log ("Try another letter");	
					}			 		
				}
			}			
		} 
	}
	  // Update the puzzle
      letters.innerHTML = addedWord.join(" ");

	 
	 //Makes blank input  after finishing the function
	guess.value = "";
	 
 };

//Display message if player wins
function gameOver(remainingLetters) {
    if(remainingLetters === 0) {
        output.innerHTML = messages.win;
    } else {
        output.innerHTML = messages.loose;
    }
    guessInput.value = '';
}

//On Play again button, start all over game (empty fields and new random word)
function playAgain() {
    document.getElementById("letter").value = null;
	guessLetter();
};
    


    



////novaaaaaaaaa
var words = ["pas", "drvo"];
var messages = {
            win: 'You win!',
            lose: 'Game over!',
            guessed: 'Please try another letter...',
            validLetter: 'Please enter a letter from A-Z'
        };

//Choosing random current word from words
var word = words[Math.floor(Math.random() * words.length)];


//Output messages 
var output = document.getElementById("output").textContent;


//Used letters message
var usedLetters = document.getElementById("usedLetters").value;
usedLetters = [];

var guess = document.getElementById("letter").value;

//Message to show how many lives do you have
var lives = 5;
var message = document.getElementById("message");
message.innerHTML = 'You have ' + lives + ' lives remaining';
        
 
//Display letters of current word in div
var letters = document.getElementById("letters");
letters.innerHTML = addedWord;
//Remaining word
var remainingLetters = word.length;

//Replace random word with "_"
var addedWord = [];
for (var i = 0; i < word.length; i++) {
    addedWord[i] = "_";
    letters.textContent = addedWord;
};
letters.textContent = addedWord.join(' ');
var remainingLetters = word.length;
 
//Check if guess is equal to letter in the word
 function guessLetter() {
	 guess = document.getElementById("letter").value;
	// If blank input is submitted
	if (guess === "") {
        //output.innerHTML += messages.validLetter;
        console.log(output);
        
        
		} else {
		//Loop all letters in word and find same letter
            var match = false;
			for ( var i = 0; i < word.length; i ++)  {
                //If guess is correct, change it from _ to guess
				   if (word[i] == guess) {
                     addedWord[i] = guess;
                       match = true;
                       break;
				}  	
			}	
            if (!match){
                    output.innerHTML += messages.guessed;
                    document.getElementById("usedLetters").textContent += guess;
			         lives--;
                    //Function which prevent repeating wrong guesses letter in array
                dontRepeat();
	               function dontRepeat() {
                       //Create array of duplicates
                       var duplicates = [];
                        
                       // Find if there is a duplicate or not
                        if (data.indexOf(element, index + 1) > -1) {
                            // Find if the element is already in the result array or not
      if (result.indexOf(element) === -1) {
        result.push(element);

                       
                       usedLetters ;
                        for ( i = 0; i < usedLetters.length; i++) {
                            if (usedLe[i] > 1 || usedLetters.indexOf(usedLetters[i]) !== 1 ) {
                duplicates.push(usedLetters[i]);  
                                console.log(duplicates);
                }
        }
                       console.log(duplicates);
    }
                
                    
                } 

		} 
     letters.innerHTML = addedWord.join(" ");
      //Makes blank input  after finishing the function
	document.getElementById("letter").value = "";
	document.getElementById("output").textContent = "";
 };

// == -1 && usedLetters.indexOf(usedLetters[i], i+1)
	  
      

	 
	 //Makes blank input  after finishing the function
	guess.value = ""; 
	 
 /*
            } */

/*
//Display message if player wins
function gameOver(remainingLetters) {
    if(remainingLetters === 0) {
        output.innerHTML = messages.win;
    } else {
        output.innerHTML = messages.loose;
    }
    guessInput.value = '';
}

//On Play again button, start all over game (empty fields and new random word)
function playAgain() {
    document.getElementById("letter").value = " ";
	guessLetter();
}; */







        
    
    
