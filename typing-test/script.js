'use strict';

const targetTextEl = document.querySelector('.target-text');
const input = document.getElementById('input');
const wpm = document.getElementById('wpm');

const text = [
	'I only enjoy window shopping when the windows are transparent',
	'There should have been a time and a place, but this was not it',
	'There is probably enough glass in my cupboard to build an undersea aquarium',
	'As he waited for the shower to warm, he noticed that he could hear water change temperature',
	'She was sad to hear that fireflies are facing extinction due to artificial light and habitat loss and pesticides',
	'He turned in the research paper on Friday otherwise he would have not passed the class',
	'The sudden rainstorm washed crocodiles into the ocean along with the water',
	'Charles ate the french fries knowing they would be his last meal',
	'Now I need to ponder my existence and ask myself if I am truly real',
	'He was the type of guy who liked Christmas lights on his house in the middle of July',
	'The random sentence generator generated a random sentence about a random sentence',
	'I have travelled all around Africa and still have not found the guy who stole my scarf',
	'There have been days when I wished to be separated from my body but today was not one of those days',
	"The sight of his goatee made me want to run and hide under my brother's bed",
	'It took me too long to realize that the ceiling had not been painted to look like the sky',
	'The shark infested south pine channel was the only way in or out',
	'I became paranoid that the school of jellyfish was spying on me',
	'The efficiency we have at removing trash has made creating trash more acceptable',
	'The clock within this blog and the clock on my laptop are one hour different from each other',
	'The pet shop stocks everything you need to keep your anaconda happy',
	'He learned a important lesson that a picnic at the beach on a windy day is a bad idea',
	'Writing a list of random sentences is harder than I initially thought it would be',
	'I thought red would have felt warmer in summer but I did not think about the equator',
	'I know many children ask for a pony but I wanted a bicycle with rockets strapped to it',
	'If my calculator had a history it would be more embarrassing than my browser history',
	'She can live her life however she wants as long as she listens to what I have to say',
	'Sometimes I stare at a door or a wall and I wonder what is this reality why am I alive and what is this all about?',
	'They desperately needed another drummer since the current one only knew how to play bongos',
	'Nothing is as cautiously cuddly as a pet porcupine',
	'Sometimes all you need to do is completely make an ass of yourself and laugh it off to realise that life is not so bad after all',
];

// declare global variables
let currText = '';
let targetText = '';

let startTime;
let endTime;

let startTimer;
let playing;

// sets new target text and returns it
const setNewTargetText = () => {
	targetTextEl.textContent = text[Math.floor(Math.random() * text.length)];
	return targetTextEl.textContent;
};

// compares two strings and returns the index where they do not match, if they match then returns the length of the shorter string
const compareStr = (a, b) => {
	const len = a.length >= b.length ? b.length : a.length;

	for (let i = 0; i < len; i++) {
		if (a[i] !== b[i]) return i;
	}
	return len;
};

// renders the targetText to green if the entered text is right, es
const render = () => {
	let wrongIndex = compareStr(currText, targetText);

	const correctText = targetText.slice(0, wrongIndex); // correct inputted text  -> from beginning to the first wrong character
	const wrongText = currText.slice(wrongIndex, currText.length); // wrong inputted text -> from the first wrong char to any subsequent wrong characters
	const restText = targetText.slice(currText.length); // rest text -> after the wrong text

	// render all the correct, wrong and rest of the text using different classes
	targetTextEl.innerHTML = `<p class="correct-text">${correctText}</p><p class="incorrect-text">${wrongText}</p>${restText}`;
};

// limit the input text length
const limitTextLength = () => {
	if (input.value.length >= targetText.length)
		input.value = input.value.substring(0, targetText.length);
};

// call the start and end timers based on the conditions
const callTimers = () => {
	if (currText[0] === targetText[0] && !startTimer) {
		// startTime begins when the first character matches
		startTime = Date.now();
		startTimer = true;
	}

	// measured everytime for WPM calculation
	endTime = Date.now();
};

// calculates WPM and sets it
const calculateAndSetWPM = () => {
	let timeElapsedSeconds = (endTime - startTime) / 1000;
	let timeElapsedMin = timeElapsedSeconds / 60;
	let charsPerMin = currText.length / timeElapsedMin;
	let wordsPerMin = charsPerMin / 5;

	wpm.textContent = `WPM: ${Math.round(wordsPerMin) || 0}`;
};

// re-initialize when the user finishes the targetText succesfully
const onComplete = () => {
	playing = false;
	targetTextEl.innerHTML = `<p class="on-finish">${targetText}</p>`;
	input.value = '';
	input.placeholder = 'Press ENTER to try again...';

	input.addEventListener('keydown', e => {
		if (e.key === 'Enter') init();
	});
};

// initialize global variables to begin and then check parameters with setInterval function

let typedString = '';

const init = () => {
	input.placeholder = 'Type here...';
	startTimer = false;
	playing = true;
	targetText = setNewTargetText();

	setInterval(() => {
		if (!playing) return;

		currText = input.value;

		limitTextLength();
		callTimers();
		render();
		calculateAndSetWPM();

		if (targetText === currText) onComplete();
	}, 100);
};

init();
