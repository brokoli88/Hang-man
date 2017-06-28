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
/*function guess(letter) {
    Treba da uradi loop kroz rec i da pronadje slovo koje je isto kao ukucano
    for (j = 0; 0 < word.length; j++) {
        if (letter === word[j]) {
        console.log("jeeej");
        word[j] = letter;
        } 
     }
};*/

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
        
    
    
