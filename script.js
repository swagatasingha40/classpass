function generateSquareQuestion() {
  const num = Math.floor(Math.random() * 32) + 1;
  return {
    question: `${num}²`,
    answer: num * num,
  };
}

function generateCubeQuestion() {
  const num = Math.floor(Math.random() * 12) + 1;
  return {
    question: `${num}³`,
    answer: num * num * num,
  };
}

function generateAdditionQuestion(steps = 3, maxDigits = 4) {
  const numbers = Array.from({ length: steps }, () =>
    Math.floor(Math.random() * Math.pow(10, maxDigits))
  );
  return {
    question: numbers.join(" + "),
    answer: numbers.reduce((a, b) => a + b, 0),
  };
}

function generateSubtractionQuestion(steps = 3, maxDigits = 4) {
  const numbers = Array.from({ length: steps }, () =>
    Math.floor(Math.random() * Math.pow(10, maxDigits))
  );
  numbers.sort((a, b) => b - a); // biggest first
  const question = numbers.join(" - ");
  const answer = numbers.reduce((a, b) => a - b);
  return { question, answer };
}

function generateMultiplicationQuestion(steps = 2, maxDigits = 3) {
  const numbers = Array.from(
    { length: steps },
    () => Math.floor(Math.random() * Math.pow(10, maxDigits - 1)) + 1
  );
  const question = numbers.join(" × ");
  const answer = numbers.reduce((a, b) => a * b);
  return { question, answer };
}

function generateDivisionQuestion(steps = 2, maxDigits = 3) {
  let start = Math.floor(Math.random() * Math.pow(10, maxDigits - 1)) + 2;
  let result = start;

  let divisors = [start];
  for (let i = 1; i < steps; i++) {
    let divisor = Math.floor(Math.random() * 9) + 2;
    result *= divisor;
    divisors.push(divisor);
  }

  const question = [result, ...divisors.slice(1).reverse()].join(" ÷ ");
  const answer = start;
  return { question, answer };
}

function generateTableQuestion() {
  const tableOf = Math.floor(Math.random() * 20) + 1; // 1 to 20
  const multiplier = Math.floor(Math.random() * 10) + 1; // 1 to 10
  return {
    question: `${tableOf} × ${multiplier}`,
    answer: tableOf * multiplier,
  };
}

async function runQuiz() {
  const totalQuestions = 10;
  let score = 0;

  const questionTypes = [
    "square",
    "cube",
    "addition",
    "subtraction",
    "multiplication",
    "division",
    "table",
  ];

  const startTime = Date.now();

  for (let i = 0; i < totalQuestions; i++) {
    const type =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];
    let currentQuestion;

    switch (type) {
      case "square":
        currentQuestion = generateSquareQuestion();
        break;
      case "cube":
        currentQuestion = generateCubeQuestion();
        break;
      case "addition":
        currentQuestion = generateAdditionQuestion();
        break;
      case "subtraction":
        currentQuestion = generateSubtractionQuestion();
        break;
      case "multiplication":
        currentQuestion = generateMultiplicationQuestion();
        break;
      case "division":
        currentQuestion = generateDivisionQuestion();
        break;
      case "table":
        currentQuestion = generateTableQuestion();
        break;
    }

    const userAnswer = prompt(`Q${i + 1}: ${currentQuestion.question}`);
    if (parseInt(userAnswer) === currentQuestion.answer) {
      score++;
      alert("✅ Correct!");
    } else {
      alert(`❌ Incorrect. Correct answer: ${currentQuestion.answer}`);
    }
  }

  const endTime = Date.now();
  const timeTaken = Math.floor((endTime - startTime) / 1000);

  alert(
    `🎉 Quiz complete!\nScore: ${score}/${totalQuestions}\nTime: ${timeTaken} seconds`
  );
}

const startButton = document.getElementById("startGame");
const quizTypeSelect = document.getElementById("quizType");
const gameContainer = document.getElementById("gameContainer");
const resultContainer = document.getElementById("result");

let questionCount = 0;
let score = 0;
let startTime, endTime;

let currentAnswer = null;

function getQuestionByType(type) {
  switch (type) {
    case "square":
      return generateSquareQuestion();
    case "cube":
      return generateCubeQuestion();
    case "addition":
      return generateAdditionQuestion();
    case "subtraction":
      return generateSubtractionQuestion();
    case "multiplication":
      return generateMultiplicationQuestion();
    case "division":
      return generateDivisionQuestion();
    case "table":
      return generateTableQuestion();
    default: // random
      const allTypes = [
        "square",
        "cube",
        "addition",
        "subtraction",
        "multiplication",
        "division",
        "table",
      ];
      const randomType = allTypes[Math.floor(Math.random() * allTypes.length)];
      return getQuestionByType(randomType);
  }
}

function showNextQuestion(type) {
  if (questionCount >= 10) {
    endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    gameContainer.innerHTML = "";
    resultContainer.innerHTML = `
      ✅ Quiz Complete!<br>
      🧠 Score: ${score}/10<br>
      ⏱️ Time: ${timeTaken} seconds
    `;
    return;
  }

  const { question, answer } = getQuestionByType(type);
  currentAnswer = answer;

  gameContainer.innerHTML = `
    <div>
      <p><strong>Question ${questionCount + 1}:</strong> ${question}</p>
      <input type="number" id="userInput" placeholder="Your answer" />
      <button id="submitAnswer">Submit</button>
    </div>
  `;

  document.getElementById("submitAnswer").addEventListener("click", () => {
    const userInput = parseInt(document.getElementById("userInput").value);
    if (userInput === currentAnswer) {
      score++;
    }
    questionCount++;
    showNextQuestion(type);
  });
}

startButton.addEventListener("click", () => {
  const selectedType = quizTypeSelect.value;
  score = 0;
  questionCount = 0;
  resultContainer.innerHTML = "";
  startTime = new Date();
  showNextQuestion(selectedType);
});
