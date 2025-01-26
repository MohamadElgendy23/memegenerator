document.querySelector("#app").innerHTML = `
  <div class="flex justify-center flex-col">
    <nav class="relative flex w-full flex-wrap items-center justify-between bg-neutral-700 dark:bg-white py-2 shadow-dark-mild lg:py-4">
      <div class="flex w-full flex-wrap items-center justify-between px-3">
        <div class="ms-2">
          <a class="text-3xl text-black dark:text-white flex items-center gap-2" href="#"><img src="https://i.pinimg.com/originals/32/99/55/329955c23c1ccb6623866cd15036ce3f.png" alt="logo" class="w-15"></img>Meme Generator</a>
        </div>
        <button id="theme-toggle" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md dark:text-black">Toggle Dark Mode</button>
      </div>
    </nav>
    <div class="ml-100">
      <h1 class="text-5xl mt-15 mb-10">Meme Generator</h1>
      <hr class="w-3/4">
      
    </div>
  </div>
`;

const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

themeToggle.addEventListener("click", () => {
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
