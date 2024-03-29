'use strict';

// EXP0

const exp0Container = document.querySelector('.exp0 div');
const exp0Input = document.querySelector('.exp0 input');
let exp0Rotating = false;
let exp0RotRight = false;
let exp0RotLeft = false;
let exp0Angle = 0;

exp0Container.addEventListener('mousedown', e => {
	exp0Rotating = true;
	const divCenter = exp0Container.offsetWidth / 2;

	if (e.pageX - exp0Container.offsetLeft > divCenter) {
		exp0RotRight = true;
		exp0RotLeft = false;
	} else {
		exp0RotLeft = true;
		exp0RotRight = false;
	}
});
exp0Container.addEventListener('mouseup', () => (exp0Rotating = false));

setInterval(() => {
	if (!exp0Rotating) return;

	rotate(exp0Container);

	// y = (x*x) / 4*a
	const a = 0.3;
	exp0Input.value = (exp0Angle * exp0Angle) / (4 * a);
}, 100);

function rotate(element) {
	const maxAngle = 10;

	if (exp0Angle > maxAngle) exp0Angle = maxAngle;
	if (exp0Angle < -maxAngle) exp0Angle = -maxAngle;

	if (exp0RotRight) exp0Angle += 1;
	if (exp0RotLeft) exp0Angle -= 1;

	element.style.transform = 'rotate(' + exp0Angle + 'deg)';
}

// EXP1 ------------------------------------------------------------------------

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const exp1Btn = document.querySelector('.exp1 button');
const exp1Value = document.querySelector('.exp1 span.value');
exp1Btn.addEventListener(
	'click',
	() => (exp1Value.textContent = getRandomInt(1, 100))
);

// EXP2 ------------------------------------------------------------------------

const exp2Img = document.querySelector('.exp2 img');
const exp2Container = document.querySelector('.exp2 div.input');

const exp2Weight = document.querySelector('.exp2 span.weight');
const exp2Height = document.querySelector('.exp2 span.height');

const exp2Observer = new MutationObserver(function () {
	exp2Img.style.width = `${exp2Container.offsetWidth}px`;
	exp2Img.style.height = `${exp2Container.offsetHeight}px`;

	// 16, 16 - 1000, 1000
	// const minWeight = 16;
	// const maxWeight = 450;
	// const minHeight = 60;
	// const maxHeight = 270;

	exp2Weight.textContent = 0.44 * exp2Container.offsetWidth + 9;
	exp2Height.textContent = 0.21 * exp2Container.offsetHeight + 56.6;
}).observe(exp2Container, {
	attributes: true,
	childList: true,
	subtree: true,
});

// EXP4 ------------------------------------------------------------------------

const exp4Span = document.querySelector('.exp4 span.value');
const exp4Input = document.querySelector('.exp4 input');
exp4Input.addEventListener(
	'input',
	() => (exp4Span.textContent = exp4Input.value)
);

// EXP5 ------------------------------------------------------------------------

const exp5Numbers = document.getElementsByName('pnum');
const exp5Span = document.querySelector('.exp5 span.value');

[...exp5Numbers].forEach(ele => {
	ele.addEventListener('input', function (e) {
		let res = '';
		[...exp5Numbers].forEach(e => (res += e.value));
		exp5Span.textContent = res;
	});
});

// EXP6 ------------------------------------------------------------------------

const exp6Span = document.querySelector('.exp6 .text span.value');
const exp6Inputs = document.querySelectorAll('.exp6 .input span');
const exp6GenNewBtn = document.querySelector('.exp6 button');

exp6GenNewBtn.addEventListener('click', generateRandomPhoneNumbers);

[...exp6Inputs].forEach(inp => {
	inp.textContent = Math.random().toString().slice(2, 12);

	inp.addEventListener(
		'click',
		() => (exp6Span.textContent = inp.textContent)
	);
});

function generateRandomPhoneNumbers() {
	[...exp6Inputs].forEach(
		inp => (inp.textContent = Math.random().toString().slice(2, 12))
	);
}

// EXP7s ------------------------------------------------------------------------

const exp7GetNumCharsBtn = document.querySelector('.exp7 button.nChars');
const exp7Output = document.querySelector('.exp7 div.output');

const allChars = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
	' ',
];

function getRandomFromArr(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

exp7GetNumCharsBtn.addEventListener('click', () => {
	exp7Output.innerHTML = '';
	const title = document.createElement('span');
	title.textContent = 'Your name:';
	exp7Output.appendChild(title);
	exp7Output.appendChild(generateTable(getRandomInt(1, 20)));
});

function generateTable(cols) {
	const table = document.createElement('table');
	const row0 = document.createElement('tr'); // for each letter
	const row1 = document.createElement('tr'); // btn for each letter

	for (let i = 0; i < cols; i++) {
		// top row
		const span = document.createElement('span');
		span.textContent = 'A';

		const td0 = document.createElement('td');
		td0.appendChild(span);
		row0.appendChild(td0);

		// bottom row
		const btn = document.createElement('span');
		btn.textContent = '🎲';
		btn.addEventListener(
			'click',
			() => (span.textContent = getRandomFromArr(allChars))
		);

		const td1 = document.createElement('td');
		td1.appendChild(btn);
		row1.appendChild(td1);
	}

	table.appendChild(row0);
	table.appendChild(row1);

	return table;
}
