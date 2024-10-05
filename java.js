const questions = [
    {
        question: "¿Qué significa una luz roja en un semáforo?",
        answers: [
            { text: "Parar el vehículo", correct: true},
            { text: "Seguir adelante", correct: false},
            { text: "Girar en U", correct: false},
            { text: "Sentido contrario", correct: false},
        ]
    },
    {
        question: "¿Qué documento es obligatorio portar al conducir un vehículo en El Salvador?",
        answers: [
            { text: "Tarjeta de crédito", correct: false},
            { text: "Pasaporte", correct: false},
            { text: "Licencia de conducir", correct: true},
            { text: " Título de propiedad del vehículo", correct: false},
        ]
    },
    {
        question: "¿Qué distancia mínima debe mantener un vehículo en movimiento respecto al vehículo de enfrente?",
        answers: [
            { text: "1 metro", correct: false},
            { text: "5 metros", correct: true},
            { text: "100 metros", correct: false},
            { text: "Depende del color del vehículo.", correct: false},
        ]
    },
    {
        question: "¿Qué indica la señal de, Ceda el paso?",
        answers: [
            { text: "Que tienes prioridad sobre los demás vehículos", correct: false},
            { text: "Que debes detener tu vehículo completamente y ceder el paso a los vehículos que circulen por la vía", correct: true},
            { text: "Que debes disminuir la velocidad pero puedes continuar si no viene ningún vehículo.", correct: false},
            { text: "Que estás entrando a una zona de alta velocidad.", correct: false},
        ]
    },
    {
        question: "¿Cuál es la multa por exceder el límite de velocidad en carreteras interurbanas en El Salvador?",
        answers: [
            { text: "$50", correct: false},
            { text: "No hay multa por exceder el límite", correct: false},
            { text: "Depende del limite que se exceda", correct: true},
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
    nextButton.innerHTML = "Siguiente";
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
    questionElement.innerHTML =`Has acertado ${score} de ${questions.length}!`;
    nextButton.innerHTML = "Juega de nuevo";
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
