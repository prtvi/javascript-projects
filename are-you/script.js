'use strict';

const form = document.querySelector('.form');
const q = document.querySelector('div.q span');
const optns = document.querySelectorAll('div.optns input');
const btn = document.querySelector('.btn');
const btnContainer = document.querySelector('.submit');

let clickedAns;
let enableWrongAnsAnimation = false;

const getUrlParams = function () {
	const url = window.location.href;
	const params = url.slice(url.indexOf('?'));
	const searchParams = new URLSearchParams(params);

	const q = searchParams.get('q') || 'stupid';
	const a = searchParams.get('a') || 'yes';

	return [q, a];
};

optns.forEach(o =>
	o.addEventListener('click', () => {
		btn.disabled = false;
		clickedAns = o.value;

		if (clickedAns !== ans) enableWrongAnsAnimation = true;
		else enableWrongAnsAnimation = false;
	})
);

btn.addEventListener('click', () => {
	if (clickedAns !== ans) return;
	form.innerHTML = `<h1>Thanks for submitting!</h1>`;
});

const setbtnXCoord = x => (btn.style.left = `${x}px`);

window.addEventListener('mousemove', function (e) {
	if (!enableWrongAnsAnimation) return;

	const cx = e.clientX;
	const cy = e.clientY;

	if (!(cy >= up && cy <= bottom)) return;

	const dx = right - left;

	if (cx > left && cx < contCenter) setbtnXCoord(dx - (btnR - btnL) - 20);
	else if (cx < right && cx >= contCenter) setbtnXCoord(-dx + 100);
});

// main
btn.disabled = true;
const [subject, ans] = getUrlParams();
q.textContent = subject;

const { right: btnR, left: btnL } = btn.getBoundingClientRect();
const { left, right, top: up, bottom } = btnContainer.getBoundingClientRect();
const contCenter = (right - left) / 2 + left;
