// Exemplo de integração no Front-end (script.js)
async function realizarLogin(email, senha) {
    try {
        const resposta = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            alert('Login realizado com sucesso!');
            // Redireciona o usuário para a página principal
            window.location.href = '/dashboard.html';
        } else {
            alert(dados.erro || 'Falha no login');
        }
    } catch (erro) {
        console.error('Erro ao conectar ao servidor:', erro);
        alert('Erro ao conectar com o servidor.');
    }
}

// Vincular a função ao envio do formulário de login
document.getElementById('formLogin')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('inputEmail').value;
    const senha = document.getElementById('inputSenha').value;
    realizarLogin(email, senha);
    const cors = require('cors');
app.use(cors()); // Permite que qualquer front-end acesse sua API
});