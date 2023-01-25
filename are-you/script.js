'use strict';

const form = document.querySelector('.form');
const question = document.querySelector('div.q span');
const optns = document.querySelectorAll('div.optns input');
const btn = document.querySelector('.btn');
const btnContainer = document.querySelector('.submit');
const img = document.querySelector('img');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('span.close');

// init variables for btn and btn container
const { right: btnR, left: btnL } = btn.getBoundingClientRect();
const { left, right, top: up, bottom } = btnContainer.getBoundingClientRect();
const contCenter = (right - left) / 2 + left;

// default constants
const defQuestion = 'Are you stupid';
const defAnswer = 'yes';
const defMessage = 'Hehe knew it! 😂';

const getUrlParams = function () {
	// get the url params or the default values to the same
	const url = window.location.href;
	const params = url.slice(url.indexOf('?'));
	const searchParams = new URLSearchParams(params);

	const q = searchParams.get('q') || defQuestion;
	const a = searchParams.get('a') || defAnswer;
	const m = searchParams.get('m') || defMessage;

	return [q, a, m];
};

// set the question to the input
const setQuestion = ques => (question.textContent = ques);

// set the submit btn X coordinate
const setbtnXCoord = x => (btn.style.left = `${x}px`);

// event listeners

const optionsEL = function () {
	// on options click, enable btn and check if answer is right and enable animation accordingly
	btn.disabled = false;
	clickedAns = this.value;

	if (clickedAns !== ans) enableWrongAnsAnimation = true;
	else enableWrongAnsAnimation = false;
};

const btnSubmitEL = function () {
	// on submit btn click, check if answer is as expected, if yes  then display the message and the image
	if (clickedAns !== ans) return;
	form.innerHTML = `<h1>${message}</h1>`;
	img.style.display = 'block';
};

const mouseMoveEL = function (e) {
	// on-mouse-move, check if animation is enabled, if yes then check the bounds of the mouse and move the submit btn accordingly
	if (!enableWrongAnsAnimation) return;

	const cx = e.clientX;
	const cy = e.clientY;

	if (!(cy >= up && cy <= bottom)) return;

	const dx = right - left;

	if (cx > left && cx < contCenter) setbtnXCoord(dx - (btnR - btnL) - 20);
	else if (cx < right && cx >= contCenter) setbtnXCoord(-dx + 100);
};

const modalOpenEL = function () {
	// on click, open modal, select all elements in modal form, generate url and let use copy the same
	modal.style.display = 'block';

	const copyUrlBtn = modal.querySelector('.btn-modal');

	const q = modal.querySelector('#q');
	const m = modal.querySelector('#m');
	const aYes = modal.querySelector('#yesModal');
	const aNo = modal.querySelector('#noModal');

	const url = modal.querySelector('#url');

	const checkOption = function () {
		if (aYes.checked) return aYes.value;
		else if (aNo.checked) return aNo.value;
		else return aYes.value;
	};

	[q, m, aYes, aNo].forEach(i => {
		i.addEventListener('change', () => {
			const qVal = q.value || defQuestion;
			const mVal = m.value || defMessage;

			url.value = `?q=${qVal}&a=${checkOption()}&m=${mVal}`;
		});
	});

	copyUrlBtn.addEventListener('click', () => {
		navigator.clipboard.writeText(
			encodeURI(
				`https://prtvi.github.io/javascript-projects/are-you/index.html${url.value}`
			)
		);

		copyUrlBtn.textContent = 'Copied!';
		setTimeout(() => (copyUrlBtn.textContent = 'Copy URL'), 1500);
	});
};

// add event listeners
optns.forEach(o => o.addEventListener('click', optionsEL));
btn.addEventListener('click', btnSubmitEL);
window.addEventListener('mousemove', mouseMoveEL);

// modal close and open
img.addEventListener('click', modalOpenEL);
modalClose.addEventListener('click', () => (modal.style.display = 'none'));
window.addEventListener('click', function (e) {
	if (e.target === modal) modal.style.display = 'none';
});

// main
let clickedAns;
let enableWrongAnsAnimation = false;
btn.disabled = true;
const [ques, ans, message] = getUrlParams();
setQuestion(ques);

// validate device
const userAgent = navigator.userAgent.toLowerCase();
if (userAgent.includes('android') || userAgent.includes('mobile'))
	form.innerHTML = `<h2>This page is best viewed on desktop/laptops</h2>`;
