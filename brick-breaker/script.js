'use strict';

const gameWidth = 350;
const gameHeight = 544;
const playAreaHeight = 480;
const controlsHeight = gameHeight - playAreaHeight;

const nBricksInRow = 10;
const brickSize = gameWidth / nBricksInRow;
const nRows = 8;

const sliderHeight = 10;
const sliderWidth = 100;
const sliderInitPos = {
	x: gameWidth / 2 - sliderWidth / 2,
	y: playAreaHeight - sliderHeight,
};

const ballRadius = 15;
const ballInitPos = {
	x: sliderInitPos.x + sliderWidth / 2,
	y: playAreaHeight - ballRadius - sliderHeight,
};

const board = document.querySelector('.board');
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');

const bricks = [];

class Brick {
	constructor(x, y, size) {
		this.size = size;
		this.x = x;
		this.y = y;
		this.right = this.x + this.size;
		this.bottom = this.y + this.size;
		this.dom = this.initDom();
	}

	initDom() {
		const brick = document.createElement('div');
		brick.classList.add('brick');

		brick.style.height = `${this.size}px`;
		brick.style.width = `${this.size}px`;
		brick.style.left = `${this.x}px`;
		brick.style.top = `${this.y}px`;

		return brick;
	}

	render() {}
}

class Ball {
	constructor(x, y) {
		this.r = ballRadius;
		this.x = x;
		this.y = y;
		this.right = this.x + this.r;
		this.bottom = this.y + this.r;
		this.dom = this.initDom();
	}

	initDom() {
		const ball = document.querySelector('.ball');
		ball.style.height = `${this.r}px`;
		ball.style.width = `${this.r}px`;
		ball.style.left = `${this.x}px`;
		ball.style.top = `${this.y}px`;

		return ball;
	}

	render() {
		this.dom.style.left = `${this.x}px`;
		this.dom.style.top = `${this.y}px`;
	}
}

class Slider {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
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

	moveLeft() {
		this.x -= 10;
		if (this.x <= 0) this.x = 0;
	}

	moveRight() {
		this.x += 10;
		if (this.x + this.width >= gameWidth) this.x = gameWidth - this.width;
	}

	render() {
		this.dom.style.left = `${this.x}px`;
	}
}

const populateBricks = function () {
	let brickLeft = 0;
	let brickTop = 0;

	for (let i = 0; i < nBricksInRow * nRows; i++) {
		const brick = new Brick(brickLeft, brickTop, brickSize);

		bricks.push(brick);
		board.appendChild(brick.dom);

		brickLeft += brickSize;
		if (brickLeft >= gameWidth) {
			brickLeft = 0;
			brickTop += brickSize;
		}
	}
};

const moveSliderEL = function (e) {
	if (e.target.classList.contains('left')) slider.moveLeft();
	if (e.target.classList.contains('right')) slider.moveRight();
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

const draw = function () {
	ball.render();
	slider.render();

	window.requestAnimationFrame(draw);
};

draw();
