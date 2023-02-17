'use strict';

const main = document.querySelector('.game-board');
const birdDom = document.querySelector('.bird');
const scoreEle = document.querySelector('.score');
const overlay = document.querySelector('.overlay');
const jumpBtn = document.querySelector('.jump');

// variables initialised based on device
let windowWidth,
	windowHeight,
	skyHeight,
	groundHeight,
	topCollisionDistance,
	birdWidth,
	birdHeight,
	jumpHeight,
	initialBirdPos,
	pipeWidth,
	pipeSpeed,
	maxPipeLen,
	minPipeLen,
	gapBetweenPipe,
	// game variables

	pipeDirectionToggle, // global variable to check pipes are created alternatively (top/bottom)
	playing, // global variable to enable/disable animation
	hitObstacle, // global variable to stop pipe movement on collision
	bird, // main bird object
	pipes, // init first 3 pipes for render: array
	score;

// stop animation after
const stopAfterMs = 2500;

class Bird {
	constructor(x, y) {
		// init bird in the dom
		this.birdDom = this.initBirdDom(x);

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

	initBirdDom(x) {
		birdDom.style.left = `${x}px`;
		birdDom.style.width = `${birdWidth}px`;
		birdDom.style.height = `${birdHeight}px`;
		return birdDom;
	}

	jump() {
		// check for top of screen for collision, if true then don't jump
		if (this.y < topCollisionDistance) return;

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
		if (this.bottom >= skyHeight) {
			// enable hitObstacle so pipes stop moving
			hitObstacle = true;
			this.y = skyHeight - this.height;
			this.bounceAndFall();
		}
	}

	bounceAndFall() {
		// bounce effect on collision
		this.acceleration = -(this.acceleration * this.bounce);

		// display game over & restart overlay
		displayRestart();

		// disable all animations after "stopAfterMs" ms
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
		this.width = pipeWidth;

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

		const birdWidthBy2 = birdWidth / 2;
		const birdHeightBy2 = birdHeight / 2;

		// increment score only if the pipe has not been passed
		if (birdCenter.x + birdWidthBy2 > this.right && !this.passed) {
			score += 1;
			scoreEle.textContent = score;
			this.passed = true;
		}

		if (this.y === 0) {
			// if top pipe
			if (
				birdCenter.x + birdWidthBy2 > this.x &&
				birdCenter.y < this.bottom + birdHeightBy2 &&
				birdCenter.x - birdWidthBy2 < this.right
			)
				return true;
		} else {
			// bottom pipe
			if (
				birdCenter.x + birdWidthBy2 > this.x &&
				birdCenter.y + birdHeightBy2 > this.y &&
				birdCenter.x - birdWidthBy2 < this.right
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

const displayRestart = function () {
	overlay.innerHTML = 'Game over! <div class="retry"></div>';
	overlay.style.display = 'block';

	const retryBtn = overlay.querySelector('.retry');
	retryBtn.addEventListener('click', () => {
		if (!playing) location.reload();
	});
};

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

const init = function () {
	const currWindowWidth = window.innerWidth;

	if (currWindowWidth >= 480) {
		// for larger screens

		windowWidth = 450;
		windowHeight = 700;
		skyHeight = 600;
		groundHeight = windowHeight - skyHeight;
		topCollisionDistance = 50;

		birdWidth = 60;
		birdHeight = 45;
		jumpHeight = 50;
		initialBirdPos = { x: 150, y: 200 };

		pipeWidth = 60;
		pipeSpeed = 2;
		maxPipeLen = 300;
		minPipeLen = 180;
		gapBetweenPipe = 180;
	} else {
		// for smaller screens

		windowWidth = 350;
		windowHeight = 544;
		skyHeight = 466;
		groundHeight = windowHeight - skyHeight;
		topCollisionDistance = 40;

		birdWidth = 45;
		birdHeight = 34;
		jumpHeight = 40;
		initialBirdPos = { x: 120, y: 180 };

		pipeWidth = 50;
		pipeSpeed = 2;
		maxPipeLen = 200;
		minPipeLen = 120;
		gapBetweenPipe = 140;
	}

	pipeDirectionToggle = true;
	playing = true;
	hitObstacle = false;
	bird = new Bird(initialBirdPos.x, initialBirdPos.y);
	pipes = initPipes();
	score = 0;

	// render game
	draw();
};

window.addEventListener('keyup', function (e) {
	if (e.code === 'Space' && playing) bird.jump();
});

jumpBtn.addEventListener('click', () => {
	if (playing) bird.jump();
});

// main

overlay.addEventListener('click', function () {
	setTimeout(() => {
		this.style.display = 'none';
		init();
	}, 300);
});
