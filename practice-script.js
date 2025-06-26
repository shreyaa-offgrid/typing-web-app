const practicePara = document.getElementById("practicePara");
const practiceInput = document.getElementById("practiceInput");
const practiceAccuracy = document.getElementById("practiceAccuracy");
const practiceWpm = document.getElementById("practiceWpm");
const practiceRetry = document.getElementById("practiceRetry");
const darkModeToggle = document.getElementById("darkModeToggle");

const wordList = [
  "the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog",
  "producer", "pine", "beauty", "proper", "tale", "control", "or", "resort", "rush", "prevent", "plan", "protein", "under", "demonstrate", "aide", "common", "origin", "golf", "approximately", "reduce", "love", "block", "clue", "dad", "besides", "childhood", "living", "field", "industrial", "minority", "then", "not", "concentration", "half", "dominate", "attend", "apple", "she", "grant", "succeed", "throw", "who", "intelligence", "miracle", "any", "predict", "color", "enemy", "ourselves", "government"

];


function getRandomWords(count) {
  const words = [];
  for (let i = 0; i < count; i++) {
    const randIndex = Math.floor(Math.random() * wordList.length);
    words.push(wordList[randIndex]);
  }
  return words.join(" ");
}


let startTime = null;
let intervalId = null;


function loadNewParagraph() {
  const newPara = getRandomWords(30);
  practicePara.innerText = newPara;
  practiceInput.value = "";
  practiceAccuracy.innerText = "0%";
  practiceWpm.innerText = "0";
  startTime = null;
  clearInterval(intervalId);
}


function updateMetrics() {
  const now = Date.now();

  if (lastTypedTime && now - lastTypedTime > 5000) {
    clearInterval(intervalId);
    intervalId = null;
    return;
  }

  const typed = practiceInput.value.trim();
  const target = practicePara.innerText.trim();

  const typedWords = typed.split(/\s+/);
  const targetWords = target.split(/\s+/);

  let correctWords = 0;
  for (let i = 0; i < typedWords.length; i++) {
    if (typedWords[i] === targetWords[i]) correctWords++;
  }

 const accuracy = (correctWords / targetWords.length) * 100;

  practiceAccuracy.innerText = `${accuracy.toFixed(1)}%`;

  const activeDuration = (lastTypedTime ? lastTypedTime : now) - startTime;
  const elapsedMinutes = activeDuration / 60000;
  const wpm = elapsedMinutes === 0 ? 0 : correctWords / elapsedMinutes;
  practiceWpm.innerText = Math.round(wpm);

}


let lastTypedTime = null;

practiceInput.addEventListener("input", () => {
  if (!startTime) {
    startTime = Date.now();
    intervalId = setInterval(updateMetrics, 1000);
  }
  lastTypedTime = Date.now(); 
});


practiceRetry.addEventListener("click", loadNewParagraph);

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("bg-dark");
  document.body.classList.toggle("text-light");
  const paraBox = document.getElementById("practicePara");
  paraBox.classList.toggle("bg-dark");
  paraBox.classList.toggle("text-light");
});


loadNewParagraph();

