import express from 'express';
import BancaController from '../controllers/bancas-controller.js';

const bancasRoutes = express.Router();

bancasRoutes
    .get('/bancas/usuario', BancaController.listarBancasPorUsuario)
    .post('/bancas', BancaController.cadastrarBanca);

export default bancasRoutes;
