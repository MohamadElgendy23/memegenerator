import "./style.css";
import axios from "axios";

const baseURL = "https://api.imgflip.com";
const serverURL = "http://localhost:3000/meme";
document.querySelector("#app").innerHTML = `
  <div class="flex justify-center flex-col dark:bg-neutral-800">
    <nav class="relative flex w-full flex-wrap items-center justify-between dark:bg-neutral-600 bg-amber-50 py-2 shadow-dark-mild lg:py-4">
      <div class="flex w-full flex-wrap items-center justify-between px-3">
        <div class="ms-2">
          <a class="text-3xl text-black dark:text-white flex items-center gap-2" href="#"><img src="https://i.pinimg.com/originals/32/99/55/329955c23c1ccb6623866cd15036ce3f.png" alt="logo" class="w-15"></img>Meme Generator</a>
        </div>
        <button id="theme-toggle" class="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-md text-black dark:text-white">Toggle Dark Mode</button>
      </div>
    </nav>
    <div class="ml-100 min-h-screen dark:text-white">
      <div class="flex items-center justify-between w-3/4">
        <h1 class="text-5xl mt-15 mb-10 font-bold dark:text-white">Meme Generator</h1>
        <input id="search-input" type="text" class="p-2 rounded-sm outline-solid text-sm w-1/5" placeholder="Search meme..."></input>
      </div>
      <hr class="w-3/4">
      <div class="flex items-center gap-12 mt-8 max-h-80">
        <div class="w-3/8 gap-3">
          <div class="gap-2 flex flex-col">
            <label class="text-xl">Meme</label>
            <select id="memes-select" class="p-2 rounded-sm outline-solid"></select>
          </div>
          <div class="gap-2 flex flex-col mt-5">
            <label htmlFor="top-text" class="text-xl">Top Text</label>
            <input id="top-text" type="text" value="Top Text" class="p-2 rounded-sm outline-solid"></input>
          </div>
          <div class="gap-2 flex flex-col mt-5">
            <label htmlFor="bottom-text" class="text-xl">Bottom Text</label>
            <input id="bottom-text" type="text" value="Bottom Text" class="p-2 rounded-sm outline-solid"></input>
          </div>
          <button class="bg-blue-500 text-black dark:text-white mt-5 pt-3 pb-3 pl-7 pr-7 rounded-sm text-xl cursor-pointer" id="generate-btn">Generate</button>
        </div>
        <div id="meme-image" class="flex flex-col justify-center items-center mt-18">
        </div>
      </div>
      <div class="mt-10">
        <h2 class="text-4xl mb-8">Create Your Own Meme</h2>
        <hr class="w-3/4">
        <div id="memes-container" class="grid grid-cols-10 mt-10 w-350 gap-10"></div>
      </div>
    </div>
  </div>
`;

// useful variables
const themeToggle = document.getElementById("theme-toggle");
const searchInput = document.getElementById("search-input");
const memesSelect = document.getElementById("memes-select");
const topTextInput = document.getElementById("top-text");
const bottomTextInput = document.getElementById("bottom-text");
const generateBtn = document.getElementById("generate-btn");
const memeImage = document.getElementById("meme-image");
const memesContainer = document.getElementById("memes-container");

// add event listener for theme toggle
themeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  html.classList.toggle("dark");

  // change the toggle text
  themeToggle.textContent = html.classList.contains("dark")
    ? "Toggle Light Mode"
    : "Toggle Dark Mode";

  // Optionally, store the theme in local storage
  localStorage.setItem(
    "theme",
    html.classList.contains("dark") ? "dark" : "light"
  );
});

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value;
  searchMemes(searchValue).then((memes) => {
    renderMemes(memes);
  });
});

generateBtn.addEventListener("click", () =>
  generateMeme(memesSelect.value, "generate").then((memeImageURL) => {
    memeImage.innerHTML = `<img src="${memeImageURL}" alt="meme-image" class="max-h-100"></img>`;
  })
);

function fillSelectOptions(memeEntries) {
  memeEntries.forEach((entry) => {
    const optionElement = document.createElement("option");
    optionElement.value = entry[0];
    optionElement.text = entry[1];
    memesSelect.appendChild(optionElement);
  });
}

// mode === generate => generate button, mode === create => div click
async function generateMeme(memeId, mode) {
  let topText;
  let bottomText;
  if (mode === "generate") {
    topText = topTextInput.value;
    bottomText = bottomTextInput.value;
  }
  if (mode === "create") {
    topText = "Top Text";
    bottomText = "Bottom Text";
  }

  const response = await axios.post(`${serverURL}/generate`, {
    template_id: memeId,
    username: "MohamadElgendy",
    password: "Solomon_23",
    text0: topText,
    text1: bottomText,
  });
  const memeImageURL = await response.data.url;
  return memeImageURL;
}

function renderMemes(memes) {
  memesContainer.innerHTML = "";
  memes.forEach((meme) => {
    const memeContainer = document.createElement("div");
    memeContainer.setAttribute(
      "class",
      "flex items-center flex-col justfiy-center w-30 text-center cursor-pointer"
    );
    memeContainer.addEventListener("click", () =>
      generateMeme(meme.id, "create").then((memeImageURL) => {
        memeImage.innerHTML = `<img src="${memeImageURL}" alt="meme-image" class="max-h-100"></img>`;
      })
    );

    const innerMemeContainer = document.createElement("div");
    innerMemeContainer.setAttribute(
      "class",
      "flex items-center flex-col justify-center"
    );

    const memeImage = document.createElement("img");
    memeImage.src = meme.url;
    memeImage.setAttribute("class", "w-100");

    innerMemeContainer.appendChild(memeImage);

    const memeNameContainer = document.createElement("div");
    memeNameContainer.innerHTML = meme.name;
    memeNameContainer.setAttribute("class", "text-blue-400 mt-3 text-xl");

    memeContainer.append(innerMemeContainer, memeNameContainer);
    memesContainer.appendChild(memeContainer);
  });
}

function initializeApp() {
  getMemes().then((memes) => {
    fillSelectOptions(memes.map((meme) => [meme.id, meme.name]));
    renderMemes(memes);
  });
  // initial meme
  generateMeme(181913649, "generate").then((memeImageURL) => {
    memeImage.innerHTML = `<img src="${memeImageURL}" alt="meme-image" class="max-h-100"></img>`;
  });
}

async function searchMemes(query) {
  const response = await axios.post(`${serverURL}/search`, {
    username: "MohamadElgendy",
    password: "Solomon_23",
    query: query,
  });
  const searchData = await response.searchData;
  return searchData;
}

async function getMemes() {
  const response = await axios.get(`${baseURL}/get_memes`);
  const memes = await response.data.data.memes;
  return memes;
}

initializeApp();
