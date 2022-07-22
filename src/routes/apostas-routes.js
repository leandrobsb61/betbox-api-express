import express from 'express';
import ApostasController from '../controllers/apostas-controller.js';

const apostasRoutes = express.Router();

apostasRoutes
    .get('/apostas/banca', ApostasController.listarApostasPorBanca)
    .get('/aposta/:id', ApostasController.buscarApostaPorId)
    .post('/apostas', ApostasController.cadastrarAposta)
    .put('/aposta/:id', ApostasController.editarAposta)
    .delete('/aposta/:id', ApostasController.removerAposta);

export default apostasRoutes;
