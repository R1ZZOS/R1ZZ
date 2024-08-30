const questions = {
    proteccion: [
        {
            question: "¿Cuál es la duración máxima de la jornada laboral en Chile?",
            options: ["45 horas semanales", "40 horas semanales", "50 horas semanales", "35 horas semanales"],
            answer: "45 horas semanales"
        },
        {
            question: "¿Qué derecho tiene el trabajador en caso de accidente laboral?",
            options: ["Indemnización", "Aumento de sueldo", "Vacaciones adicionales", "Licencia médica"],
            answer: "Licencia médica"
        },
        {
            question: "¿Cuál es el período mínimo de descanso entre jornadas laborales?",
            options: ["12 horas", "8 horas", "24 horas", "6 horas"],
            answer: "12 horas"
        },
        {
            question: "¿Qué obligación tiene el empleador en relación con el seguro de salud?",
            options: ["Proveer un seguro privado", "Descontar el seguro de salud del salario", "Contratar un seguro de salud para el trabajador", "No es necesario"],
            answer: "Contratar un seguro de salud para el trabajador"
        },
        {
            question: "¿Qué sucede si un trabajador no recibe su salario a tiempo?",
            options: ["Puede exigir el pago con intereses", "Debe esperar sin reclamar", "El empleador puede descontar el salario", "Nada, es legal"],
            answer: "Puede exigir el pago con intereses"
        }
    ],
    subcontratacion: [
        {
            question: "¿Cuál es una de las obligaciones del contratista según la Ley de Subcontratación?",
            options: ["Proveer uniformes", "Asegurar condiciones laborales adecuadas", "Contratar a familiares", "Aumentar el salario"],
            answer: "Asegurar condiciones laborales adecuadas"
        },
        {
            question: "¿Quién es responsable de las obligaciones laborales y previsionales del trabajador subcontratado?",
            options: ["El contratista", "El empleador principal", "El trabajador", "El sindicato"],
            answer: "El contratista"
        },
        {
            question: "¿Qué debe hacer el empleador principal en caso de incumplimiento por parte del contratista?",
            options: ["Despedir al trabajador", "Asumir las obligaciones laborales", "Multar al contratista", "Esperar a que se solucione el problema"],
            answer: "Asumir las obligaciones laborales"
        },
        {
            question: "¿Qué información debe proporcionar el empleador principal al contratista?",
            options: ["Información sobre el salario", "Información sobre el lugar de trabajo y condiciones", "Información sobre el horario de trabajo", "Información sobre el sindicato"],
            answer: "Información sobre el lugar de trabajo y condiciones"
        },
        {
            question: "¿Cuál es el objetivo de la Ley de Subcontratación?",
            options: ["Eliminar la subcontratación", "Regular la subcontratación y proteger los derechos laborales", "Aumentar los impuestos", "Reducir los salarios"],
            answer: "Regular la subcontratación y proteger los derechos laborales"
        }
    ],
    ambiente: [
        {
            question: "¿Qué obliga la Ley de Ambiente Seguro a los empleadores?",
            options: ["Proveer equipo de protección personal", "Ofrecer más días de vacaciones", "Contratar más trabajadores", "Pagar un bono"],
            answer: "Proveer equipo de protección personal"
        },
        {
            question: "¿Cómo debe ser el lugar de trabajo según la Ley de Ambiente Seguro?",
            options: ["Limpio y ordenado", "Desordenado pero seguro", "No tiene requisitos específicos", "Con iluminación tenue"],
            answer: "Limpio y ordenado"
        },
        {
            question: "¿Qué tipo de formación deben recibir los trabajadores sobre riesgos laborales?",
            options: ["Formación sobre primeros auxilios", "Formación específica sobre riesgos de su puesto de trabajo", "Formación general sobre leyes laborales", "No se requiere formación"],
            answer: "Formación específica sobre riesgos de su puesto de trabajo"
        },
        {
            question: "¿Qué debe hacer el empleador en caso de un accidente laboral?",
            options: ["Proporcionar atención médica inmediata", "Esperar a que el trabajador regrese", "Despedir al trabajador", "Nada"],
            answer: "Proporcionar atención médica inmediata"
        },
        {
            question: "¿Qué debe incluir el plan de prevención de riesgos laborales?",
            options: ["Medidas de seguridad y salud", "Medidas para aumentar la productividad", "Plan de vacaciones", "Plan de capacitación"],
            answer: "Medidas de seguridad y salud"
        }
    ]
};

let currentQuestionIndex = 0;
let score = 0;
let currentQuiz = '';
let username = '';
let scores = JSON.parse(localStorage.getItem('scores')) || [];

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    username = document.getElementById('username').value;
    if (username) {
        document.getElementById('registration-container').style.display = 'none';
        document.getElementById('menu-container').style.display = 'block';
    }
});

function startQuiz(quizType) {
    currentQuiz = quizType;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('menu-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const currentQuestion = questions[currentQuiz][currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => toggleSelection(button, option);
        optionsContainer.appendChild(button);
    });

    document.getElementById('confirm-button').style.display = 'block';
}

function toggleSelection(button, option) {
    // Toggle the button selection
    if (button.classList.contains('selected')) {
        button.classList.remove('selected');
        button.classList.remove('correct');
        button.classList.remove('incorrect');
    } else {
        // Deselect all other buttons
        const buttons = document.querySelectorAll('#options button');
        buttons.forEach(btn => {
            btn.classList.remove('selected');
        });
        button.classList.add('selected');
    }
}

function checkAnswer() {
    const selectedButton = document.querySelector('#options button.selected');
    if (!selectedButton) return;

    const selectedOption = selectedButton.innerText;
    const currentQuestion = questions[currentQuiz][currentQuestionIndex];
    const buttons = document.querySelectorAll('#options button');

    buttons.forEach(btn => {
        if (btn.innerText === currentQuestion.answer) {
            btn.classList.add('correct');
        } else if (btn.classList.contains('selected') && btn.innerText !== currentQuestion.answer) {
            btn.classList.add('incorrect');
        }
    });

    if (selectedOption === currentQuestion.answer) {
        score++;
    }

    // Disable all buttons after confirmation
    buttons.forEach(btn => btn.disabled = true);

    document.getElementById('confirm-button').style.display = 'none';
    document.getElementById('next-button').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById('next-button').style.display = 'none';

    if (currentQuestionIndex < questions[currentQuiz].length) {
        loadQuestion();
    } else {
        saveScore();
        showResult();
    }
}

function saveScore() {
    scores.push({ username, score });
    scores.sort((a, b) => b.score - a.score); // Ordenar de mayor a menor
    localStorage.setItem('scores', JSON.stringify(scores));
}

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('result').innerText = `Tu puntaje es ${score} de ${questions[currentQuiz].length}.`;
}

function restartQuiz() {
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    loadQuestion();
}

function showDashboard() {
    const scoreList = document.getElementById('score-list');
    scoreList.innerHTML = '';
    scores.forEach(scoreEntry => {
        const listItem = document.createElement('li');
        listItem.innerText = `${scoreEntry.username}: ${scoreEntry.score}`;
        scoreList.appendChild(listItem);
    });
    document.getElementById('menu-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'block';
}

function backToMenu() {
    document.getElementById('registration-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('dashboard-container').style.display = 'none';
    document.getElementById('menu-container').style.display = 'block';
}
