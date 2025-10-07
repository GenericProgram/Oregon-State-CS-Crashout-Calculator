const quizData = [
  {
    question: "What is your favorite color?",
    options: ["Red", "Blue", "Green", "Yellow"]
  },
  {
    question: "Do you have a favorite number?",
    options: ["Yes", "No"],
    followUp: {
      showOn: "Yes",
      inputType: "number",
      placeholder: "Enter your favorite number"
    }
  },
  {
    question: "Which animal do you like most?",
    options: ["Dog", "Cat", "Bird", "Fish"]
  },
  {
    question: "Which season do you enjoy the most?",
    options: ["Spring", "Summer", "Autumn", "Winter"]
  }
];

let currentQuestion = 0;
const totalQuestions = quizData.length;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const questionList = document.getElementById("question-number-list");

function renderQuestion(index) {
  const q = quizData[index];
  questionElement.textContent = `Question ${index + 1}: ${q.question}`;
  optionsElement.innerHTML = "";

  q.options.forEach((option) => {
    const label = document.createElement("label");
    label.classList.add("option");
    label.innerHTML = `
      <input type="radio" name="question${index}" value="${option}">
      ${option}
    `;
    optionsElement.appendChild(label);
  });

  // Handle conditional follow-up input
  if (q.followUp) {
    const inputContainer = document.createElement("div");
    inputContainer.style.marginTop = "10px";
    inputContainer.style.display = "none";

    const input = document.createElement("input");
    input.type = q.followUp.inputType;
    input.placeholder = q.followUp.placeholder;
    input.style.padding = "8px";
    input.style.width = "100%";
    input.style.border = "1px solid #dc4405";
    input.style.borderRadius = "5px";

    inputContainer.appendChild(input);
    optionsElement.appendChild(inputContainer);

    optionsElement.querySelectorAll("input[type='radio']").forEach(radio => {
      radio.addEventListener("change", () => {
        inputContainer.style.display =
          radio.value === q.followUp.showOn ? "block" : "none";
      });
    });
  }

  backBtn.disabled = index === 0;
  nextBtn.disabled = index === totalQuestions - 1;

  document.querySelectorAll("#question-number-list button").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
}

function createQuestionList() {
  questionList.innerHTML = ""; // clear any existing buttons first
  for (let i = 0; i < totalQuestions; i++) {
    const btn = document.createElement("button");
    btn.textContent = `Question ${i + 1}`;
    btn.addEventListener("click", () => {
      currentQuestion = i;
      renderQuestion(currentQuestion);
    });
    questionList.appendChild(btn);
  }
}

nextBtn.addEventListener("click", () => {
  if (currentQuestion < totalQuestions - 1) {
    currentQuestion++;
    renderQuestion(currentQuestion);
  }
});

backBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion(currentQuestion);
  }
});

createQuestionList();
renderQuestion(currentQuestion);
