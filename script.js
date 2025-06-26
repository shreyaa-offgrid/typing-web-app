const shortParas = [
  "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
  "The only people for me are the mad ones, the ones who are mad to live, mad to talk, mad to be saved, desirous of everything at the same time, the ones who never yawn or say a commonplace thing, but burn, burn, burn like fabulous yellow roman candles exploding like spiders across the stars.",
  "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration. I will face my fear. I will permit it to pass over me and through me. And when it has gone past I will turn the inner eye to see its path. Where the fear has gone there will be nothing. Only I will remain.",
  "To be, or not to be: that is the question:Whether 'tis nobler in the mind to suffer. The slings and arrows of outrageous fortune,Or to take arms against a sea of troubles,And by opposing end them. To die: to sleep…",
  "I am an invisible man. No, I am not a spook like those who haunted Edgar Allan Poe; nor am I one of your Hollywood-movie ectoplasms. I am a man of substance, of flesh and bone, fiber and liquids—and I might even be said to possess a mind. I am invisible, understand, simply because people refuse to see me.",
  "It was a dark and stormy night; the rain fell in torrents, except at occasional intervals, when it was checked by a violent gust of wind which swept up the streets (for it is in London that our scene lies), rattling along the house-tops, and fiercely agitating the scanty flame of the lamps that struggled against the darkness.",
  "Mother died today. Or maybe yesterday, I don't know. I had a telegram from the home: 'Mother passed away. Funeral tomorrow. Yours sincerely. That doesn't mean anything. It may have been yesterday.",
  "It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters.",
  "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed in his bed into a gigantic insect. He was lying on his hard, as it were armor-plated, back and when he lifted his head a little he could see his dome-like brown belly divided into stiff arched segments on top of which the bed quilt could hardly keep in position and was about to slide off completely. His numerous legs, which were pitifully thin compared to the rest of his bulk, waved helplessly before his eyes.",
  "You don't know about me without you have read a book by the name of The Adventures of Tom Sawyer; but that ain't no matter. That book was made by Mr. Mark Twain, and he told the truth, mainly. There was things which he stretched, but mainly he told the truth. That is nothing. I never seen anybody but lied one time or another, without it was Aunt Polly, or the widow, or maybe Mary. Aunt Polly - Tom's Aunt Polly, she is - and Mary, and the Widow Douglas is all told about in that book, which is mostly a true book, with some stretchers, as I said before.",
  "Troops went by the house and down the road and the dust they raised powdered the leaves of the trees. The trunks of the trees too were dusty and the leaves fell early that year and we saw the troops marching along the road and the dust rising and leaves, stirred by the breeze, falling and the soldiers marching and afterward the road bare and white except for the leaves.",
  "But I did not know how to make my apology. The words that had strung themselves so easily to make a blunder in the drawing room would not come now that I wished the blunder remedied.  I stood there below her window, tongue-tied and ashamed.  Suddenly I saw her turn and stretch behind her, and then she leant forward once again and threw something at me from the window.  It struck me on the cheek and fell to the ground.  I stooped to pick it up.  It was one of the flowers from her bowl, an autumn crocus.",
  "What they do not comprehend is man's helplessness. I am weak, small, and of no consequence to the universe.  It does not notice me; I live on unseen.  But why is that bad?  Isn't it better that way?  Whom the gods notice they destroy.  But small...and you will escape the jealousy of the great.",
  "They picked a way among the trees, and their ponies plodded along, carefully avoiding the many writhing and interlacing roots.  There was no undergrowth.  The ground was rising steadily, and as they went forward it seemed that the trees became taller, darker, and thicker.",
];
const inputBox = document.getElementById("inputBox");
const paraDisplay = document.getElementById("para");
const btnChar100 = document.getElementById("btnChar100");
const btnChar200 = document.getElementById("btnChar200");

let charLimit = 100;

function getRandomPara() {
  const randomIndex = Math.floor(Math.random() * shortParas.length);
  const fullPara = shortParas[randomIndex];

  let trimmed = fullPara.slice(0, charLimit);

  if (fullPara.length > charLimit && fullPara[charLimit] !== " ") {
    const lastSpace = trimmed.lastIndexOf(" ");
    if (lastSpace !== -1) {
      trimmed = trimmed.slice(0, lastSpace);
    }
  }

  return trimmed;
}

