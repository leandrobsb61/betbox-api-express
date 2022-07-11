import usuariosCollection from '../collections/usuarios-collection.js';
import bancasCollection from '../collections/bancas-collection.js';

export default class LoginController {

    static efetuarLogin = (req, res) => {
        usuariosCollection.find((error, usuarios) => {
            if (error) {
                res.status(500).send({ message: 'Ocorreu um erro inesperado, tente mais tarde' });
            } else {
                let usuarioExistente = false;
                let usuarioLogado = null;

                for (const usuarioDB of usuarios) {
                    if (usuarioDB.emailUsuario === req.body.emailUsuario && usuarioDB.senhaUsuario === req.body.senhaUsuario) {
                        usuarioExistente = true;
                        usuarioLogado = usuarioDB;
                    }
                }

                if (usuarioExistente) {
                    let primeiroAcesso = false;
                    bancasCollection.find({ idUsuario: usuarioLogado._id }, {}, (error, bancas) => {
                        if (error) {
                            return res.status(500).send({ message: `${error.message} - Ocorreu um erro inesperado, tente mais tarde` });
                        }
                        if (!bancas || !bancas.length) {
                            primeiroAcesso = true;
                        }
                        res.status(200).send({ message: 'Login efetuado com sucesso', usuarioLogado: { id: usuarioLogado._id, nomeUsuario: usuarioLogado.nomeUsuario  }, primeiroAcesso });
                    });
                } else {
                    res.status(500).send({ message: 'Email e/ou senha inválidos' });
                }
            }
        });
    }

}
