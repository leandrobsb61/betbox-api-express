import express from 'express';
import BancaController from '../controllers/bancas-controller.js';

const bancasRoutes = express.Router();

bancasRoutes
    .get('/bancas/usuario', BancaController.listarBancasPorUsuario)
    .post('/bancas', BancaController.cadastrarBanca)
    .put('/banca_selecionada', BancaController.alterarBancaSelecionada)
    .put('/banca/mercado', BancaController.cadastrarMercadoEmBanca)
    .delete('/banca/mercado', BancaController.removerMercadoEmBanca);

export default bancasRoutes;
