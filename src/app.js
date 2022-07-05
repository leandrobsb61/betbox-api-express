import express from 'express';
import db from './config/db-connect.js';

// Escutando evento de possível erro
db.on('error', console.log.bind(console, 'Erro de conexão'));

// Tentar uma vez fazer a abertura da conexão com o banco
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso');
});

const app = express();

app.use(express.json());

// configurando rotas com express
app.get('/', (req, res) => {
    res.status(200).send('Betbox API');
});

export default app;
