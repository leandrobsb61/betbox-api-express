import express from 'express';
import db from './config/db-connect.js';
import usuariosCollection from './collections/usuario.js';

// Escutando evento de possível erro
db.on('error', console.log.bind(console, 'Erro de conexão'));

// Tentar uma vez fazer a abertura da conexão com o banco
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso');
});

const app = express();

app.use(express.json());

// configurando rotas com express
app.get('/usuarios', (req, res) => {
    usuariosCollection.find((error, usuarios) => {
        res.status(200).json(usuarios);
    });
});

export default app;
