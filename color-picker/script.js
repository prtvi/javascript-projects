'use strict';

// container-upload-image
const inputImageUpload = document.querySelector('.input-image');

// container-display-image
const containerDisplayImage = document.querySelector(
	'.container-display-image'
);
const displayImage = document.querySelector('.display-image');

// container-open-picker
const containerOpenPicker = document.querySelector('.container-open-picker');
const btnOpenColorPicker = document.querySelector('.btn');

const colorBg = document.querySelector('.color-bg');
const resultColorHex = document.querySelector('.result-color.hex');
const resultColorRGB = document.querySelector('.result-color.rgb');
const copiedPopup = document.querySelector('.copied');

const hexToRGB = function (hex, alpha) {
	const r = parseInt(hex.slice(1, 3), 16),
		g = parseInt(hex.slice(3, 5), 16),
		b = parseInt(hex.slice(5, 7), 16);

	if (alpha) return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	else return `rgb(${r}, ${g}, ${b})`;
};

// EVENT HANDLERS

const openColorPicker = function (e) {
	if (!window.EyeDropper) {
		resultColorHex.textContent =
			'Your browser does not support the Color picker';
		return;
	}

	const eyeDropper = new EyeDropper();
	eyeDropper
		.open()
		.then(result => {
			colorBg.classList.remove('hidden');
			colorBg.style.backgroundColor = result.sRGBHex;
			resultColorHex.textContent = result.sRGBHex;
			resultColorRGB.textContent = hexToRGB(result.sRGBHex);
		})
		.catch(e => console.log(e));
};

const clickToCopy = function (e) {
	navigator.clipboard.writeText(this.textContent);

	copiedPopup.classList.remove('hidden');
	setTimeout(() => copiedPopup.classList.add('hidden'), 2000);
};

const uploadImg = function () {
	const reader = new FileReader();

	reader.addEventListener('load', function () {
		containerOpenPicker.style.float = 'right';
		containerOpenPicker.style.marginTop = '30px';
		containerOpenPicker.querySelector('.color-bg').style.width = '60%';

		containerDisplayImage.classList.remove('hidden');
		displayImage.src = reader.result;
	});

	reader.readAsDataURL(this.files[0]);
};

//

btnOpenColorPicker.addEventListener('click', openColorPicker);

resultColorHex.addEventListener('click', clickToCopy);
resultColorRGB.addEventListener('click', clickToCopy);

inputImageUpload.addEventListener('change', uploadImg);
