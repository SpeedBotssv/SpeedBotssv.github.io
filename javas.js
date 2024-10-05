const questions = [
    {
        question: "What does a red light on a traffic signal mean?",
        answers: [
            { text: "Stop the vehicle", correct: true},
            { text: "Go ahead", correct: false},
            { text: "Make a U-turn", correct: false},
            { text: "Opposite direction", correct: false},
        ]
    },
    {
        question: "Which document is mandatory to carry while driving a vehicle in El Salvador?",
        answers: [
            { text: "Credit card", correct: false},
            { text: "Passport", correct: false},
            { text: "Driver's license", correct: true},
            { text: "Vehicle title", correct: false},
        ]
    },
    {
        question: "What is the minimum distance a moving vehicle must maintain from the vehicle in front?",
        answers: [
            { text: "1 meter", correct: false},
            { text: "5 meters", correct: true},
            { text: "100 meters", correct: false},
            { text: "Depends on the color of the vehicle.", correct: false},
        ]
    },
    {
        question: "What does the 'Yield' sign mean?",
        answers: [
            { text: "That you have priority over other vehicles", correct: false},
            { text: "That you must completely stop your vehicle and yield to the vehicles on the road", correct: true},
            { text: "That you should slow down but can continue if no vehicles are approaching.", correct: false},
            { text: "That you are entering a high-speed zone.", correct: false},
        ]
    },
    {
        question: "What is the fine for exceeding the speed limit on interurban roads in El Salvador?",
        answers: [
            { text: "$50", correct: false},
            { text: "There is no fine for exceeding the limit", correct: false},
            { text: "Depends on the exceeded limit", correct: true},
            { text: "$100", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;  // Corregido el nombre de la función
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;  // Eliminado el salto de línea incorrecto
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {  // Añadido el parámetro 'e' para acceder al evento
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML =`got it right ${score} of the ${questions.length}!`;
    nextButton.innerHTML = "PLAY AGAIN";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();  // Corregido el nombre de la función
    }
});

startQuiz();  // Corregido el nombre de la función
