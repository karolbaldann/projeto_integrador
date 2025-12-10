const quizData = [
    {
        // CORRIGIDO: Agora usa 'question'
        question: "Qual é o principal gás responsável pelo efeito estufa?",
        a: "Oxigênio",
        b: "Dióxido de Carbono",
        c: "Nitrogênio",
        d: "Hélio",
        correct: "b",
    },
    {
        // CORRIGIDO
        question: "A atmosfera é composta por camadas com diferentes funções. Qual camada é aquela onde vivemos e onde ocorrem os fenômenos climáticos??",
        a: "Estratosfera",
        b: "Termosfera",
        c: "Exosfera",
        d: "Troposfera",
        correct: "d",
    },
    {
        // CORRIGIDO
        question: "Qual fonte de energia é considerada renovável?",
        a: "Carvão Mineral",
        b: "Petróleo",
        c: "Energia Solar",
        d: "Gás Natural",
        correct: "c",
    },
    {
        // CORRIGIDO
        question: "O que é 'pegada de carbono'?",
        a: "A marca deixada por um pneu",
        b: "A quantidade de CO2 emitida por uma atividade ou indivíduo",
        c: "O rastro de um animal em extinção",
        d: "Um tipo de solo fértil",
        correct: "b",
    },
    {
        // CORRIGIDO
        question: "O Brasil possui grande diversidade climática principalmente devido:",
        a: "Ao pequeno tamanho do país",
        b: "À baixa variação de relevo",
        c: "À influência de diferentes massas de ar",
        d: "Ao clima sempre frio e seco",
        correct: "c",
    },
    {
        // CORRIGIDO
        question: "O clima predominante no Ceará é:",
        a: "Equatorial úmido",
        b: "Tropical de altitude",
        c: "Semiárido",
        d: "Subtropical",
        correct: "c",
    },
    {
        // CORRIGIDO
        question: "As chuvas no sertão cearense são fortemente influenciadas por qual fator?",
        a: "Furacões do Atlântico",
        b: "Erupções vulcânicas",
        c: "Atuação da Zona de Convergência Intertropical (ZCIT)",
        d: "Neve da Cordilheira dos Andes",
        correct: "c",
    },
    {
        // CORRIGIDO
        question: "A atmosfera ajuda a manter a Terra habitável principalmente porque:",
        a: "Mantém tudo sempre gelado",
        b: "Reflete toda a radiação solar",
        c: "Deixa o oxigênio apenas no espaço",
        d: "Regula a temperatura através do efeito estufa natural",
        correct: "d",
    },
    {
        // CORRIGIDO
        question: "Qual destes é um impacto já percebido no Brasil pelas mudanças climáticas?",
        a: "Redução de ondas de calor",
        b: "Extinção das secas prolongadas",
        c: "Aumento da ocorrência de eventos extremos",
        d: "Diminuição do nível do mar",
        correct: "c",
    },
    {
        // CORRIGIDO
        question: "O que acontece com a temperatura do ar conforme subimos na troposfera?",
        a: "Aumenta rapidamente",
        b: "Fica igual em toda a altitude",
        c: "Diminui progressivamente",
        d: "Fica oscilando sem padrão",
        correct: "c",
    },
];

const quiz = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const submitBtn = document.getElementById('submit');
const answerEls = document.querySelectorAll('.answer');

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

    // Aqui o código busca a chave 'question' que agora existe
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
    // 1. Sempre marca a resposta CORRETA de verde
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

    // Desabilita o botão e mostra feedback visual
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