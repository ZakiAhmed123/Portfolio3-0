const themes = [
  {
    id: "payne-gray-silver-mahogany",
    name: "Payne Gray & Mahogany",
    colors: [
      { name: "payneGray", hex: "#626675", onColor: "#FFFFFF" },
      { name: "silver", hex: "#D1D3CE", onColor: "#000000" },
      { name: "mahogany", hex: "#BB4500", onColor: "#FFFFFF" }
    ],
    webRoles: {
      background: "#D1D3CE",
      onBackground: "#000000",
      primary: "#626675",
      onPrimary: "#FFFFFF",
      secondary: "#BB4500",
      onSecondary: "#FFFFFF"
    }
  },
  {
    id: "persian-green-fire-red-seasalt",
    name: "Persian Green & Fire Red",
    colors: [
      { name: "persianGreen", hex: "#299F93", onColor: "#FFFFFF" },
      { name: "fireRed", hex: "#E12826", onColor: "#FFFFFF" },
      { name: "seasalt", hex: "#F5FAFA", onColor: "#000000" }
    ],
    webRoles: {
      background: "#F5FAFA",
      onBackground: "#000000",
      primary: "#299F93",
      onPrimary: "#FFFFFF",
      secondary: "#E12826",
      onSecondary: "#FFFFFF"
    }
  },
  {
    id: "ash-gray-dark-blue-earth",
    name: "Ash Gray & Dark Blue",
    colors: [
      { name: "ashGray", hex: "#BCD4CC", onColor: "#000000" },
      { name: "darkBlue", hex: "#002F45", onColor: "#FFFFFF" },
      { name: "earth", hex: "#E3A750", onColor: "#000000" }
    ],
    webRoles: {
      background: "#E3A750",
      onBackground: "#000000",
      primary: "#BCD4CC",
      onPrimary: "#000000",
      secondary: "#002F45",
      onSecondary: "#FFFFFF"
    }
  },
  {
    id: "rojo-dutch-white-xanthous",
    name: "Rojo & Xanthous",
    colors: [
      { name: "rojo", hex: "#E4281F", onColor: "#FFFFFF" },
      { name: "dutchWhite", hex: "#FCEEC9", onColor: "#000000" },
      { name: "xanthous", hex: "#FFBE54", onColor: "#000000" }
    ],
    webRoles: {
      background: "#FCEEC9",
      onBackground: "#000000",
      primary: "#FFBE54",
      onPrimary: "#000000",
      secondary: "#E4281F",
      onSecondary: "#FFFFFF"
    }
  },
  {
    id: "pear-indigo-ivory",
    name: "Pear & Indigo",
    colors: [
      { name: "pear", hex: "#CBD83B", onColor: "#000000" },
      { name: "indigo", hex: "#A88AED", onColor: "#000000" },
      { name: "ivory", hex: "#FFFEEC", onColor: "#000000" }
    ],
    webRoles: {
      background: "#FFFEEC",
      onBackground: "#000000",
      primary: "#CBD83B",
      onPrimary: "#000000",
      secondary: "#A88AED",
      onSecondary: "#000000"
    }
  },
  {
    id: "flame-butterscotch-caput-mortuum",
    name: "Flame & Butterscotch",
    colors: [
      { name: "flame", hex: "#BC552A", onColor: "#FFFFFF" },
      { name: "butterscotch", hex: "#DD9047", onColor: "#000000" },
      { name: "caputMortuum", hex: "#602314", onColor: "#FFFFFF" }
    ],
    webRoles: {
      background: "#DD9047",
      onBackground: "#000000",
      primary: "#BC552A",
      onPrimary: "#FFFFFF",
      secondary: "#602314",
      onSecondary: "#FFFFFF"
    }
  },
  {
    id: "khaki-bistre-vanilla",
    name: "Khaki & Vanilla",
    colors: [
      { name: "khaki", hex: "#BEB9A9", onColor: "#000000" },
      { name: "bistre", hex: "#472D1F", onColor: "#FFFFFF" },
      { name: "vanilla", hex: "#FFEFB5", onColor: "#000000" }
    ],
    webRoles: {
      background: "#FFEFB5",
      onBackground: "#000000",
      primary: "#BEB9A9",
      onPrimary: "#000000",
      secondary: "#472D1F",
      onSecondary: "#FFFFFF"
    }
  },
  {
    id: "champagne-light-blue-steel-blue",
    name: "Champagne & Steel Blue",
    colors: [
      { name: "champagne", hex: "#FFE9D2", onColor: "#000000" },
      { name: "lightBlue", hex: "#ADD4E5", onColor: "#000000" },
      { name: "steelBlue", hex: "#017CC3", onColor: "#FFFFFF" }
    ],
    webRoles: {
      background: "#FFE9D2",
      onBackground: "#000000",
      primary: "#ADD4E5",
      onPrimary: "#000000",
      secondary: "#017CC3",
      onSecondary: "#FFFFFF"
    }
  }
];

const themeToggle = document.getElementById("theme-toggle");
const themePanel = document.getElementById("theme-panel");
const closeThemePanel = document.getElementById("close-theme-panel");
const themeGrid = document.getElementById("theme-grid");

function applyTheme(theme) {
  const root = document.documentElement;

  root.style.setProperty("--background", theme.webRoles.background);
  root.style.setProperty("--onBackground", theme.webRoles.onBackground);
  root.style.setProperty("--primary", theme.webRoles.primary);
  root.style.setProperty("--onPrimary", theme.webRoles.onPrimary);
  root.style.setProperty("--secondary", theme.webRoles.secondary);
  root.style.setProperty("--onSecondary", theme.webRoles.onSecondary);

  root.style.setProperty("--peach", theme.webRoles.primary);

  updateActiveTheme(theme.id);

  localStorage.setItem("selectedTheme", theme.id);
}

function updateActiveTheme(themeId) {
  document.querySelectorAll(".theme-swatch").forEach((swatch) => {
    swatch.classList.remove("active");
    if (swatch.getAttribute("data-theme-id") === themeId) {
      swatch.classList.add("active");
    }
  });
}

function createThemeGrid() {
  themeGrid.innerHTML = "";
  themes.forEach((theme) => {
    const swatch = document.createElement("div");
    swatch.className = "theme-swatch";
    swatch.setAttribute("data-theme-id", theme.id);
    swatch.title = theme.name;

    const colorPreview = document.createElement("div");
    colorPreview.className = "theme-preview-colors";

    theme.colors.forEach((color) => {
      const colorDot = document.createElement("div");
      colorDot.className = "color-dot";
      colorDot.style.backgroundColor = color.hex;
      colorPreview.appendChild(colorDot);
    });

    const themeName = document.createElement("div");
    themeName.className = "theme-name";
    themeName.textContent = theme.name;

    swatch.appendChild(colorPreview);
    swatch.appendChild(themeName);

    swatch.addEventListener("click", () => applyTheme(theme));
    themeGrid.appendChild(swatch);
  });

  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    const theme = themes.find((t) => t.id === savedTheme);
    if (theme) {
      applyTheme(theme);
    }
  } else {
    applyTheme(themes[0]);
  }
}

themeToggle.addEventListener("click", () => {
  themePanel.classList.toggle("active");
});

closeThemePanel.addEventListener("click", () => {
  themePanel.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (
    !themePanel.contains(e.target) &&
    !themeToggle.contains(e.target) &&
    themePanel.classList.contains("active")
  ) {
    themePanel.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", createThemeGrid);
