'use strict';

const h1 = document.querySelector('h1');
const cells = document.querySelectorAll('.cell');

const btnUp = document.querySelector('.btn-up');
const btnDown = document.querySelector('.btn-down');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');

const grid = [
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
	[0, 0, 0, 0],
];

const colorMapping = new Map([
	[0, 'f0f8ff'],
	[2, 'f5f5dc'],
	[4, 'f6f6bd'],
	[8, 'f5f5a9'],
	[16, 'f4f490'],
	[32, 'f4f47b'],
	[64, 'f5c2b0'],
	[128, 'f5b49c'],
	[256, 'eaa48a'],
	[512, 'e18463'],
	[1024, 'dc6d45'],
	[2048, 'd85627'],
]);

const renderDisplay = function () {
	const gridFlattened = grid.flat(1);
	cells.forEach((cell, i) => {
		cell.textContent = gridFlattened[i];
		cell.style.backgroundColor = `#${colorMapping.get(gridFlattened[i])}`;
	});

	checkIfFull(gridFlattened) ? (playing = false) : (playing = true);

	if (checkIfWin(gridFlattened)) {
		playing = false;
		h1.textContent = 'You WON!!';
	}
};

const checkIfFull = function (gridFlattened) {
	return gridFlattened.every(num => num);
};

const checkIfWin = function (gridFlattened) {
	return gridFlattened.some(num => num === 2048);
};

const populateRandomCell = function (playing) {
	if (!playing) return;

	const index = Math.floor(Math.random() * 16);

	const rowIndex = Math.floor(index / 4);
	const columnIndex = index % 4;

	if (grid[rowIndex][columnIndex] === 0) grid[rowIndex][columnIndex] = 2;
	else populateRandomCell(playing);
};

const transpose = function (grid) {
	return grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
};

const reinitGrid = function (givenGrid) {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) grid[i][j] = givenGrid[i][j];
	}
};

const rightOperation = function (grid) {
	// push all non zero elements to the right
	for (let i = 0; i < grid.length; i++) {
		const row = grid[i];

		const nonZero = row.filter(n => n);
		const newRow = new Array(4 - nonZero.length).fill(0).concat(nonZero);

		grid[i] = newRow;
	}

	// combine rows right
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length - 1; j++) {
			const curr = j;
			const next = j + 1;
			if (
				grid[i][curr] === grid[i][next] || // adding same numbered cells
				grid[i][curr] === 0 || // check if either of the cell is numbered 0
				grid[i][next] === 0
			) {
				grid[i][next] = grid[i][next] + grid[i][curr];
				grid[i][curr] = 0;
			}
		}
	}

	return grid;
};

const leftOperation = function (grid) {
	// push all non zero elements to the left
	for (let i = 0; i < grid.length; i++) {
		const row = grid[i];

		const nonZero = row.filter(n => n);
		const newRow = nonZero.concat(new Array(4 - nonZero.length).fill(0));

		grid[i] = newRow;
	}

	// combine rows left
	for (let i = 0; i < grid.length; i++) {
		for (let j = grid[i].length - 1; j > 0; j--) {
			const curr = j;
			const next = j - 1;
			if (
				grid[i][curr] === grid[i][next] || // adding same numbered cells
				grid[i][curr] === 0 || // check if either of the cell is numbered 0
				grid[i][next] === 0
			) {
				grid[i][next] = grid[i][next] + grid[i][curr];
				grid[i][curr] = 0;
			}
		}
	}

	return grid;
};

const arrowRight = function () {
	const modifiedGrid = rightOperation(grid);
	reinitGrid(modifiedGrid);
	populateRandomCell(playing);
	renderDisplay();
};

const arrowLeft = function () {
	const modifiedGrid = leftOperation(grid);
	reinitGrid(modifiedGrid);
	populateRandomCell(playing);
	renderDisplay();
};

const arrowUp = function () {
	const gridT = transpose(grid);
	const modifiedGrid = leftOperation(gridT);
	const gridTT = transpose(modifiedGrid);

	reinitGrid(gridTT);
	populateRandomCell(playing);
	renderDisplay();
};

const arrowDown = function () {
	const gridT = transpose(grid);
	const modifiedGrid = rightOperation(gridT);
	const gridTT = transpose(modifiedGrid);

	reinitGrid(gridTT);
	populateRandomCell(playing);
	renderDisplay();
};

btnRight.addEventListener('click', arrowRight);
btnLeft.addEventListener('click', arrowLeft);
btnUp.addEventListener('click', arrowUp);
btnDown.addEventListener('click', arrowDown);

window.addEventListener('keyup', function (e) {
	if (e.key === 'ArrowUp') arrowUp();
	else if (e.key === 'ArrowDown') arrowDown();
	else if (e.key === 'ArrowLeft') arrowLeft();
	else if (e.key === 'ArrowRight') arrowRight();
});

// main

let playing = true;

populateRandomCell(playing);
populateRandomCell(playing);
renderDisplay();
