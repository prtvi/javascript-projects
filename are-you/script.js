'use strict';

const form = document.querySelector('.form');
const q = document.querySelector('div.q span');
const optns = document.querySelectorAll('div.optns input');
const btn = document.querySelector('.btn');
const btnContainer = document.querySelector('.submit');
const img = document.querySelector('img');

// modal
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('span.close');

// init variables for btn and btn container
const { right: btnR, left: btnL } = btn.getBoundingClientRect();
const { left, right, top: up, bottom } = btnContainer.getBoundingClientRect();
const contCenter = (right - left) / 2 + left;

const setbtnXCoord = x => (btn.style.left = `${x}px`);

const getUrlParams = function () {
	const url = window.location.href;
	const params = url.slice(url.indexOf('?'));
	const searchParams = new URLSearchParams(params);

	const q = searchParams.get('q') || 'stupid';
	const a = searchParams.get('a') || 'yes';
	const m = searchParams.get('m') || 'Thanks for submitting!';

	return [q, a, m];
};

const optionsEL = function () {
	btn.disabled = false;
	clickedAns = this.value;

	if (clickedAns !== ans) enableWrongAnsAnimation = true;
	else enableWrongAnsAnimation = false;
};

const btnEL = function () {
	if (clickedAns !== ans) return;
	form.innerHTML = `<h1>${message}</h1>`;
	img.style.display = 'block';
};

const mouseMoveEL = function (e) {
	if (!enableWrongAnsAnimation) return;

	const cx = e.clientX;
	const cy = e.clientY;

	if (!(cy >= up && cy <= bottom)) return;

	const dx = right - left;

	if (cx > left && cx < contCenter) setbtnXCoord(dx - (btnR - btnL) - 20);
	else if (cx < right && cx >= contCenter) setbtnXCoord(-dx + 100);
};

const modalOpenEL = function () {
	modal.style.display = 'block';

	const copyUrlBtn = modal.querySelector('.btn-modal');

	const q = modal.querySelector('#subjectModal');
	const m = modal.querySelector('#message');
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
			const qVal = q.value || 'stupid';
			const mVal = m.value || 'Thanks for submitting!';

			url.value = `?q=${qVal}&a=${checkOption()}&m=${mVal}`;
		});
	});

	copyUrlBtn.addEventListener('click', () => {
		navigator.clipboard.writeText(
			`https://prtvi.github.io/javascript-projects/are-you/index.html${url.value}`
		);

		copyUrlBtn.textContent = 'Copied!';
		setTimeout(() => (copyUrlBtn.textContent = 'Copy URL'), 1500);
	});
};

// add event listeners
optns.forEach(o => o.addEventListener('click', optionsEL));
btn.addEventListener('click', btnEL);
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
const [subject, ans, message] = getUrlParams();
q.textContent = subject;

// validate device
const userAgent = navigator.userAgent.toLowerCase();
if (userAgent.includes('android') || userAgent.includes('mobile'))
	form.innerHTML = `<h1>This page is best viewed on desktop/laptops</h1>`;
