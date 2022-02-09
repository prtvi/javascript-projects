"use strict";

// container-upload-image
const inputImageUpload = document.querySelector(".input-image-upload");

// container-display-image
const containerDisplayImage = document.querySelector(
  ".container-display-image"
);
const image = document.querySelector(".image");

// container-open-picker
const containerOpenPicker = document.querySelector(".container-open-picker");
const btnOpenColorPicker = document.querySelector(".btn-open-color-picker");
const resultColor = document.querySelector(".result-color");
const copied = document.querySelector(".copied");

// EVENT HANDLERS

btnOpenColorPicker.addEventListener("click", function (e) {
  if (!window.EyeDropper) {
    resultColor.textContent = "Your browser does not support the Color picker.";
    return;
  }

  const eyeDropper = new EyeDropper();
  eyeDropper
    .open()
    .then((result) => {
      resultColor.textContent = result.sRGBHex;
    })
    .catch((e) => {
      console.log(e);
    });
});

resultColor.addEventListener("click", function (e) {
  navigator.clipboard.writeText(resultColor.textContent);

  copied.classList.remove("hidden");

  setTimeout(function (e) {
    copied.classList.add("hidden");
  }, 2000);
});

inputImageUpload.addEventListener("change", function () {
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    containerOpenPicker.classList.add("container-open-picker-float-left");

    containerDisplayImage.classList.remove("hidden");
    image.src = reader.result;
  });

  reader.readAsDataURL(this.files[0]);
});
