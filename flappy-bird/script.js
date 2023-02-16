'use strict';

const main = document.querySelector('.main');
const groundOffset = document.querySelector('.ground').offsetTop;
const scoreEle = document.querySelector('.score');
const gameOverOverlay = document.querySelector('.overlay');

const windowWidth = 450;
const windowHeight = 700;
const skyHeight = 600;
const groundHeight = 100;

const birdHeight = 45;
const birdWidth = 60;
const jumpHeight = 50;

const pipeSpeed = 2;
const maxPipeLen = 250;
const minPipeLen = 220;
const gapBetweenPipe = 200;

// stop animation after 3000ms
const stopAfterMs = 3000;

class Bird {
	constructor(x, y) {
		// init bird in the dom
		this.birdDom = document.querySelector('.bird');
		this.birdDom.style.left = `${x}px`;

		this.height = birdHeight;
		this.width = birdWidth;

		// dimension as per getBoundingRect method
		this.x = x; // left
		this.y = y; // top
		this.right = this.x + this.width;
		this.bottom = this.y + this.height;

		// simulate gravity and bounce
		this.speedY = 0;
		this.acceleration = 0;
		this.gravity = 0.1;
		this.bounce = 0.3;
	}

	jump() {
		// check for top of screen for collision, if true then don't jump
		if (this.y < 50) return;

		// do not jump if obstacle is hit
		if (hitObstacle) return;

		// decrease y on jump
		this.y -= jumpHeight;

		// update dimensions of bird
		this.bottom = this.y + this.height;

		// reset speed and acceleration on jump
		this.speedY = 0;
		this.acceleration = 0;
	}

	fall() {
		// fall down with acceleration
		this.acceleration += this.gravity;
		this.y += this.speedY + this.acceleration;

		// update dimensions of bird
		this.bottom = this.y + this.height;

		// if bird hits the bottom
		if (this.bottom >= groundOffset) {
			// enable hitObstacle so pipes stop moving
			hitObstacle = true;
			this.y = groundOffset - this.height;
			this.bounceAndFall();
		}
	}

	bounceAndFall() {
		// bounce effect on collision
		this.acceleration = -(this.acceleration * this.bounce);

		// display game over overlay
		gameOverOverlay.style.display = 'block';

		// disable animation after "stopAfterMs" ms
		setTimeout(() => (playing = false), stopAfterMs);
	}

	display() {
		// render bird
		this.birdDom.style.top = `${this.y}px`;
	}
}

class Pipe {
	constructor(x, y, height) {
		this.height = height;
		this.width = 60;

		// dimension as per getBoundingRect method
		this.x = x; // left
		this.y = y; // top
		this.right = this.x + this.width;
		this.bottom = this.y + this.height;

		// to check if the pipe is passed by the bird, to increment score
		this.passed = false;
		this.pipeDom = this.initPipeDom();
	}

	initPipeDom() {
		// create a new div.pipe
		const pipe = document.createElement('div');
		pipe.classList.add('pipe');

		pipe.style.height = `${this.height}px`;
		pipe.style.width = `${this.width}px`;
		pipe.style.top = `${this.y}px`;

		// if top pipe then add top class
		if (this.y === 0) pipe.classList.add('top');

		return pipe;
	}

	translateX() {
		// move pipe to the right
		this.x -= pipeSpeed;
		// update pipe dimensions
		this.right = this.x + this.width;
	}

	isOut() {
		// returns true when the right side of the pipe goes out of bounds
		return this.right === 0;
	}

	isColliding(bird) {
		// calculate the bird's centre coordinates
		const birdCenter = {
			x: (bird.right - bird.x) / 2 + bird.x,
			y: (bird.bottom - bird.y) / 2 + bird.y,
		};

		// increment score only if the pipe has not been passed
		if (birdCenter.x + 30 > this.right && !this.passed) {
			score += 1;
			scoreEle.textContent = score;
			this.passed = true;
		}

		if (this.y === 0) {
			// if top pipe
			// 30 denotes the bird's width/2
			// 23.5 denotes the bird's height/2
			if (
				birdCenter.x + 30 > this.x &&
				birdCenter.y < this.bottom + 23.5 &&
				birdCenter.x - 30 < this.right
			)
				return true;
		} else {
			// bottom pipe
			if (
				birdCenter.x + 30 > this.x &&
				birdCenter.y + 23.5 > this.y &&
				birdCenter.x - 30 < this.right
			)
				return true;
		}

		return false;
	}

	display() {
		// render pipe
		this.pipeDom.style.left = `${this.x}px`;
	}
}

const initPipes = function () {
	// init 3 pipes in the game window
	let x = windowWidth;
	const pipes = [];

	for (let i = 0; i < 3; i++) {
		const height = Math.random() * (maxPipeLen - minPipeLen) + minPipeLen;

		let pipe;
		if (pipeDirectionToggle)
			// top pipe
			pipe = new Pipe(x, windowHeight - groundHeight - height, height);
		// bottom pipe
		else pipe = new Pipe(x, 0, height);

		pipes.push(pipe);

		// add gap between pipes
		x += gapBetweenPipe;

		// toggle pipeDirectionToggle
		pipeDirectionToggle = !pipeDirectionToggle;
	}

	return pipes;
};

const initPipe = function (x) {
	// returns a new pipe
	const height = Math.random() * (maxPipeLen - minPipeLen) + minPipeLen;

	let pipe;
	if (pipeDirectionToggle)
		pipe = new Pipe(x, windowHeight - groundHeight - height, height);
	else pipe = new Pipe(x, 0, height);

	pipeDirectionToggle = !pipeDirectionToggle;

	return pipe;
};

window.addEventListener('keyup', function (e) {
	// for bird jump, jump only when playing
	if (e.code === 'Space' && playing) bird.jump();
	// restart game on enter by reloading page
	else if (e.code === 'Enter' && !playing)
		this.location.href = this.location.href;
});

// main

// global variable to check pipes are created alternatively (top/bottom)
let pipeDirectionToggle = true;

// global variable to enable/disable animation
let playing = true;

// global variable to stop pipe movement on collision
let hitObstacle = false;

// score
let score = 0;

// init bird object
const bird = new Bird(150, 200);

// init first 3 pipes for render: array
let pipes = initPipes();

const draw = function () {
	// render animation function

	// render bird
	bird.display();

	// apply fall on bird
	bird.fall();

	// loop through pipes array and render only if obstacle is not hit
	pipes.forEach((pipe, i) => {
		if (hitObstacle) return;

		// if obstacle is not hit
		pipe.display();
		pipe.translateX();

		// append pipeDom to main element
		main.appendChild(pipe.pipeDom);

		if (pipe.isOut()) {
			// if pipe is out of game bounds, then remove that pipe from main element and pipes array
			main.removeChild(pipe.pipeDom);
			pipes.splice(i, 1);
		}

		// check if bird collides with any of the pipes
		if (pipe.isColliding(bird)) {
			hitObstacle = true;
			bird.bounceAndFall();
		}
	});

	// when one of the pipe is removed from the array, add another pipe to the array
	if (pipes.length === 2) pipes.push(initPipe(pipes[1].x + gapBetweenPipe));

	// animate only if playing
	if (playing) window.requestAnimationFrame(draw);
};

draw();
