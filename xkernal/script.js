// --- DOM ELEMENTS ---
const levelDisplay = document.getElementById('level-display');
const scoreDisplay = document.getElementById('score-display');
const livesDisplay = document.getElementById('lives-display');
const timerDisplay = document.getElementById('timer-display');
const statusDisplay = document.getElementById('status-display');
const problemDescription = document.getElementById('problem-description');
const codeEditor = document.getElementById('code-editor');
const defuseButton = document.getElementById('defuse-button');
const bombSvg = document.getElementById('bomb-svg');
const modalContainer = document.getElementById('modal-container');
// Main Modal
const mainModal = document.getElementById('main-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalButtons = document.getElementById('modal-buttons');
// Interstitial Modal
const interstitialModal = document.getElementById('interstitial-modal');
const interstitialMessage = document.getElementById('interstitial-message');
const gambleTimeBtn = document.getElementById('gamble-time-btn');
const gambleLifeBtn = document.getElementById('gamble-life-btn');
const continueBtn = document.getElementById('continue-btn');

const explosionContainer = document.getElementById('explosion-container');

// --- GAME LEVELS DATA (25 LEVELS) ---
const levels = [
    // Levels 1-25 are the same as v2
    { problem: "This function should return the sum of 'a' and 'b'.", buggyCode: "function sum(a, b) {\n  return a - b;\n}", correctCode: "function sum(a, b) {\n  return a + b;\n}", time: 45 },
    { problem: "This function should return `true` if the number is even.", buggyCode: "function isEven(num) {\n  return num % 2 === 1;\n}", correctCode: "function isEven(num) {\n  return num % 2 === 0;\n}", time: 45 },
    { problem: "This loop should print numbers from 0 to 4. Check the loop condition.", buggyCode: "for (let i = 0; i < 4; i++) {\n  console.log(i);\n}", correctCode: "for (let i = 0; i <= 4; i++) {\n  console.log(i);\n}", time: 50 },
    { problem: "This function should get the last element of an array.", buggyCode: "function getLast(arr) {\n  return arr[arr.length];\n}", correctCode: "function getLast(arr) {\n  return arr[arr.length - 1];\n}", time: 50 },
    { problem: "Find the missing `return` statement.", buggyCode: "function getGreeting(name) {\n  `Hello, ${name}`;\n}", correctCode: "function getGreeting(name) {\n  return `Hello, ${name}`;\n}", time: 40 },
    { problem: "This function should return the object's property. The key is a variable.", buggyCode: "function getProp(obj, key) {\n  return obj.key;\n}", correctCode: "function getProp(obj, key) {\n  return obj[key];\n}", time: 60 },
    { problem: "This function should concatenate two arrays.", buggyCode: "function combine(arr1, arr2) {\n  arr1.push(arr2);\n  return arr1;\n}", correctCode: "function combine(arr1, arr2) {\n  return arr1.concat(arr2);\n}", time: 60 },
    { problem: "This should create a new array with doubled values. It's modifying the original instead.", buggyCode: "function double(numbers) {\n  for(let i=0; i<numbers.length; i++){\n    numbers[i] = numbers[i] * 2;\n  }\n  return numbers;\n}", correctCode: "function double(numbers) {\n  return numbers.map(n => n * 2);\n}", time: 70 },
    { problem: "This function is comparing a number and a string. Coerce the type.", buggyCode: "function checkAnswer(num) {\n  const answer = '42';\n  return num == answer;\n}", correctCode: "function checkAnswer(num) {\n  const answer = '42';\n  return num === parseInt(answer);\n}", time: 65 },
    { problem: "This is an infinite loop. Spot the error.", buggyCode: "function countdown(start) {\n  while (start > 0) {\n    console.log(start);\n    start++;\n  }\n}", correctCode: "function countdown(start) {\n  while (start > 0) {\n    console.log(start);\n    start--;\n  }\n}", time: 55 },
    { problem: "This function should clone an object, not reference it.", buggyCode: "function clone(obj) {\n  let newObj = obj;\n  newObj.cloned = true;\n  return newObj;\n}", correctCode: "function clone(obj) {\n  let newObj = { ...obj };\n  newObj.cloned = true;\n  return newObj;\n}", time: 75 },
    { problem: "The `setTimeout` is not working as expected due to variable scope.", buggyCode: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 10);\n}", correctCode: "for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 10);\n}", time: 80 },
    { problem: "This `reduce` function should sum all numbers, but the initial value is wrong.", buggyCode: "function sumArray(arr) {\n  return arr.reduce((acc, val) => acc + val);\n}", correctCode: "function sumArray(arr) {\n  return arr.reduce((acc, val) => acc + val, 0);\n}", time: 70 },
    { problem: "This class method is losing its `this` context.", buggyCode: "class Counter {\n  constructor() { this.count = 0; }\n  increment() { this.count++; }\n}\nconst c = new Counter();\nconst func = c.increment;\nfunc();", correctCode: "class Counter {\n  constructor() { this.count = 0; this.increment = this.increment.bind(this); }\n  increment() { this.count++; }\n}\nconst c = new Counter();\nconst func = c.increment;\nfunc();", time: 90 },
    { problem: "This function should remove duplicates. The logic is flawed.", buggyCode: "function unique(arr) {\n  const result = [];\n  arr.forEach(item => {\n    if (result.includes(item)) {\n      result.push(item);\n    }\n  });\n  return result;\n}", correctCode: "function unique(arr) {\n  return [...new Set(arr)];\n}", time: 85 },
    { problem: "This async function is not waiting for the promise to resolve.", buggyCode: "async function getData() {\n  const data = fetch('...');\n  return data.json();\n}", correctCode: "async function getData() {\n  const response = await fetch('...');\n  return response.json();\n}", time: 90 },
    { problem: "This recursive function to calculate factorial is missing its base case.", buggyCode: "function factorial(n) {\n  return n * factorial(n - 1);\n}", correctCode: "function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}", time: 90 },
    { problem: "This should deep flatten an array. The recursion is incorrect.", buggyCode: "function flatten(arr) {\n  return arr.reduce((acc, val) => \n    Array.isArray(val) ? flatten(val) : acc.concat(val), []);\n}", correctCode: "function flatten(arr) {\n  return arr.reduce((acc, val) => \n    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);\n}", time: 100 },
    { problem: "This function attempts to memoize results, but the cache logic is wrong.", buggyCode: "const memoize = (fn) => {\n  let cache = {};\n  return (...args) => {\n    let n = args[0];\n    if (n in cache) {\n      return n;\n    } else {\n      let result = fn(n);\n      cache[n] = result;\n      return result;\n    }\n  }\n}", correctCode: "const memoize = (fn) => {\n  let cache = {};\n  return (...args) => {\n    let n = args[0];\n    if (n in cache) {\n      return cache[n];\n    } else {\n      let result = fn(n);\n      cache[n] = result;\n      return result;\n    }\n  }\n}", time: 110 },
    { problem: "This Promise chain is broken. The second `.then` receives `undefined`.", buggyCode: "Promise.resolve(10)\n  .then(val => { val * 2; })\n  .then(val => console.log(val));", correctCode: "Promise.resolve(10)\n  .then(val => { return val * 2; })\n  .then(val => console.log(val));", time: 95 },
    { problem: "This debounce implementation has a flaw where `this` context and arguments are not preserved.", buggyCode: "function debounce(fn, delay) {\n  let timeoutId;\n  return function() {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(fn, delay);\n  }\n}", correctCode: "function debounce(fn, delay) {\n  let timeoutId;\n  return function(...args) {\n    const context = this;\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => fn.apply(context, args), delay);\n  }\n}", time: 120 },
    { problem: "This function should check for a palindrome, but it fails on phrases with different cases and non-alphanumeric chars.", buggyCode: "function isPalindrome(str) {\n  const reversed = str.split('').reverse().join('');\n  return str === reversed;\n}", correctCode: "function isPalindrome(str) {\n  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  const reversed = cleanStr.split('').reverse().join('');\n  return cleanStr === reversed;\n}", time: 120 },
    { problem: "This code tries to handle multiple async operations, but it processes them sequentially, not in parallel.", buggyCode: "async function processUsers(userIds) {\n  let results = [];\n  for (const id of userIds) {\n    results.push(await fetchUser(id));\n  }\n  return results;\n}", correctCode: "async function processUsers(userIds) {\n  const promises = userIds.map(id => fetchUser(id));\n  return await Promise.all(promises);\n}", time: 120 },
    { problem: "This function should return a random integer in a range, but the math is slightly off, making the `max` value unreachable.", buggyCode: "function randomInRange(min, max) {\n  return Math.floor(Math.random() * (max - min)) + min;\n}", correctCode: "function randomInRange(min, max) {\n  return Math.floor(Math.random() * (max - min + 1)) + min;\n}", time: 110 },
    { problem: "This function uses bitwise OR to check a flag, but it should be using bitwise AND.", buggyCode: "const FLAG_A = 1; // 001\nconst FLAG_B = 2; // 010\nconst FLAG_C = 4; // 100\n\nfunction hasFlagA(mask) {\n  return (mask | FLAG_A) === mask;\n}", correctCode: "const FLAG_A = 1; // 001\nconst FLAG_B = 2; // 010\nconst FLAG_C = 4; // 100\n\nfunction hasFlagA(mask) {\n  return (mask & FLAG_A) === FLAG_A;\n}", time: 130 },
];

