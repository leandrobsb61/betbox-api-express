import usuariosCollection from '../collections/usuarios-collection.js';

export default class LoginController {

    static efetuarLogin = (req, res) => {
        usuariosCollection.find((error, usuarios) => {
            if (error) {
                res.status(500).send({ message: 'Ocorreu um erro inesperado, tente mais tarde' });
            } else {
                let usuarioExistente = false;

                for (const usuarioDB of usuarios) {
                    if (usuarioDB.emailUsuario === req.body.emailUsuario && usuarioDB.senhaUsuario === req.body.senhaUsuario) {
                        usuarioExistente = true;
                    }
                }

                if (usuarioExistente) {
                    res.status(200).send({ message: 'Login efetuado com sucesso' });
                } else {
                    res.status(500).send({ message: 'Email e/ou senha inválidos' });
                }
            }
        });
    }

}
