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
const submitBtn = document.getElementById('submit');
const answerEls = document.querySelectorAll('.answer');

// Mapeamento dos IDs para os elementos de texto (labels)
const answerTextEls = {
    a: document.getElementById('a_text'),
    b: document.getElementById('b_text'),
    c: document.getElementById('c_text'),
    d: document.getElementById('d_text'),
};

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    
    // Remove classes de feedback de todas as respostas
    answerEls.forEach(input => {
        const label = answerTextEls[input.id];
        if (label) {
            label.classList.remove('correct', 'incorrect');
        }
    });

    // Re-habilita o botão
    submitBtn.disabled = false;
    submitBtn.innerText = "Enviar Resposta";

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    answerTextEls.a.innerText = currentQuizData.a;
    answerTextEls.b.innerText = currentQuizData.b;
    answerTextEls.c.innerText = currentQuizData.c;
    answerTextEls.d.innerText = currentQuizData.d;
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

function showResults() {
    quiz.innerHTML = `
        <div class="quiz-header">
            <h2 style="color: #333">Você completou o Quiz!</h2>
            <p style="text-align:center; font-size: 1.2rem;">Você acertou <strong>${score}</strong> de ${quizData.length} perguntas.</p>
        </div>
        <button onclick="location.reload()">Tentar Novamente</button>
    `;
}

// Função para mostrar visualmente o acerto/erro
function showFeedback(selectedAnswer, correctAnswer) {
   
    const correctLabel = answerTextEls[correctAnswer];
    if (correctLabel) {
        correctLabel.classList.add('correct');
    }

    // 2. Se o usuário errou, marca a escolha dele de vermelho
    if (selectedAnswer !== correctAnswer) {
        const selectedLabel = answerTextEls[selectedAnswer];
        if (selectedLabel) {
            selectedLabel.classList.add('incorrect');
        }
    }
}

submitBtn.addEventListener('click', () => {
    const selectedAnswer = getSelected();

    if(!selectedAnswer) {
        alert("Por favor, selecione uma resposta antes de continuar.");
        return;
    }

    const currentQuizData = quizData[currentQuiz];
    const correctAnswer = currentQuizData.correct;


    submitBtn.disabled = true;
    submitBtn.innerText = "Aguarde...";
    showFeedback(selectedAnswer, correctAnswer);

    
    if(selectedAnswer === correctAnswer) {
        score++;
    }


    setTimeout(() => {
        currentQuiz++;

        if(currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            showResults();
        }
    }, 2000); 
});