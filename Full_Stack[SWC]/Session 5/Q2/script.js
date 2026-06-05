let seconds = 0;
let timer = null;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

function updateDisplay() {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    display.textContent = `${hrs}:${mins}:${secs}`;
}

startBtn.addEventListener("click", () => {
    if (timer) return;

    timer = setInterval(() => {
        seconds++;
        updateDisplay();
    }, 1000);
});

pauseBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
});

resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    updateDisplay();
});

updateDisplay();