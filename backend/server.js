const cors = require('cors'); 
const allowedOrigins = ['http://localhost:8080', 'https://seusite.com.br']; // Substitua pelo seu domínio de produção

app.use(cors({
    origin: function (origin, callback) {
        // Permite requisições sem 'origin' (como apps móveis ou CURL) e as origens permitidas
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization'
}));