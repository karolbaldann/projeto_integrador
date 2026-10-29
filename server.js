const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// Conectando ao banco de dados SQLite (cria o arquivo database.db automaticamente)
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) console.error('Erro ao abrir o banco', err.message);
    else console.log('Conectado ao banco de dados SQLite.');
});

// Criando a tabela de usuários caso ela não exista
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    senha TEXT
)`);

// Rota de Cadastro (Sign-up)
app.post('/cadastro', async (req, res) => {
    const { email, senha } = req.body;
    
    try {
        // Criptografando a senha (custo 10)
        const senhaHash = await bcrypt.hash(senha, 10);

        db.run(`INSERT INTO usuarios (email, senha) VALUES (?, ?)`, [email, senhaHash], function(err) {
            if (err) {
                return res.status(400).json({ erro: 'E-mail já cadastrado ou inválido.' });
            }
            res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', userId: this.lastID });
        });
    } catch (e) {
        res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
});

// Rota de Login (Sign-in)
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    db.get(`SELECT * FROM usuarios WHERE email = ?`, [email], async (err, usuario) => {
        if (err) return res.status(500).json({ erro: 'Erro no servidor.' });
        if (!usuario) return res.status(400).json({ erro: 'E-mail ou senha incorretos.' });

        // Compara a senha digitada com o hash salvo no banco
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(400).json({ erro: 'E-mail ou senha incorretos.' });
        }

        // Login bem-sucedido (aqui você geraria um token JWT em sistemas reais)
        res.json({ mensagem: 'Login realizado com sucesso!' });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 (http://localhost:3000)');
});