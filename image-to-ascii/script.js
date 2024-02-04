'use strict';

// https://coderwall.com/p/jzdmdq/loading-image-from-local-file-into-javascript-and-getting-pixel-data
// https://stackoverflow.com/questions/19262141/resize-image-with-javascript-canvas-smoothly

const density = ' _.,-=+:;cba!?0123456789$W#@Ñ';

const outputDiv = document.querySelector('.output');
const inputDiv = document.querySelector('.input');
const printBtn = document.querySelector('#print');
const canvas = document.getElementById('canvas');
const inputInfoText = document.querySelector('.input-info-text');

canvas.classList.add('hidden');
printBtn.classList.add('hidden');
outputDiv.classList.add('hidden');

printBtn.addEventListener('click', () => window.print());

document.getElementById('input-image').addEventListener('input', function (e) {
	const tgt = e.target || window.event.srcElement;
	const files = tgt.files;

	if (FileReader && files && files.length) {
		const fileReader = new FileReader();
		fileReader.onload = () => showImage(fileReader);
		fileReader.readAsDataURL(files[0]);
	}
});

function showImage(fileReader) {
	const ctx = canvas.getContext('2d');
	const img = new Image();

	img.src = fileReader.result;

	img.onload = () => {
		canvas.width = img.width;
		canvas.height = img.height;

		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

		displayAsciiForm(
			img,
			loadPixels(
				img,
				Array.from(ctx.getImageData(0, 0, img.width, img.height).data)
			)
		);

		printBtn.classList.remove('hidden');
		canvas.classList.remove('hidden');
		outputDiv.classList.remove('hidden');
		inputInfoText.classList.add('hidden');
		inputDiv.style.marginTop = `200px`;
	};
}

function loadPixels(image, imageData) {
	const imagePixelData = [];
	let count = 0;

	for (let j = 0; j < image.height; j++) {
		const row = [];
		for (let i = 0; i < image.width; i++) {
			row.push(imageData.slice(count, count + 4));
			count += 4;
		}

		imagePixelData.push(row);
	}

	return imagePixelData;
}

function displayAsciiForm(image, imagePixelData) {
	outputDiv.innerHTML = '';

	for (let j = 0; j < image.height; j++) {
		let row = '';
		for (let i = 0; i < image.width; i++) {
			const char = getRelativeChar(imagePixelData[j][i]);

			if (char === ' ') row += '&nbsp;';
			else row += char;
		}

		const p = document.createElement('p');
		p.innerHTML = row;

		outputDiv.appendChild(p);
	}
}

function getRelativeChar(pixel) {
	const pixelAvg = (pixel[0] + pixel[1] + pixel[2]) / 3;

	if (pixelAvg === 0) return density[density.length - 1];

	return density[Math.floor(density.length * (1 - pixelAvg / 255))];
}

/*
// image onload for resizing
  const height = img.height;
  const width = img.width;

  if (height > 500 || width > 500) {
    alert('Height and Width must not exceed 500px.');
    return;
  }

  if (resize) {
    // step 1 - resize to 50%
    const oc = document.createElement('canvas');
    const octx = oc.getContext('2d');
    oc.width = img.width * 0.5;
    oc.height = img.height * 0.5;
    octx.drawImage(img, 0, 0, oc.width, oc.height);
    // step 2
    octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);
    // step 3, resize to final size
    ctx.drawImage(
      oc,
      0,
      0,
      oc.width * 0.5,
      oc.height * 0.5,
      0,
      0,
      canvas.width,
      canvas.height
      );
    } else {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
*/