// --- GAME STATE ---
let currentLevelIndex = 0;
let lives = 3;
let score = 0;
let timeLeft = 0;
let timerInterval = null;
let isGameActive = false;
// Modifiers
let timeModifier = 1.0;
let timePenalty = 0;
let scoreMultiplier = 1;

// --- GAME LOGIC FUNCTIONS ---
const normalizeCode = (code) => code.replace(/\s/g, '');

function updateLivesDisplay() {
    livesDisplay.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement('span');
        heart.textContent = '❤️';
        heart.classList.add('life-heart', 'transition-all', 'duration-300');
        livesDisplay.appendChild(heart);
    }
}

function updateScoreDisplay() {
    scoreDisplay.textContent = score;
}

function loadLevel(levelIndex) {
    if (levelIndex >= levels.length) {
        winGame(true);
        return;
    }
    isGameActive = true;
    const level = levels[levelIndex];

    levelDisplay.textContent = levelIndex + 1;
    problemDescription.textContent = level.problem;
    codeEditor.value = level.buggyCode;
    timeLeft = Math.max(10, Math.floor(level.time * timeModifier) - timePenalty);

    updateTimerDisplay();
    updateLivesDisplay();
    updateScoreDisplay();
    statusDisplay.textContent = 'Active';
    statusDisplay.className = 'font-bold text-green-400';
    defuseButton.disabled = false;
    bombSvg.classList.remove('shake');

    startTimer();
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 10 && timeLeft > 0) {
            bombSvg.classList.add('shake');
        }
        if (timeLeft <= 0) {
            handleFailure('time');
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    bombSvg.classList.remove('shake');
}

