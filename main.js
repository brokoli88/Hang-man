//Ne radi usedLetters restaring i prikazivanje poruke


var words = ["dog", "bird", "lemon", "rocket"];
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
letters.innerHTML = addedWord;
//Replace random word with "_"
var addedWord = [];
for (var i = 0; i < word.length; i++) {
    addedWord[i] = "_";
    letters.textContent = addedWord;
};
letters.textContent = addedWord.join(' ');

//Wrong letters in paragraph
var usedLetters = document.getElementById("usedLetters").value;
usedLetters = [];

//Message to show how many lives do you have
var lives = 5;
var message = document.getElementById("message");
message.innerHTML = 'You have ' + lives + ' lives remaining!';
   
//Remaining letters for showing messages.win
var remainingLetters = word.length;
 
//Check if guess is equal to letter in the word
 function guessLetter() {
	 guess = document.getElementById("letter").value;
	 
	// If blank input is submitted
	if (guess === "") {
		//!!!!Pokazuje u console.log  poruku ali je ne prikazuje na stranici
        output = messages.validLetter;
		console.log(output);
		console.log(messages.validLetter);
		} else {
			
		//Loop all letters in word and find same letter
            var match = false;
			for ( var i = 0; i < word.length; i ++)  {
				
                //If guess is correct, change it from _ to guess
				   if (word[i] == guess) {
                     addedWord[i] = guess;
					   remainingLetters--;
                       match = true;
					   gameOver(remainingLetters)
                       break;
				}  
			}
			//If letter is not in the word
            if (!match){
                output = messages.guessed;
				console.log(output);
				console.log(messages.guessed);
				
				//If letter does not exist in array Used letters,  push it
				if (usedLetters.indexOf(guess) == -1) {
					usedLetters.push(guess);
					document.getElementById("usedLetters").textContent += guess;
					//Put "," between usedletters 
					document.getElementById("usedLetters").textContent = usedLetters.join(' , ');
					
				//Decrease lives on wrong guess
				lives--;
				if (lives > 0) {
					message.innerHTML = 'You have ' + lives + ' lives remaining.';
					//If is equal to 0
				} else {
					message.innerHTML = messages.lose;
					output = messages.lose;
					console.log(output);
					console.log(messages.lose);
					playAgain();
					}
				}	
			}
		} 
     letters.innerHTML = addedWord.join(" ");
	 
     //Makes blank input  after finishing the function
	document.getElementById("letter").value = "";
	document.getElementById("output").textContent = "";
 };

//Display message if player wins
function gameOver(remainingLetters) {
    if(remainingLetters === 0) {
		console.log(messages.win)
        output.innerHTML = messages.win;
    } 
};

//On Play again button, start all over game (empty fields and new random word)
function playAgain() {
    document.getElementById("letter").value = null;
	guessLetter();
	
	//Lives again starts from 10 
	lives = 10;
	message.innerHTML = 'You have ' + lives + ' lives remaining!';
	
	//------Used letters restarting------------ne radi
	//usedLetters = null;

	
	//Choosing random current word from words
var word = words[Math.floor(Math.random() * words.length)];
	//Display letters of current random word in div above
var letters = document.getElementById("letters");
letters.innerHTML = addedWord;
	//Replace random word with "_"
var addedWord = [];
for (var i = 0; i < word.length; i++) {
    addedWord[i] = "_";
    letters.textContent = addedWord;
};
letters.textContent = addedWord.join(' ');
	
}; 
