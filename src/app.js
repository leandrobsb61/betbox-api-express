import express from 'express';
import db from './config/db-connect.js';
import indexRoutes from './routes/index-routes.js';

// Escutando evento de possível erro
db.on('error', console.log.bind(console, 'Erro de conexão'));

// Tentar uma vez fazer a abertura da conexão com o banco
db.once('open', () => {
    console.log('Conexão com o banco feita com sucesso');
});

const app = express();

indexRoutes(app);

export default app;
