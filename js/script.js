const quizData = [
  {
    question: "Do you have a favorite number?",
    options: ["Yes", "No"],
    followUp: {
      trigger: "Yes",          // When this option is selected
      type: "number",          // Input type: number, text, etc.
      placeholder: "Enter your favorite number"
    }
  },
  {
    question: "Which animal do you like most?",
    options: ["Dog", "Cat", "Bird", "Fish"]
  },
  {
    question: "What is your preferred mode of travel?",
    options: ["Car", "Bicycle", "Plane", "Train"]
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

  q.options.forEach((option, i) => {
    const label = document.createElement("label");
    label.classList.add("option");
    label.innerHTML = `
      <input type="radio" name="question${index}" value="${option}">
      ${option}
    `;
    optionsElement.appendChild(label);
  });

  // If question has a follow-up
  if (q.followUp) {
    const followUpDiv = document.createElement("div");
    followUpDiv.classList.add("follow-up");
    followUpDiv.style.maxHeight = "0"; // collapsed
    followUpDiv.style.overflow = "hidden";
    followUpDiv.style.transition = "max-height 0.4s ease";

    const input = document.createElement("input");
    input.type = q.followUp.type || "text";
    input.placeholder = q.followUp.placeholder || "Enter value...";
    input.classList.add("follow-up-input");

    followUpDiv.appendChild(input);
    optionsElement.appendChild(followUpDiv);

    // Listen for option selection
    optionsElement.querySelectorAll("input[type='radio']").forEach((radio) => {
      radio.addEventListener("change", () => {
        if (radio.value === q.followUp.trigger) {
          followUpDiv.style.maxHeight = "100px"; // expand
        } else {
          followUpDiv.style.maxHeight = "0"; // collapse
        }
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
  for (let i = 0; i < totalQuestions; i++) {
    const btn = document.createElement("button");
    btn.textContent = `Question ${i + 1}`;  // 👈 add label
    btn.classList.add("question-btn");

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
