'use strict';

const main = document.querySelector('.main');
const ground = document.querySelector('.ground');
const groundOffset = ground.offsetTop;

const windowWidth = 450;
const windowHeight = 700;
const skyHeight = 600;
const groundHeight = 100;

const maxPipeLen = 250;
const minPipeLen = 100;

const gapBetweenPipe = 200;

class Bird {
	constructor(x, y) {
		this.birdDom = document.querySelector('.bird');
		this.birdDom.style.left = `${x}px`;

		this.height = 45;
		this.width = 60;

		this.x = x; // left
		this.y = y; // top
		this.right = this.x + this.width;
		this.bottom = this.y + this.height;

		this.speed = 1.2;
		this.gravity = 0.05;
	}

	jump() {
		// check for top of screen for collision
		if (this.y < 50) return;

		this.y -= 50;

		this.bottom = this.y + this.height;
		this.speed = 1.2; // reset speed on jump
	}

	fall() {
		this.speed += this.gravity;
		this.y += this.speed;
		this.bottom = this.y + this.height;

		// if bird hits the bottom
		if (this.bottom >= groundOffset) {
			playing = false;
			this.y = groundOffset - this.height;
		}
	}

	display() {
		this.birdDom.style.top = `${this.y}px`;
	}
}

class Pipe {
	constructor(x, y, height) {
		this.height = height;
		this.width = 60;

		this.x = x; // left
		this.y = y; // top
		this.right = this.x + this.width;
		this.bottom = this.y + this.height;

		this.pipeDom = this.initPipeDom();
	}

	initPipeDom() {
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
		this.x -= 1;
		this.right = this.x + this.width;
	}

	isOut() {
		return this.right === 0;
	}

	isColliding(bird) {
		const birdCenter = {
			x: (bird.right - bird.x) / 2 + bird.x,
			y: (bird.bottom - bird.y) / 2 + bird.y,
		};

		// TODO
		if (this.y === 0) {
			if (birdCenter.x + 25 > this.x && birdCenter.y < this.bottom + 25) {
				console.log('collided');
				playing = false;
			}
		} else {
			if (birdCenter.x + 25 > this.x && birdCenter.y + 25 > this.y) {
				console.log('collided bottom');
				playing = false;
			}
		}
	}

	display() {
		this.pipeDom.style.left = `${this.x}px`;
	}
}

const initPipes = function () {
	let x = windowWidth;
	const pipes = [];

	for (let i = 0; i < 3; i++) {
		const height = Math.random() * (maxPipeLen - minPipeLen) + minPipeLen;

		let pipe;
		if (i % 2 === 0)
			pipe = new Pipe(x, windowHeight - groundHeight - height, height);
		else pipe = new Pipe(x, 0, height);

		pipes.push(pipe);
		x += gapBetweenPipe;
	}

	return pipes;
};

const initPipe = function (x) {
	const height = Math.random() * (maxPipeLen - minPipeLen) + minPipeLen;

	let pipe;
	if (Math.random() > 0.5)
		pipe = new Pipe(x, windowHeight - groundHeight - height, height);
	else pipe = new Pipe(x, 0, height);

	return pipe;
};

window.addEventListener('keyup', function (e) {
	if (e.code === 'Space' && playing) bird.jump();
});

let playing = true;
const bird = new Bird(100, 200);
let pipes = initPipes();

const draw = function () {
	bird.display();
	bird.fall();

	pipes.forEach((pipe, i) => {
		pipe.display();
		pipe.translateX();

		main.appendChild(pipe.pipeDom);

		if (pipe.isOut()) {
			main.removeChild(pipe.pipeDom);
			pipes.splice(i, 1);
		}

		pipe.isColliding(bird);
	});

	if (pipes.length === 2)
		pipes.push(initPipe(pipes[pipes.length - 1].x + gapBetweenPipe));

	if (playing) window.requestAnimationFrame(draw);
};

draw();
