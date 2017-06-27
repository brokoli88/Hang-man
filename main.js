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
    
        
    
    
