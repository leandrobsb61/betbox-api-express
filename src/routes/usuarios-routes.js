import express from 'express';
import LivrosController from '../controllers/usuarios-controller.js';

const usuariosRoutes = express.Router();

usuariosRoutes
    .get('/usuarios', LivrosController.buscarUsuarios);

export default usuariosRoutes;
