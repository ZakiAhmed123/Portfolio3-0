const colors = [
  "#FFF3E1",
  "#FFE4CC",
  "#FFD9B3",
  "#FFCFA6",
  "#F0E68C",
  "#F5DEB3",
  "#FFE4B5",
  "#FFDAB9",
  "#FFEFD5",
  "#C8B8FF",
  "#D0BFFF",
  "#E0D5FF",
  "#D0E8E8",
  "#C0E8E8",
  "#B0E0E6",
  "#ADD8E6",
  "#87CEEB",
  "#87CEFA",
  "#B0E0E6",
  "#E0FFFF",
  "#F0FFFF",
  "#E0FFE0",
  "#D0FFD0",
  "#C0FFC0",
  "#98FB98",
  "#90EE90",
  "#FFB6C1",
  "#FFC0CB",
  "#FFD0DC",
];

const colorPickerToggle = document.getElementById("color-picker-toggle");
const colorPickerOverlay = document.getElementById("color-picker-overlay");
const closePicker = document.getElementById("close-picker");
const colorGrid = document.getElementById("color-grid");
const colorInput = document.getElementById("color-input");
const currentColorDisplay = document.getElementById("current-color-display");

let isEyeDropperActive = false;
let pickedElement = null;

function rgbToHex(rgb) {
  if (!rgb) return "#000000";

  rgb = rgb.trim();

  if (rgb.startsWith("#")) {
    return rgb;
  }

  const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    return "#" + [r, g, b].map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("").toUpperCase();
  }

  return "#000000";
}

function updatePrimaryColor(color) {
  document.documentElement.style.setProperty("--peach", color);
  currentColorDisplay.style.background = color;
  colorInput.value = color.toUpperCase();

  document.querySelectorAll(".color-swatch").forEach((swatch) => {
    swatch.classList.remove("active");
    if (swatch.getAttribute("data-color").toUpperCase() === color.toUpperCase()) {
      swatch.classList.add("active");
    }
  });
}

function createColorGrid() {
  colorGrid.innerHTML = "";
  colors.forEach((color) => {
    const swatch = document.createElement("div");
    swatch.className = "color-swatch";
    swatch.setAttribute("data-color", color);
    swatch.style.background = color;
    swatch.addEventListener("click", () => updatePrimaryColor(color));
    colorGrid.appendChild(swatch);
  });

  const currentColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--peach")
    .trim();
  updatePrimaryColor(currentColor);
}

function activateEyeDropper() {
  isEyeDropperActive = !isEyeDropperActive;
  const eyeDropperButton = document.getElementById("eye-dropper-btn");

  if (isEyeDropperActive) {
    document.body.style.cursor = "crosshair";
    document.body.classList.add("eye-dropper-active");
    if (eyeDropperButton) eyeDropperButton.classList.add("active");

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("click", onElementClick);
  } else {
    deactivateEyeDropper();
  }
}

function deactivateEyeDropper() {
  isEyeDropperActive = false;
  document.body.style.cursor = "auto";
  document.body.classList.remove("eye-dropper-active");
  const eyeDropperButton = document.getElementById("eye-dropper-btn");
  if (eyeDropperButton) eyeDropperButton.classList.remove("active");

  if (pickedElement) {
    pickedElement.classList.remove("color-picked");
    pickedElement = null;
  }

  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("click", onElementClick);
}

function onMouseMove(e) {
  if (!isEyeDropperActive) return;

  if (pickedElement) {
    pickedElement.classList.remove("color-picked");
  }

  const element = document.elementFromPoint(e.clientX, e.clientY);

  if (element && element !== document.body && element !== document.documentElement) {
    pickedElement = element;
    element.classList.add("color-picked");

    const backgroundColor = window.getComputedStyle(element).backgroundColor;
    const color = rgbToHex(backgroundColor);
    currentColorDisplay.style.background = color;
  }
}

function onElementClick(e) {
  if (!isEyeDropperActive) return;

  e.preventDefault();
  e.stopPropagation();

  const element = document.elementFromPoint(e.clientX, e.clientY);
  if (element && element !== document.body && element !== document.documentElement) {
    const backgroundColor = window.getComputedStyle(element).backgroundColor;
    const color = rgbToHex(backgroundColor);
    updatePrimaryColor(color);
  }

  deactivateEyeDropper();
}

colorPickerToggle.addEventListener("click", () => {
  colorPickerOverlay.classList.toggle("active");
});

closePicker.addEventListener("click", () => {
  colorPickerOverlay.classList.remove("active");
  if (isEyeDropperActive) {
    deactivateEyeDropper();
  }
});

colorInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let inputColor = colorInput.value.trim();
    if (!inputColor.startsWith("#")) {
      inputColor = "#" + inputColor;
    }

    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(inputColor)) {
      updatePrimaryColor(inputColor);
    } else {
      colorInput.style.borderColor = "red";
      setTimeout(() => {
        colorInput.style.borderColor = "";
      }, 1500);
    }
  }
});

document.addEventListener("DOMContentLoaded", createColorGrid);

const eyeDropperButton = document.getElementById("eye-dropper-btn");
if (eyeDropperButton) {
  eyeDropperButton.addEventListener("click", activateEyeDropper);
}
