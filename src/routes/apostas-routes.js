import express from 'express';
import ApostasController from '../controllers/apostas-controller.js';

const apostasRoutes = express.Router();

apostasRoutes
    .get('/apostas/banca', ApostasController.listarApostasPorBanca)
    .post('/apostas', ApostasController.cadastrarAposta);

export default apostasRoutes;