function updateTimerDisplay() {
    timerDisplay.textContent = timeLeft;
}

function showModal(type) {
    modalContainer.classList.remove('hidden');
    modalContainer.classList.add('flex', 'modal-enter');
    if (type === 'main') {
        mainModal.classList.remove('hidden');
        interstitialModal.classList.add('hidden');
    } else {
        mainModal.classList.add('hidden');
        interstitialModal.classList.remove('hidden');
    }
}

function hideModals() {
    modalContainer.classList.add('modal-leave');
    setTimeout(() => {
        modalContainer.classList.add('hidden');
        modalContainer.classList.remove('flex', 'modal-enter', 'modal-leave');
        mainModal.classList.add('hidden');
        interstitialModal.classList.add('hidden');
    }, 300);
}

function handleFailure(reason) {
    isGameActive = false;
    stopTimer();
    lives--;
    updateLivesDisplay();

    const explosion = document.createElement('div');
    explosion.className = 'explosion';
    explosionContainer.appendChild(explosion);
    setTimeout(() => explosion.remove(), 500);

    statusDisplay.textContent = 'Failed';
    statusDisplay.className = 'font-bold text-red-500';
    defuseButton.disabled = true;

    modalButtons.innerHTML = ''; // Clear previous buttons

    if (lives > 0) {
        modalTitle.textContent = 'KABOOM! 💥';
        modalTitle.className = 'text-4xl font-bold mb-4 text-red-500';
        modalMessage.textContent = (reason === 'time' ? 'You ran out of time!' : 'That wasn\'t the right fix!') + ` You have ${lives} ${lives > 1 ? 'lives' : 'life'} left.`;

        // Add "Try Again" button
        const tryAgainBtn = document.createElement('button');
        tryAgainBtn.textContent = 'Try Level Again';
        tryAgainBtn.className = 'w-full p-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-lg';
        tryAgainBtn.onclick = () => { hideModals(); loadLevel(currentLevelIndex); };
        modalButtons.appendChild(tryAgainBtn);

        // Add "Next Level" button if not the last level
        if (currentLevelIndex < levels.length - 1) {
            const nextLevelBtn = document.createElement('button');
            nextLevelBtn.textContent = 'Skip to Next Level';
            nextLevelBtn.className = 'w-full p-3 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded-lg';
            nextLevelBtn.onclick = () => { hideModals(); currentLevelIndex++; loadLevel(currentLevelIndex); };
            modalButtons.appendChild(nextLevelBtn);
        }
    } else {
        modalTitle.textContent = 'GAME OVER';
        modalTitle.className = 'text-4xl font-bold mb-4 text-red-500';
        modalMessage.textContent = 'You\'ve run out of lives. The mission is a failure.';
        const restartBtn = document.createElement('button');
        restartBtn.textContent = 'Restart Game';
        restartBtn.className = 'w-full p-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg';
        restartBtn.onclick = () => { hideModals(); resetGame(); };
        modalButtons.appendChild(restartBtn);
    }
    showModal('main');
}

