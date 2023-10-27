/*
Student Name: Samarpreet Singh
Student Number: 200510621
Program: CMPG 2 Year Diploma
Section and CRN: Tuesday 12PM, 11384
*/
// Assignment 1 | COMP1073 Client-Side JavaScript

/* Variables
-------------------------------------------------- */
// Create a new speechSynthesis object
// (I switched all var declarations to let since let is better)
let synth = window.speechSynthesis;
// Learn more about SpeechSynthesis.speak() at https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak
let textToSpeak = ''; // setting the variable to empty string so that we can add text to it later

let speakButton = document.getElementById('speak-button'); // getting the speak-button and all other buttons through their IDs.

let nounsButton = document.getElementById('nouns-button');
let verbsButton = document.getElementById('verbs-button');
let adjectivesButton = document.getElementById('adjectives-button');
let secondNounsButton = document.getElementById('second-nouns-button');
let placesButton = document.getElementById('places-button');
let surpriseButton = document.getElementById('surprise-button');
let resetButton = document.getElementById('reset-button');

let storyText = document.getElementById('story-text');

// Creating the arrays containing the respective words/phrases for each button.
let nounsArray = ["The turkey", "Mom", "Dad", "The dog", "My teacher", "The elephant", "The cat"];
let verbsArray = ["sat on", "ate", "danced with", "saw", "doesn't like", "kissed"];
let adjectivesArray = ["a funny", "a scary", "a goofy", "a slimy", "a barking", "a fat"];
let fourthColNounsArray = ["goat", "monkey", "fish", "cow", "frog", "bug", "worm"];
let placesArray = ["on the moon", "on the chair", "in my spaghetti", "in my soup", "on the grass", "in my shoes"];


/* Functions
-------------------------------------------------- */
function speakNow(string) {
	// Create a new speech object, attaching the string of text to speak
	let utterThis = new SpeechSynthesisUtterance(string);
	// Actually speak the text
	synth.speak(utterThis);
}

/* Event Listeners
-------------------------------------------------- */
// Onclick handler for the button that speaks the text contained in the above var textToSpeak
speakButton.onclick = function () {
	speakNow(textToSpeak);
	storyText.innerHTML = textToSpeak; // Setting the text of the p element to whatever is in textToSpeak, since textToSpeak has all needed words by the time this function is called.
	//console.log(textToSpeak); // logging to the console for debugging purposes.
}

//setting event listeners for each button
nounsButton.onclick = function () {
	randomArrayElementPicker(nounsArray); //randomArrayElementPicker function is explained where it is defined
}
verbsButton.onclick = function () {
	randomArrayElementPicker(verbsArray);
}
adjectivesButton.onclick = function () {
	randomArrayElementPicker(adjectivesArray);
}
secondNounsButton.onclick = function () {
	randomArrayElementPicker(fourthColNounsArray);
}
placesButton.onclick = function () {
	randomArrayElementPicker(placesArray);
}
surpriseButton.onclick = function () { // separate functionality for surprise button.
	storyText.innerHTML = ''; // Setting the p tag element to an empty string because the Surprise story should overwrite whatever is already in that element.
	surpriseArrayElementPicker(); // surpriseArrayElementPicker function is explained below where it is defined.
	storyText.innerHTML = textToSpeak; // Setting the p tag element to contain the contents of textToSpeak, which was populated after the surpriseArrayElementPicker function call above.
	speakNow(textToSpeak); //Using the speakNow function to speak out the surprise story.
	//console.log(textToSpeak); // logging to console for debugging purposes.

	textToSpeak = ''; // setting textToSpeak as empty string again so that if the user clicks the random picker buttons, a new sentence can start forming instead of getting concatenated to the surprise button's generated story string.
}
resetButton.onclick = function () { // Reset btn functionality.
	textToSpeak = ''; // Sets textToSpeak to empty to start over again.
	storyText.innerHTML = ''; // Sets the storyText p tag element to ekmpty string as well to start over.
}

/**
 * Picks a random element from a given array
 * @param {Array} array -> The array from which a random element is to be picked
 */
function randomArrayElementPicker(array) {
	let randomElement = array[Math.floor(Math.random() * array.length)]; // Math.random picks a random floating-point number between 0 (inclusive) and the length of array (exclusive) IN THIS CASE BECAUSE IT IS MULTIPLIED OTHERWISE IT IS 0 INC and 1 EXC.
	//That's why we don't use length - 1 here because that has already been done by the random function itself.
	// Next, whatever number we get from there is passed to Math.floor which rounds a number down to the nearest integer. We can only pass in whole numbers to the square brackets [] of the array.
	//That's why Math.floor is necessary.

	//Then that whole returned integer value is finally passed to the array in square bracket notation to pick a random number from that array, which is then stored in randomElement.

	if (textToSpeak !== '') { // This is a check to ensure that a blank space is added between words so that they don't get concatenated into one giant word that means nothing.
		// The blank space is only added however, if textToSpeak is not already an empty string.
		//It wouldn't make sense to add a blank space before the first element is added.
		textToSpeak += ' ';
	}

	textToSpeak += randomElement; // random element obtained from the array is then assigned to textToSpeak

	speakNow(randomElement); // then the randomly added word is spoken out, to ensure a user experience as close as possible to the physical product itself.
	//console.log(randomElement); // logging the random element for debugging purposes.
}

/**
 * Picks random elements from each array and concatenates them to textToSpeak all at once.
 */
function surpriseArrayElementPicker() {
	textToSpeak = ''; // setting textToSpeak to empty to overwrite anything that already exists in it.

	let randomNoun = nounsArray[Math.floor(Math.random() * nounsArray.length)]; // same concept as the randomArrayElementPicker function
	let randomVerb = verbsArray[Math.floor(Math.random() * verbsArray.length)];
	let randomAdjective = adjectivesArray[Math.floor(Math.random() * adjectivesArray.length)];
	let randomSecondNoun = fourthColNounsArray[Math.floor(Math.random() * fourthColNounsArray.length)];
	let randomPlaces = placesArray[Math.floor(Math.random() * placesArray.length)];

	textToSpeak = `${randomNoun} ${randomVerb} ${randomAdjective} ${randomSecondNoun} ${randomPlaces}`; // Using a template literal to concatenate all randomly picked elements from each array and assign them to textToSpeak.
}


