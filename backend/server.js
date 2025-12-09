const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração do Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..'))); // Permite servir arquivos estáticos do diretório pai (o front-end)

// Configuração do CORS para permitir requisições do front-end
app.use((req, res, next) => {
    // Em produção, substitua '*' pelo domínio do seu front-end (ex: 'http://meusite.com')
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Configuração do Banco de Dados SQLite (para simplicidade)
const db = new sqlite3.Database(path.join(__dirname, 'users.db'), (err) => {
    if (err) {
        console.error("Erro ao abrir o banco de dados:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");
        db.run(`CREATE TABLE IF NOT EXISTS users (
            
        )`);
    }
});

// Rota de Cadastro de Usuário
app.post('/api/users/register', async (req, res) => {
    const { name, email, password } = req.body;

    // 1. Validação Básica
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
    }

    // 2. Criptografia da Senha
    try {
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // 3. Inserção no Banco de Dados
        db.run(`INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`, 
            [name, email, password_hash], 
            function(err) {
                if (err) {
                    // Erro de email duplicado (UNIQUE constraint)
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(409).json({ message: "Este e-mail já está cadastrado." });
                    }
                    console.error("Erro ao inserir usuário:", err.message);
                    return res.status(500).json({ message: "Erro interno do servidor." });
                }
                
                console.log(\`Usuário cadastrado com ID: \${this.lastID}\`);
                