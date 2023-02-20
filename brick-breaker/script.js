'use strict';

const gameWidth = 350;
const gameHeight = 544;
const playAreaHeight = 480;
const controlsHeight = gameHeight - playAreaHeight;

const nBricksInRow = 9;
const brickSize = gameWidth / nBricksInRow;
const nRows = 8;

const sliderHeight = 10;
const sliderWidth = 100;
const sliderInitPos = {
	x: gameWidth / 2 - sliderWidth / 2,
	y: playAreaHeight - sliderHeight,
};

const ballDiameter = 15;
const ballInitPos = {
	x: Math.random() * (sliderWidth - 25) + sliderInitPos.x + 25,
	y: playAreaHeight - ballDiameter - sliderHeight,
};

const board = document.querySelector('.board');
const gameArea = document.querySelector('.game-area');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');
const launchBtn = document.querySelector('.launch');

let playing = true;
const bricks2D = [];

class Brick {
	constructor(x, y, size) {
		this.size = size;
		this.x = x;
		this.y = y;
		this.right = this.x + this.size;
		this.bottom = this.y + this.size;
		this.center = this.calcCenter();
		this.dom = this.initDom();
	}

	calcCenter() {
		this.center = {
			x: (this.right - this.x) / 2 + this.x,
			y: (this.bottom - this.y) / 2 + this.y,
		};

		return this.center;
	}

	initDom() {
		const brick = document.createElement('div');
		brick.classList.add('brick');

		brick.style.height = `${this.size - 1}px`;
		brick.style.width = `${this.size - 1}px`;
		brick.style.left = `${this.x}px`;
		brick.style.top = `${this.y}px`;

		return brick;
	}

	render() {
		this.dom.style.left = `${this.x}px`;
		this.dom.style.top = `${this.y}px`;
	}
}

class Ball {
	constructor(x, y) {
		this.d = ballDiameter;

		this.x = x; // top
		this.y = y; // left
		this.right = this.x + this.d;
		this.bottom = this.y + this.d;

		this.launchReady = false;
		this.outOfBounds = false;

		this.speedX = -4;
		this.speedY = -4;

		this.dom = this.initDom();
		this.center = this.calcCenter();
	}

	initDom() {
		const ball = document.querySelector('.ball');
		ball.style.height = `${this.d}px`;
		ball.style.width = `${this.d}px`;
		ball.style.left = `${this.x}px`;
		ball.style.top = `${this.y}px`;

		return ball;
	}

	calcCenter() {
		this.center = {
			x: (this.right - this.x) / 2 + this.x,
			y: (this.bottom - this.y) / 2 + this.y,
		};

		return this.center;
	}

	setLaunch(launch) {
		this.launchReady = launch;
	}

	isReadyForLaunch() {
		return this.launchReady === true;
	}

	launch() {
		this.x += this.speedX;
		this.y += this.speedY;
		this.right = this.x + this.d;
		this.bottom = this.y + this.d;

		if (this.x <= 0 || this.right > gameWidth) this.speedX *= -1;
		if (this.y <= 0) this.speedY *= -1;

		if (
			this.bottom > playAreaHeight &&
			this.x > slider.x &&
			this.right < slider.right
		)
			this.speedY *= -1;

		if (this.y > playAreaHeight) {
			this.outOfBounds = true;
			playing = false;
		}
	}

	isColliding(brick) {
		const ballCenter = this.calcCenter();
		const brickCenter = brick.calcCenter();

		const dx2 = (ballCenter.x - brickCenter.x) * (ballCenter.x - brickCenter.x);
		const dy2 = (ballCenter.y - brickCenter.y) * (ballCenter.y - brickCenter.y);
		const dist = Math.sqrt(dx2 + dy2);

		if (dist <= ballDiameter / 2) {
			if (gameArea.contains(brick.dom)) gameArea.removeChild(brick.dom);

			ball.speedY *= -1;

			console.log('collision');
		}
	}

	render() {
		this.dom.style.left = `${this.x}px`;
		this.dom.style.top = `${this.y}px`;
	}
}

class Slider {
	constructor(x, y, width, height) {
		this.width = width;
		this.height = height;

		this.x = x;
		this.y = y;
		this.right = this.x + this.width;
		this.bottom = this.y + this.height;

		this.dom = this.initDom();
	}

	initDom() {
		const slider = document.querySelector('.slider');
		slider.style.height = `${this.height}px`;
		slider.style.width = `${this.width}px`;
		slider.style.left = `${this.x}px`;
		slider.style.top = `${this.y}px`;

		return slider;
	}

	setRightAndBottom() {
		this.right = this.x + this.width;
		this.bottom = this.y + this.height;
	}

	moveLeft() {
		this.x -= 30;
		if (this.x <= 0) this.x = 0;

		this.setRightAndBottom();
	}

	moveRight() {
		this.x += 30;
		if (this.x + this.width >= gameWidth) this.x = gameWidth - this.width;

		this.setRightAndBottom();
	}

	render() {
		this.dom.style.left = `${this.x}px`;
	}
}

const populateBricks = function () {
	let brickLeft = 0;
	let brickTop = 0;

	for (let i = 0; i < nRows; i++) {
		const row = [];
		for (let j = 0; j < nBricksInRow; j++) {
			const brick = new Brick(brickLeft, brickTop, brickSize);

			row.push(brick);
			gameArea.appendChild(brick.dom);
			brickLeft += brickSize;
		}

		bricks2D.push(row);

		brickLeft = 0;
		brickTop += brickSize;
	}
};

const moveSliderEL = function (e) {
	const clickedEleClassList = e.target.classList;

	if (clickedEleClassList.contains('left')) slider.moveLeft();
	if (clickedEleClassList.contains('right')) slider.moveRight();
	if (clickedEleClassList.contains('launch')) ball.setLaunch(true);
};

const ball = new Ball(ballInitPos.x, ballInitPos.y);
const slider = new Slider(
	sliderInitPos.x,
	sliderInitPos.y,
	sliderWidth,
	sliderHeight
);

populateBricks();

leftBtn.addEventListener('click', moveSliderEL);
rightBtn.addEventListener('click', moveSliderEL);
launchBtn.addEventListener('click', moveSliderEL);

window.addEventListener('keyup', function (e) {
	if (e.key === 'ArrowLeft') slider.moveLeft();
	else if (e.key === 'ArrowRight') slider.moveRight();
});

const draw = function () {
	ball.render();
	slider.render();

	if (ball.isReadyForLaunch()) {
		ball.launch();

		bricks2D.forEach(row => {
			row.forEach(brick => {
				brick.render();

				ball.isColliding(brick);
			});
		});
	}

	if (playing) window.requestAnimationFrame(draw);
};

draw();
