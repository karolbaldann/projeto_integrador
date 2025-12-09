const quizData = [
    {
        question: "Qual é o principal gás responsável pelo efeito estufa?",
        a: "Oxigênio",
        b: "Dióxido de Carbono",
        c: "Nitrogênio",
        d: "Hélio",
        correct: "b",
    },
    {
        question: "O que significa a sigla 'ODS'?",
        a: "Organização de Desenvolvimento Sustentável",
        b: "Objetivos de Desenvolvimento Sustentável",
        c: "Ordem de Descarte de Resíduos",
        d: "Operação de Despoluição de Solos",
        correct: "b",
    },
    {
        question: "Qual fonte de energia é considerada renovável?",
        a: "Carvão Mineral",
        b: "Petróleo",
        c: "Energia Solar",
        d: "Gás Natural",
        correct: "c",
    },
    {
        question: "O que é 'pegada de carbono'?",
        a: "A marca deixada por um pneu",
        b: "A quantidade de CO2 emitida por uma atividade ou indivíduo",
        c: "O rastro de um animal em extinção",
        d: "Um tipo de solo fértil",
        correct: "b",
    },
];

const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const answerEls = document.querySelectorAll('.answer');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();

    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if(currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `
                <h2>Você completou o Quiz!</h2>
                <p>Você acertou ${score} de ${quizData.length} perguntas.</p>
                <button onclick="location.reload()">Tentar Novamente</button>
            `;
        }
    } else {
        alert("Por favor, selecione uma resposta antes de continuar.");
    }
});
