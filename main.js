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
                    
    




     
     

    


    

