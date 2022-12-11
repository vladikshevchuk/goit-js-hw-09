const bodyRef = document.querySelector("body")
const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
let timerId = null;

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
      console.log(getRandomHexColor());
      bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
    
  startBtn.disabled = 'true';
});


stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
    
  startBtn.disabled = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}