import usuariosCollection from '../collections/usuarios-collection.js';

export default class UsuariosController {

    static buscarUsuarios = (req, res) => {
        usuariosCollection.find((error, usuarios) => {
            res.status(200).json(usuarios);
        });
    }

}