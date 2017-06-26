var words = ["pas", "drvo", "sunce", "zgrada"];
var letter = document.getElementById("view").value;

//Show letter that is typed in input field in square below
function showLetter() {
    var inputLetter = document.getElementById("input").value;
    document.getElementById("view").innerHTML = inputLetter;
    corectLetter(letter);
}; 

//Choose random word from array of words for one game
var word = words[Math.floor(Math.random() * words.length)];

//Replace random choosen word with _
var seeWord = document.getElementById("demo").innerHTML;
document.getElementById("demo").innerHTML = word.replace(/./g, " _ ");

//On Play again button, start all over game (empty fields and new random word)
function playAgain() {
    document.getElementById("input").value = null;
    showLetter();
}

    
//Show correct letter instead of _
function corectLetter(letter) {
    for (var i=0; i < word.length; i++) {
        var inputLetter = document.getElementById("input").value;
        document.getElementById("view").innerHTML = inputLetter;
        if(word[i] === inputLetter) {
            document.getElementById("demo").innerHTML = word[i];
            word[i]= inputLetter;
            //Menja celu rec za slovo, umesto da menja samo slova koja su ista kao pogodjeno slovo
            
            
           //alert ("Great!");
           //console.log("You guessed a letter! Great!");
        } 
    }   
}
    
    
    
    
    
    
    
    
    
    
    
    
    //
        
    
    
