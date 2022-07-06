import express from 'express';
import UsuariosController from '../controllers/usuarios-controller.js';

const usuariosRoutes = express.Router();

usuariosRoutes
    .get('/usuarios', UsuariosController.buscarUsuarios)
    .post('/usuarios', UsuariosController.cadastrarUsuario);

export default usuariosRoutes;
