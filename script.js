const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", () => {

document.body.classList.toggle("dark-mode");

if (document.body.classList.contains("dark-mode")) {
    themeButton.textContent = "☀️";
    localStorage.setItem("theme", "dark");
} else {
    themeButton.textContent = "🌙";
    localStorage.setItem("theme", "light");
}


});

/* Remember the user's theme */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
document.body.classList.add("dark-mode");
themeButton.textContent = "☀️";
}