function resetGame() {
    currentLevelIndex = 0;
    lives = 3;
    score = 0;
    timeModifier = 1.0;
    timePenalty = 0;
    scoreMultiplier = 1;
    gambleTimeBtn.disabled = false;
    loadLevel(currentLevelIndex);
}

function winGame(allLevelsCompleted = false) {
    isGameActive = false;
    stopTimer();

    score += timeLeft * 10 * scoreMultiplier;
    scoreMultiplier = 1; // Reset multiplier after use
    updateScoreDisplay();

    statusDisplay.textContent = 'Defused';
    statusDisplay.className = 'font-bold text-cyan-400';
    defuseButton.disabled = true;

    if (allLevelsCompleted) {
        modalTitle.textContent = 'MASTER DEFUSER! 🎉';
        modalTitle.className = 'text-4xl font-bold mb-4 text-green-400';
        modalMessage.textContent = `You\'ve successfully defused all the bombs with a final score of ${score}. You are a coding legend!`;
        modalButtons.innerHTML = '';
        const playAgainBtn = document.createElement('button');
        playAgainBtn.textContent = 'Play Again';
        playAgainBtn.className = 'w-full p-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg';
        playAgainBtn.onclick = () => { hideModals(); resetGame(); };
        modalButtons.appendChild(playAgainBtn);
        showModal('main');
    } else {
        interstitialMessage.textContent = `Level ${currentLevelIndex + 1} clear! You earned ${timeLeft * 10} points. Total Score: ${score}.`;
        showModal('interstitial');
    }
}

function proceedToNextLevel() {
    hideModals();
    currentLevelIndex++;
    loadLevel(currentLevelIndex);
}

function checkCode() {
    if (!isGameActive) return;
    const userCode = normalizeCode(codeEditor.value);
    const correctCode = normalizeCode(levels[currentLevelIndex].correctCode);
    if (userCode === correctCode) {
        winGame();
    } else {
        handleFailure('wrong');
    }
}

// --- EVENT LISTENERS ---
defuseButton.addEventListener('click', checkCode);

gambleTimeBtn.addEventListener('click', () => {
    timeModifier = 0.5;
    scoreMultiplier = 2; // Apply to next round
    gambleTimeBtn.disabled = true; // Can only do this once
    proceedToNextLevel();
});

gambleLifeBtn.addEventListener('click', () => {
    timePenalty += 10;
    lives++;
    updateLivesDisplay();
    proceedToNextLevel();
});

continueBtn.addEventListener('click', proceedToNextLevel);

// --- INITIALIZE GAME ---
document.addEventListener('DOMContentLoaded', () => {
    loadLevel(currentLevelIndex);
});