let para = getRandomPara();
paraDisplay.innerText = para;

const avgSpeedEl = document.querySelector("#avgSpeed");
const topSpeedEl = document.querySelector("#topSpeed");
const accuracyEl = document.querySelector("#accuracy");

let startTime = null;
let timerInterval = null;

let totalTests = 0;
let totalWPM = 0;
let topWPM = 0;

btnChar100.addEventListener("click", () => {
  charLimit = 100;
  btnChar100.classList.add("active");
  btnChar200.classList.remove("active");
  resetTest();
});

btnChar200.addEventListener("click", () => {
  charLimit = 200;
  btnChar200.classList.add("active");
  btnChar100.classList.remove("active");
  resetTest();
});

const gaugeOpts = {
  angle: 0.15,
  lineWidth: 0.44,
  radiusScale: 1,
  pointer: {
    length: 0.6,
    strokeWidth: 0.035,
    color: "#696969",
  },
  limitMax: false,
  limitMin: false,
  colorStart: "#6FADCF",
  colorStop: "#8FC0DA",
  strokeColor: "#E0E0E0",
  generateGradient: true,
  highDpiSupport: true,
  staticZones: [
    { strokeStyle: "#F03E3E", min: 0, max: 30 },
    { strokeStyle: "#FFDD00", min: 30, max: 60 },
    { strokeStyle: "#30B32D", min: 60, max: 120 },
  ],
};

const gaugeTarget = document.getElementById("gauge");
const gauge = new Gauge(gaugeTarget).setOptions(gaugeOpts);
gauge.maxValue = 120;
gauge.setMinValue(0);
gauge.animationSpeed = 32;
gauge.set(0);

inputBox.addEventListener("input", () => {
  let typed = inputBox.value;
  if (typed.length > para.length) {
    inputBox.value = inputBox.value.slice(0, para.length);
  }

  if (!startTime) {
    startTime = new Date();
    timerInterval = setInterval(updateMetrics, 1000);
  }

  if (typed.length >= para.length) {
    clearInterval(timerInterval);
    updateMetrics(true);
    inputBox.disabled = true;
  }
});

function countCorrectChars(input, reference) {
  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === reference[i]) correct++;
  }
  return correct;
}

function countCorrectWords(input, reference) {
  const inputWords = input.trim().split(/\s+/);
  const referenceWords = reference.trim().split(/\s+/);
  let correct = 0;
  for (let i = 0; i < inputWords.length; i++) {
    if (inputWords[i] === referenceWords[i]) {
      correct++;
    }
  }
  return correct;
}
function updateMetrics(final = false) {
  const typed = inputBox.value;
  const now = new Date();

  const correctChars = countCorrectChars(typed, para);
  const elapsedTime = (now - startTime) / 1000 / 60;
  const wpm = elapsedTime === 0 ? 0 : correctChars / 5 / elapsedTime;

  const totalWords = typed.trim().split(/\s+/).length;
  const correctWords = countCorrectWords(typed, para);
  const accuracy = totalWords === 0 ? 0 : (correctWords / totalWords) * 100;

  accuracyEl.innerText = accuracy.toFixed(1) + "%";
  gauge.set(wpm);
  document.getElementById("currentWpmText").innerText = `${wpm.toFixed(1)} WPM`;
  if (final) {
    totalTests++;
    totalWPM += wpm;
    if (wpm > topWPM) topWPM = wpm;

    avgSpeedEl.innerText = (totalWPM / totalTests).toFixed(1);
    topSpeedEl.innerText = topWPM.toFixed(1);
  }
}


const retryBtn = document.getElementById("retryBtn");
retryBtn.addEventListener("click", () => {
  para = getRandomPara();
  inputBox.value = "";
  inputBox.disabled = false;
  inputBox.focus();
  startTime = null;
  clearInterval(timerInterval);
  accuracyEl.innerText = "0%";
  gauge.set(0);
  paraDisplay.innerText = para;
});


const darkModeBtn = document.getElementById("darkModeToggle");
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    darkModeBtn.innerText = "Light Mode";
    darkModeBtn.classList.replace("btn-dark", "btn-light");
  } else {
    darkModeBtn.innerText = "Dark Mode";
    darkModeBtn.classList.replace("btn-light", "btn-dark");
  }
});
